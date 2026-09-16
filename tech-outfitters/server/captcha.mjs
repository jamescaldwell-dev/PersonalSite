// Provider-neutral CAPTCHA verification. Swap providers by adding a case here; callers never change.
const verifyEndpoints = {
  turnstile: 'https://challenges.cloudflare.com/turnstile/v0/siteverify',
  recaptcha: 'https://www.google.com/recaptcha/api/siteverify',
}

export async function verifyCaptcha(token, clientIp) {
  const provider = process.env.CAPTCHA_PROVIDER ?? 'turnstile'
  const secret = process.env.CAPTCHA_SECRET_KEY
  const endpoint = verifyEndpoints[provider]

  if (!secret || !endpoint) {
    return { ok: false, reason: 'not-configured' }
  }

  if (!token || typeof token !== 'string') {
    return { ok: false, reason: 'missing-token' }
  }

  const body = new URLSearchParams({ secret, response: token })
  if (clientIp) body.set('remoteip', clientIp)

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    const result = await response.json()
    return result.success ? { ok: true } : { ok: false, reason: 'rejected' }
  } catch {
    return { ok: false, reason: 'verification-failed' }
  }
}
