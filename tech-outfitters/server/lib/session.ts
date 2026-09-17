import type { Env } from './env'

const sessionCookieName = 'to_session'
const sessionMaxAgeSeconds = 60 * 24 * 60 * 60 // 60 days

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replaceAll('-', '+').replaceAll('_', '/').padEnd(value.length + ((4 - (value.length % 4)) % 4), '=')
  const binary = atob(padded)
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

async function getSigningKey(env: Env): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(env.SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

// Session cookie = base64url(payload).base64url(HMAC signature); no server-side session store needed.
export async function createSessionCookie(env: Env, clientId: string): Promise<string> {
  const payload = JSON.stringify({ cid: clientId, exp: Date.now() + sessionMaxAgeSeconds * 1000 })
  const payloadBytes = new TextEncoder().encode(payload)
  const key = await getSigningKey(env)
  const signature = await crypto.subtle.sign('HMAC', key, payloadBytes)
  const value = `${toBase64Url(payloadBytes)}.${toBase64Url(new Uint8Array(signature))}`

  return [
    `${sessionCookieName}=${value}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${sessionMaxAgeSeconds}`,
  ].join('; ')
}

export function clearSessionCookie(): string {
  return `${sessionCookieName}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get('cookie')
  if (!header) return null
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return rest.join('=')
  }
  return null
}

// Returns the authenticated client id for this request, or null if no valid session exists.
export async function getSessionClientId(request: Request, env: Env): Promise<string | null> {
  const cookieValue = readCookie(request, sessionCookieName)
  if (!cookieValue) return null

  const [payloadPart, signaturePart] = cookieValue.split('.')
  if (!payloadPart || !signaturePart) return null

  try {
    const key = await getSigningKey(env)
    const payloadBytes = fromBase64Url(payloadPart)
    const valid = await crypto.subtle.verify('HMAC', key, fromBase64Url(signaturePart), payloadBytes)
    if (!valid) return null

    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as { cid?: string, exp?: number }
    if (!payload.cid || !payload.exp || payload.exp < Date.now()) return null
    return payload.cid
  } catch {
    return null
  }
}
