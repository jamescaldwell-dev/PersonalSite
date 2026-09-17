import { useId, useState } from 'react'

type CurrentWebsiteValue = {
  hasCurrentWebsite: boolean | null
  currentWebsiteUrl: string
  currentWebsiteLikes: string
  currentWebsiteDislikes: string
}

type CurrentWebsiteStepProps = {
  initialValue: CurrentWebsiteValue
  onContinue: (value: CurrentWebsiteValue) => Promise<void>
  onBack: () => void
}

function CurrentWebsiteStep({ initialValue, onContinue, onBack }: CurrentWebsiteStepProps) {
  const [value, setValue] = useState(initialValue)
  const [saving, setSaving] = useState(false)
  const headingId = useId()

  async function handleContinue() {
    setSaving(true)
    try {
      await onContinue(value)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>Your current website</h2>
      <p>None of these are required — skip anything you&rsquo;re not sure about.</p>

      <fieldset className="wizard-field">
        <legend>Do you currently have a website?</legend>
        <label>
          <input
            type="radio"
            name="has-current-website"
            checked={value.hasCurrentWebsite === true}
            onChange={() => setValue((current) => ({ ...current, hasCurrentWebsite: true }))}
          />
          {' '}Yes
        </label>
        <label>
          <input
            type="radio"
            name="has-current-website"
            checked={value.hasCurrentWebsite === false}
            onChange={() => setValue((current) => ({ ...current, hasCurrentWebsite: false, currentWebsiteUrl: '' }))}
          />
          {' '}No
        </label>
      </fieldset>

      {value.hasCurrentWebsite && (
        <div className="wizard-field">
          <label htmlFor="current-website-url">Website URL</label>
          <input
            id="current-website-url"
            type="url"
            placeholder="https://example.com"
            value={value.currentWebsiteUrl}
            onChange={(event) => { const next = event.currentTarget.value; setValue((current) => ({ ...current, currentWebsiteUrl: next })) }}
          />
        </div>
      )}

      <div className="wizard-field">
        <label htmlFor="current-website-likes">What do you like about it?</label>
        <textarea
          id="current-website-likes"
          rows={3}
          value={value.currentWebsiteLikes}
          onChange={(event) => { const next = event.currentTarget.value; setValue((current) => ({ ...current, currentWebsiteLikes: next })) }}
        />
      </div>

      <div className="wizard-field">
        <label htmlFor="current-website-dislikes">What don&rsquo;t you like about it?</label>
        <textarea
          id="current-website-dislikes"
          rows={3}
          value={value.currentWebsiteDislikes}
          onChange={(event) => { const next = event.currentTarget.value; setValue((current) => ({ ...current, currentWebsiteDislikes: next })) }}
        />
      </div>

      <div className="wizard-step__actions">
        <button type="button" className="wizard-step__secondary" onClick={onBack}>Back</button>
        <button type="button" className="wizard-step__primary" onClick={handleContinue} disabled={saving}>
          {saving ? 'Saving…' : 'Continue'}
        </button>
      </div>
    </section>
  )
}

export default CurrentWebsiteStep
export type { CurrentWebsiteValue }
