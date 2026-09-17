import type { Env } from './env'
import { fetchWithTimeout } from './security'

// Provider-neutral CAPTCHA verification. Swap providers by adding a case here; callers never change.
const verifyEndpoints: Record<string, string> = {
  turnstile: 'https://challenges.cloudflare.com/turnstile/v0/siteverify',
  recaptcha: 'https://www.google.com/recaptcha/api/siteverify',
}

export type CaptchaResult = { ok: true } | { ok: false, reason: string }

export async function verifyCaptcha(token: unknown, clientIp: string, env: Env): Promise<CaptchaResult> {
  const provider = env.CAPTCHA_PROVIDER ?? 'turnstile'
  const secret = env.CAPTCHA_SECRET_KEY
  const endpoint = verifyEndpoints[provider]

  if (!secret || !endpoint) {
    return { ok: false, reason: 'not-configured' }
  }

  if (!token || typeof token !== 'string') {
    return { ok: false, reason: 'missing-token' }
  }

  const body = new URLSearchParams({ secret, response: token })
  if (clientIp && clientIp !== 'unknown') body.set('remoteip', clientIp)

  try {
    const response = await fetchWithTimeout(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    const result = await response.json() as { success?: boolean, 'error-codes'?: string[] }
    if (!result.success) {
      // Cloudflare's generic error codes only (e.g. "invalid-input-secret") — never log the token itself.
      console.log(JSON.stringify({ event: 'captcha_rejected', errorCodes: result['error-codes'] ?? [] }))
    }
    return result.success ? { ok: true } : { ok: false, reason: 'rejected' }
  } catch {
    return { ok: false, reason: 'verification-failed' }
  }
}
