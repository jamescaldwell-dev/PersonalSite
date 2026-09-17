import { useCallback, useId, useState, type FormEvent } from 'react'
import CaptchaWidget from '../CaptchaWidget'
import StatusMessage from '../../atoms/StatusMessage'
import type { BasicInfo } from '../../../types/intake'

type BasicInfoStepProps = {
  onSubmit: (info: BasicInfo & { captchaToken: string }) => Promise<void>
}

const initialState: BasicInfo = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  address: '',
  businessType: '',
}

function BasicInfoStep({ onSubmit }: BasicInfoStepProps) {
  const [form, setForm] = useState<BasicInfo>(initialState)
  const [captchaToken, setCaptchaToken] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const headingId = useId()

  const requiredFieldsMissing = !form.firstName.trim() || !form.lastName.trim() || !form.email.trim()

  const handleCaptchaExpire = useCallback(() => setCaptchaToken(''), [])

  function updateField(field: keyof BasicInfo) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value
      setForm((current) => ({ ...current, [field]: value }))
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (requiredFieldsMissing) {
      setStatus('error')
      setErrorMessage('First name, last name, and email are required to save your progress.')
      return
    }

    setStatus('loading')
    setErrorMessage('')
    try {
      await onSubmit({ ...form, captchaToken } as BasicInfo & { captchaToken: string })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'We could not save your details. Please try again.')
      return
    }
    setStatus('idle')
  }

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>Tell us about you</h2>
      <p>Only your name and email are required — everything else is optional.</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="wizard-field">
          <label htmlFor="basic-first-name">First name</label>
          <input id="basic-first-name" required autoComplete="given-name" value={form.firstName} onChange={updateField('firstName')} />
        </div>
        <div className="wizard-field">
          <label htmlFor="basic-last-name">Last name</label>
          <input id="basic-last-name" required autoComplete="family-name" value={form.lastName} onChange={updateField('lastName')} />
        </div>
        <div className="wizard-field">
          <label htmlFor="basic-email">Email</label>
          <input id="basic-email" type="email" required autoComplete="email" value={form.email} onChange={updateField('email')} />
        </div>
        <div className="wizard-field">
          <label htmlFor="basic-company">Company (optional)</label>
          <input id="basic-company" autoComplete="organization" value={form.company} onChange={updateField('company')} />
        </div>
        <div className="wizard-field">
          <label htmlFor="basic-phone">Phone (optional)</label>
          <input id="basic-phone" type="tel" autoComplete="tel" value={form.phone} onChange={updateField('phone')} />
        </div>
        <div className="wizard-field">
          <label htmlFor="basic-address">Address (optional)</label>
          <input id="basic-address" autoComplete="street-address" value={form.address} onChange={updateField('address')} />
        </div>
        <div className="wizard-field">
          <label htmlFor="basic-business-type">Type of business (optional)</label>
          <input id="basic-business-type" value={form.businessType} onChange={updateField('businessType')} />
        </div>

        <CaptchaWidget onToken={setCaptchaToken} onExpire={handleCaptchaExpire} />

        <div className="wizard-step__actions">
          <button type="submit" className="wizard-step__primary" disabled={status === 'loading' || requiredFieldsMissing}>
            {status === 'loading' ? 'Saving…' : 'Continue'}
          </button>
        </div>
        <StatusMessage tone={status === 'idle' ? 'idle' : status}>{status === 'error' && errorMessage}</StatusMessage>
      </form>
    </section>
  )
}

export default BasicInfoStep
