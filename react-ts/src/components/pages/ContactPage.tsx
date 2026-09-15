import { type FormEvent, useState } from 'react'
import SiteHeader from '../molecules/SiteHeader'

type ContactForm = {
  name: string
  email: string
  subject: string
  message: string
}

const initialForm: ContactForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
    if (status !== 'idle') setStatus('idle')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(result?.error ?? 'Something went wrong. Please try again.')
      }

      setForm(initialForm)
      setStatus('success')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <main className="portfolio-shell contact-page" id="contact">
      <SiteHeader />

      <section className="contact-intro" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Start a conversation / 05</p>
          <h1 id="contact-title">Let&apos;s make<br /><span>something useful.</span></h1>
        </div>
        <p className="contact-intro__copy">
          Have a project in mind, or just want to compare notes? Send a message and I&apos;ll get back to you soon.
        </p>
      </section>

      <section className="contact-layout" aria-label="Contact form">
        <div className="contact-aside">
          <p className="contact-aside__label">Good conversations start small.</p>
          <p>Tell me what you&apos;re working on, where things are stuck, or what you&apos;d like to explore.</p>
          <a href="mailto:hello@jcaldwell.io">hello@jcaldwell.io <span aria-hidden="true">↗</span></a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__fields">
            <label>
              Name
              <input
                required
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
              />
            </label>
            <label>
              Email
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
              />
            </label>
          </div>
          <label>
            Subject
            <input
              required
              name="subject"
              type="text"
              value={form.subject}
              onChange={(event) => updateField('subject', event.target.value)}
            />
          </label>
          <label>
            Message
            <textarea
              required
              name="message"
              rows={7}
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
            />
          </label>

          <div className="contact-form__footer">
            <button className="contact-form__submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send message'} <span aria-hidden="true">↗</span>
            </button>
            <div aria-live="polite" className={`contact-form__status contact-form__status--${status}`}>
              {status === 'success' && 'Message sent. A copy is on its way to your inbox.'}
              {status === 'error' && errorMessage}
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}

export default ContactPage