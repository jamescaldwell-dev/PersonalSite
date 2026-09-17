import type { Env } from './env'
import { fetchWithTimeout } from './security'

type Jwk = JsonWebKey & { kid?: string }
type Jwks = { keys: Jwk[] }

const jwksCacheTtlSeconds = 3600

function base64UrlDecode(value: string): Uint8Array {
  const padded = value.replaceAll('-', '+').replaceAll('_', '/').padEnd(value.length + ((4 - (value.length % 4)) % 4), '=')
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0))
}

async function getJwks(env: Env): Promise<Jwks> {
  const cached = await env.KV.get('access:jwks')
  if (cached) return JSON.parse(cached) as Jwks

  const response = await fetchWithTimeout(`${env.CF_ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`)
  const jwks = await response.json() as Jwks
  await env.KV.put('access:jwks', JSON.stringify(jwks), { expirationTtl: jwksCacheTtlSeconds })
  return jwks
}

export type AccessIdentity = { email: string }

// Validates a Cloudflare Access-issued JWT (see Access docs on validating the app token).
// Returns the verified admin identity, or null if the request is not a valid, allowlisted Access session.
export async function verifyAccessRequest(request: Request, env: Env): Promise<AccessIdentity | null> {
  const token = request.headers.get('cf-access-jwt-assertion')
  if (!token) return null

  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [headerPart, payloadPart, signaturePart] = parts

  let header: { kid?: string, alg?: string }
  let payload: { aud?: string[] | string, exp?: number, email?: string }
  try {
    header = JSON.parse(new TextDecoder().decode(base64UrlDecode(headerPart)))
    payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadPart)))
  } catch {
    return null
  }

  if (!header.kid || header.alg !== 'RS256') return null

  const jwks = await getJwks(env)
  const jwk = jwks.keys.find((key) => key.kid === header.kid)
  if (!jwk) return null

  const publicKey = await crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify'],
  )

  const signedData = new TextEncoder().encode(`${headerPart}.${payloadPart}`)
  const signature = base64UrlDecode(signaturePart)
  const validSignature = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', publicKey, signature, signedData)
  if (!validSignature) return null

  const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud]
  if (!payload.exp || payload.exp * 1000 < Date.now() || !audiences.includes(env.CF_ACCESS_AUD)) return null

  const email = payload.email?.toLowerCase()
  const allowlist = env.CF_ACCESS_ADMIN_EMAILS.split(',').map((value) => value.trim().toLowerCase()).filter(Boolean)
  if (!email || !allowlist.includes(email)) return null

  return { email }
}
