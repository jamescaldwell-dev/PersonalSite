import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SEO from '../atoms/SEO'
import StatusMessage from '../atoms/StatusMessage'
import type { IntakeState } from '../../types/intake'

// Staff-only view: the page itself is gated by a Cloudflare Access policy at the edge;
// the Worker independently re-verifies the Access JWT + share code before returning any data.
function SupportViewPage() {
  const { code } = useParams<{ code: string }>()
  const [state, setState] = useState<IntakeState | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!code) return
    fetch(`/support/${code}`, { headers: { Accept: 'application/json' } })
      .then(async (response) => {
        if (!response.ok) {
          const body = await response.json().catch(() => null) as { error?: string } | null
          throw new Error(body?.error ?? 'This share link is invalid or has expired.')
        }
        return response.json() as Promise<IntakeState>
      })
      .then((loaded) => {
        setState(loaded)
        setStatus('ready')
      })
      .catch((error: unknown) => {
        setErrorMessage(error instanceof Error ? error.message : 'This share link is invalid or has expired.')
        setStatus('error')
      })
  }, [code])

  return (
    <main className="site-shell support-view-page">
      <SEO title="Client Intake — Support View" description="Internal support view." path={`/support/${code ?? ''}`} noIndex />
      <h1>Client project intake</h1>

      {status === 'loading' && <p>Loading…</p>}
      {status === 'error' && <StatusMessage tone="error">{errorMessage}</StatusMessage>}

      {status === 'ready' && state && (
        <dl className="review-summary">
          <dt>Name</dt>
          <dd>{state.client.first_name} {state.client.last_name}</dd>
          <dt>Email</dt>
          <dd>{state.client.email}</dd>
          <dt>Status</dt>
          <dd>{state.submission.status}</dd>
          {state.submission.current_website_likes && (<><dt>Current site — likes</dt><dd>{state.submission.current_website_likes}</dd></>)}
          {state.submission.current_website_dislikes && (<><dt>Current site — dislikes</dt><dd>{state.submission.current_website_dislikes}</dd></>)}
          {state.submission.features_needed && (<><dt>Features needed</dt><dd>{state.submission.features_needed}</dd></>)}
          {state.comparisonSites.length > 0 && (
            <>
              <dt>Comparison sites</dt>
              <dd><ul>{state.comparisonSites.map((site) => <li key={site.id}>{site.url}</li>)}</ul></dd>
            </>
          )}
          {state.files.length > 0 && (
            <>
              <dt>Uploaded files</dt>
              <dd><ul>{state.files.map((file) => <li key={file.id}>{file.original_filename}</li>)}</ul></dd>
            </>
          )}
        </dl>
      )}
    </main>
  )
}

export default SupportViewPage
