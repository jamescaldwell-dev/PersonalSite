import type { Env } from '../lib/env'
import { json } from '../lib/security'
import { getSessionClientId } from '../lib/session'
import { generateToken, hashToken } from '../lib/tokens'

const shareTtlSeconds = 24 * 60 * 60

export async function handleCreateShare(request: Request, env: Env): Promise<Response> {
  const clientId = await getSessionClientId(request, env)
  if (!clientId) return json({ error: 'Please sign in again to continue.' }, { status: 401 })

  // Only one active code per client — creating a new one invalidates any prior share link.
  const previousHash = await env.KV.get(`share:client:${clientId}`)
  if (previousHash) await env.KV.delete(`share:code:${previousHash}`)

  const code = generateToken(16)
  const hashed = await hashToken(code)
  await env.KV.put(`share:code:${hashed}`, clientId, { expirationTtl: shareTtlSeconds })
  await env.KV.put(`share:client:${clientId}`, hashed, { expirationTtl: shareTtlSeconds })

  return json({ shareUrl: `${env.PUBLIC_SITE_URL}/support/${code}`, expiresInSeconds: shareTtlSeconds })
}

export async function handleRevokeShare(request: Request, env: Env): Promise<Response> {
  const clientId = await getSessionClientId(request, env)
  if (!clientId) return json({ error: 'Please sign in again to continue.' }, { status: 401 })

  const hashed = await env.KV.get(`share:client:${clientId}`)
  if (hashed) {
    await env.KV.delete(`share:code:${hashed}`)
    await env.KV.delete(`share:client:${clientId}`)
  }
  return json({ ok: true })
}
