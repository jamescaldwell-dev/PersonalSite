import { useId, useState } from 'react'

type DesignPreferenceStepProps = {
  initialValue: boolean | null
  onContinue: (hasDesignInMind: boolean | null) => Promise<void>
  onBack: () => void
}

function DesignPreferenceStep({ initialValue, onContinue, onBack }: DesignPreferenceStepProps) {
  const [value, setValue] = useState<boolean | null>(initialValue)
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
      <h2 id={headingId}>Do you already have a design in mind?</h2>
      <fieldset className="wizard-field">
        <legend>This helps us know whether to start from your files or from inspiration sites.</legend>
        <label>
          <input type="radio" name="has-design" checked={value === true} onChange={() => setValue(true)} />
          {' '}Yes, I have design files to share
        </label>
        <label>
          <input type="radio" name="has-design" checked={value === false} onChange={() => setValue(false)} />
          {' '}No, let&rsquo;s figure it out together
        </label>
      </fieldset>

      <div className="wizard-step__actions">
        <button type="button" className="wizard-step__secondary" onClick={onBack}>Back</button>
        <button type="button" className="wizard-step__primary" onClick={handleContinue} disabled={saving}>
          {saving ? 'Saving…' : 'Continue'}
        </button>
      </div>
    </section>
  )
}

export default DesignPreferenceStep
