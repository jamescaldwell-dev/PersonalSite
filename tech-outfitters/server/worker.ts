import type { Env } from './lib/env'
import { isAllowedOrigin, json, securityHeaders } from './lib/security'
import { handleContact } from './routes/contact'
import { handleLogout, handleStart } from './routes/auth'
import {
  handleAddComparisonSite,
  handleFileUpload,
  handleGetState,
  handlePatchStep,
  handleRemoveComparisonSite,
  handleSubmit,
} from './routes/intake'
import { handleCreateShare, handleRevokeShare } from './routes/share'
import { handleSupportView } from './routes/support'

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const isMutatingRequest = ['POST', 'PATCH', 'DELETE'].includes(request.method)

    if (isMutatingRequest && !isAllowedOrigin(request, env)) {
      return json({ error: 'This request origin is not allowed.' }, { status: 403 })
    }

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      return handleContact(request, env)
    }

    if (url.pathname === '/api/intake/start' && request.method === 'POST') {
      return handleStart(request, env)
    }
    if (url.pathname === '/api/auth/logout' && request.method === 'POST') {
      return handleLogout()
    }

    if (url.pathname === '/api/intake/state' && request.method === 'GET') {
      return handleGetState(request, env)
    }
    if (url.pathname === '/api/intake/step' && request.method === 'PATCH') {
      return handlePatchStep(request, env)
    }
    if (url.pathname === '/api/intake/comparison-sites' && request.method === 'POST') {
      return handleAddComparisonSite(request, env)
    }
    const comparisonSiteMatch = url.pathname.match(/^\/api\/intake\/comparison-sites\/([^/]+)$/)
    if (comparisonSiteMatch && request.method === 'DELETE') {
      return handleRemoveComparisonSite(request, env, comparisonSiteMatch[1])
    }
    if (url.pathname === '/api/intake/files' && request.method === 'POST') {
      return handleFileUpload(request, env)
    }
    if (url.pathname === '/api/intake/submit' && request.method === 'POST') {
      return handleSubmit(request, env)
    }
    if (url.pathname === '/api/intake/share' && request.method === 'POST') {
      return handleCreateShare(request, env)
    }
    if (url.pathname === '/api/intake/share/revoke' && request.method === 'POST') {
      return handleRevokeShare(request, env)
    }

    const supportMatch = url.pathname.match(/^\/support\/([^/]+)$/)
    if (supportMatch && request.method === 'GET' && request.headers.get('accept')?.includes('application/json')) {
      return handleSupportView(request, env, supportMatch[1])
    }

    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/support/')) {
      return new Response('Not found', { status: 404, headers: securityHeaders })
    }

    // Everything else (including /support/:code page loads) falls through to the built SPA.
    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
