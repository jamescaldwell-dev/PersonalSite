import { useId, useState } from 'react'
import ComparisonSitesField from './ComparisonSitesField'
import FileUploadInput from '../../atoms/FileUploadInput'
import type { ComparisonSite } from '../../../types/intake'

type DesignDetailsValue = {
  featuresNeeded: string
  existingDomain: string
  hasNoDomain: boolean
  preferredTechStack: string
  hasBrandGuidelines: boolean | null
}

type DesignDetailsStepProps = {
  hasDesignInMind: boolean | null
  comparisonSites: ComparisonSite[]
  initialValue: DesignDetailsValue
  onAddComparisonSite: (url: string, notes: string) => Promise<void>
  onRemoveComparisonSite: (id: string) => Promise<void>
  onUploadDesignFile: (file: File) => Promise<void>
  onUploadBrandFile: (file: File) => Promise<void>
  onContinue: (value: DesignDetailsValue) => Promise<void>
  onBack: () => void
}

function DesignDetailsStep({
  hasDesignInMind,
  comparisonSites,
  initialValue,
  onAddComparisonSite,
  onRemoveComparisonSite,
  onUploadDesignFile,
  onUploadBrandFile,
  onContinue,
  onBack,
}: DesignDetailsStepProps) {
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

  if (hasDesignInMind) {
    return (
      <section aria-labelledby={headingId}>
        <h2 id={headingId}>Share your design files</h2>
        <FileUploadInput
          label="Design reference (.zip, up to 50MB)"
          helpText="Upload your existing design files, mockups, or inspiration as a zip."
          onFileSelected={onUploadDesignFile}
        />
        <div className="wizard-step__actions">
          <button type="button" className="wizard-step__secondary" onClick={onBack}>Back</button>
          <button type="button" className="wizard-step__primary" onClick={handleContinue} disabled={saving}>
            {saving ? 'Saving…' : 'Continue'}
          </button>
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>A few more details</h2>
      <p>Everything here is optional.</p>

      <ComparisonSitesField sites={comparisonSites} onAdd={onAddComparisonSite} onRemove={onRemoveComparisonSite} />

      <div className="wizard-field">
        <label htmlFor="features-needed">Are there certain features you need? (forms, booking, payments, animations, etc.)</label>
        <textarea
          id="features-needed"
          rows={3}
          value={value.featuresNeeded}
          onChange={(event) => { const next = event.currentTarget.value; setValue((current) => ({ ...current, featuresNeeded: next })) }}
        />
      </div>

      <div className="wizard-field">
        <label htmlFor="existing-domain">Your existing website or domain (if applicable)</label>
        <input
          id="existing-domain"
          value={value.existingDomain}
          disabled={value.hasNoDomain}
          onChange={(event) => { const next = event.currentTarget.value; setValue((current) => ({ ...current, existingDomain: next })) }}
        />
        <label>
          <input
            type="checkbox"
            checked={value.hasNoDomain}
            onChange={(event) => setValue((current) => ({ ...current, hasNoDomain: event.currentTarget.checked, existingDomain: '' }))}
          />
          {' '}I don&rsquo;t have a domain/website yet
        </label>
        <p className="wizard-field__note">
          If you don&rsquo;t have a domain, that&rsquo;s okay — we&rsquo;ll work through those details with you. This is an
          added cost (domains/hosting typically run about $10–$50/month).
        </p>
      </div>

      <div className="wizard-field">
        <label htmlFor="preferred-tech-stack">Preferred tech stack (optional, not required)</label>
        <input
          id="preferred-tech-stack"
          value={value.preferredTechStack}
          onChange={(event) => { const next = event.currentTarget.value; setValue((current) => ({ ...current, preferredTechStack: next })) }}
        />
      </div>

      <fieldset className="wizard-field">
        <legend>Do you have current brand guidelines (colors, fonts, etc.)?</legend>
        <label>
          <input
            type="radio"
            name="has-brand-guidelines"
            checked={value.hasBrandGuidelines === true}
            onChange={() => setValue((current) => ({ ...current, hasBrandGuidelines: true }))}
          />
          {' '}Yes
        </label>
        <label>
          <input
            type="radio"
            name="has-brand-guidelines"
            checked={value.hasBrandGuidelines === false}
            onChange={() => setValue((current) => ({ ...current, hasBrandGuidelines: false }))}
          />
          {' '}No
        </label>
      </fieldset>

      {value.hasBrandGuidelines && (
        <FileUploadInput label="Brand guidelines (.zip, up to 50MB)" onFileSelected={onUploadBrandFile} />
      )}
      {value.hasBrandGuidelines === false && <p>That&rsquo;s fine, we&rsquo;ll discuss that in our first meeting.</p>}

      <div className="wizard-step__actions">
        <button type="button" className="wizard-step__secondary" onClick={onBack}>Back</button>
        <button type="button" className="wizard-step__primary" onClick={handleContinue} disabled={saving}>
          {saving ? 'Saving…' : 'Continue'}
        </button>
      </div>
    </section>
  )
}

export default DesignDetailsStep
export type { DesignDetailsValue }
