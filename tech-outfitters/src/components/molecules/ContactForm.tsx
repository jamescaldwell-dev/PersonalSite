import { useState, type FormEvent } from 'react'
import StatusMessage from '../atoms/StatusMessage'
import CaptchaWidget from './CaptchaWidget'

type FormState = {
  name: string
  email: string
  businessName: string
  message: string
}

const initialState: FormState = { name: '', email: '', businessName: '', message: '' }

function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [captchaToken, setCaptchaToken] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function updateField(field: keyof FormState) {
    return (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.currentTarget.value }))
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      setErrorMessage('Please fill out your name, email, and message.')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, captchaToken }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error ?? 'Your message could not be sent. Please try again.')
      }

      setStatus('success')
      setForm(initialState)
      setCaptchaToken('')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Your message could not be sent. Please try again.')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" type="text" required autoComplete="name" value={form.name} onChange={updateField('name')} />
      </div>

      <div className="contact-form__row">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={updateField('email')} />
      </div>

      <div className="contact-form__row">
        <label htmlFor="contact-business">Business name</label>
        <input id="contact-business" name="businessName" type="text" autoComplete="organization" value={form.businessName} onChange={updateField('businessName')} />
      </div>

      <div className="contact-form__row">
        <label htmlFor="contact-message">What are you looking for?</label>
        <textarea id="contact-message" name="message" required rows={5} value={form.message} onChange={updateField('message')} />
      </div>

      <CaptchaWidget onToken={setCaptchaToken} onExpire={() => setCaptchaToken('')} />

      <button type="submit" className="contact-form__submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>

      <StatusMessage tone={status === 'idle' ? 'idle' : status}>
        {status === 'error' && errorMessage}
        {status === 'success' && 'Thanks for reaching out — we\u2019ll get back to you soon.'}
        {status === 'loading' && 'Sending your message…'}
      </StatusMessage>
    </form>
  )
}

export default ContactForm
