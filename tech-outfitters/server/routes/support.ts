import type { Env } from '../lib/env'
import { json } from '../lib/security'
import { verifyAccessRequest } from '../lib/access'
import { hashToken } from '../lib/tokens'
import { findClientById } from '../lib/clients'
import { getClientFiles, getComparisonSites, getSubmissionForClient } from '../lib/intake'

// Staff-only: resolves a client share code. Requires a verified Cloudflare Access identity
// AND a valid, unexpired share code — two independent checks, neither sufficient alone.
export async function handleSupportView(request: Request, env: Env, code: string): Promise<Response> {
  const identity = await verifyAccessRequest(request, env)
  if (!identity) return json({ error: 'Admin sign-in required.' }, { status: 403 })

  const hashed = await hashToken(code)
  const clientId = await env.KV.get(`share:code:${hashed}`)
  if (!clientId) return json({ error: 'This share link has expired or was revoked.' }, { status: 404 })

  const client = await findClientById(env, clientId)
  const submission = await getSubmissionForClient(env, clientId)
  if (!client || !submission) return json({ error: 'No intake found for this client.' }, { status: 404 })

  const [comparisonSites, files] = await Promise.all([
    getComparisonSites(env, submission.id),
    getClientFiles(env, clientId),
  ])

  // Audit trail: who viewed which client's session, never the share code itself.
  console.log(JSON.stringify({ event: 'support_share_view', adminEmail: identity.email, clientId, at: new Date().toISOString() }))

  return json({ client, submission, comparisonSites, files })
}
