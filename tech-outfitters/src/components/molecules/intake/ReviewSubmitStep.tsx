import { useId, useState } from 'react'
import StatusMessage from '../../atoms/StatusMessage'
import type { IntakeState } from '../../../types/intake'

type ReviewSubmitStepProps = {
  state: IntakeState
  onSubmit: () => Promise<void>
  onBack: () => void
}

function ReviewSubmitStep({ state, onSubmit, onBack }: ReviewSubmitStepProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const headingId = useId()
  const { client, submission, comparisonSites, files } = state

  async function handleSubmit() {
    setStatus('loading')
    setErrorMessage('')
    try {
      await onSubmit()
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'We could not submit your details. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <section aria-labelledby={headingId}>
        <h2 id={headingId}>You&rsquo;re all set</h2>
        <p>Thanks, {client.first_name}! We received your project details and will follow up soon to schedule a call.</p>
      </section>
    )
  }

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>Review your details</h2>
      <dl className="review-summary">
        <dt>Name</dt>
        <dd>{client.first_name} {client.last_name}</dd>
        <dt>Email</dt>
        <dd>{client.email}</dd>
        {submission.current_website_likes && (<><dt>Current site — likes</dt><dd>{submission.current_website_likes}</dd></>)}
        {submission.current_website_dislikes && (<><dt>Current site — dislikes</dt><dd>{submission.current_website_dislikes}</dd></>)}
        {submission.features_needed && (<><dt>Features needed</dt><dd>{submission.features_needed}</dd></>)}
        {submission.existing_domain && (<><dt>Existing domain</dt><dd>{submission.existing_domain}</dd></>)}
        {submission.preferred_tech_stack && (<><dt>Preferred tech stack</dt><dd>{submission.preferred_tech_stack}</dd></>)}
        {comparisonSites.length > 0 && (
          <>
            <dt>Comparison sites</dt>
            <dd>
              <ul>
                {comparisonSites.map((site) => <li key={site.id}>{site.url}</li>)}
              </ul>
            </dd>
          </>
        )}
        {files.length > 0 && (
          <>
            <dt>Uploaded files</dt>
            <dd>
              <ul>
                {files.map((file) => <li key={file.id}>{file.original_filename}</li>)}
              </ul>
            </dd>
          </>
        )}
      </dl>

      <div className="wizard-step__actions">
        <button type="button" className="wizard-step__secondary" onClick={onBack}>Back</button>
        <button type="button" className="wizard-step__primary" onClick={handleSubmit} disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting…' : 'Submit project details'}
        </button>
      </div>
      <StatusMessage tone={status === 'idle' ? 'idle' : status}>{status === 'error' && errorMessage}</StatusMessage>
    </section>
  )
}

export default ReviewSubmitStep
