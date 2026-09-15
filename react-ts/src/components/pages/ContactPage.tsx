import SiteHeader from '../molecules/SiteHeader'
import SiteFooter from '../molecules/SiteFooter'
import contactBackgroundImage from '../../assets/design-foundations/background.jpg'
import SEO from '../atoms/SEO'

function ContactPage() {
  return (
    <main className="portfolio-shell contact-page" id="contact">
      <SEO
        title="Contact James Caldwell | Software Engineer"
        description="Contact James Caldwell about software engineering, technical training, React, TypeScript, and thoughtful digital product work."
        path="/contact"
        structuredData={{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact James Caldwell', url: 'https://jcaldwell.io/contact' }}
      />
      <SiteHeader />

      <section
        className="contact-intro"
        aria-labelledby="contact-title"
        style={{ backgroundImage: `url(${contactBackgroundImage})` }}
      >
        <div>
          <p className="eyebrow">Start a conversation / 05</p>
          <h1 id="contact-title">Let&apos;s make<br /><span>something useful.</span></h1>
        </div>
        <p className="contact-intro__copy">
          Have a project in mind, or just want to compare notes? <strong>Reach out directly</strong> and I&apos;ll get back to you soon.
        </p>
      </section>

      <section className="contact-layout" aria-label="Contact options">
        <div className="contact-aside">
          <p className="contact-aside__label">Good conversations start small.</p>
          <p>Tell me what you&apos;re working on, where things are stuck, or what you&apos;d like to explore.</p>
        </div>

        <div className="contact-options">
          <a className="contact-option" href="mailto:james.caldwell82@outlook.com?subject=Inquiry%20on%20jcaldwell.io">
            <span className="contact-option__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M3 5.5h18v13H3v-13Zm1.8 1.8 7.2 5.4 7.2-5.4M4.8 16.7l5.1-4m9.3 4-5.1-4" />
              </svg>
            </span>
            <span>
              <strong>Email James</strong>
              <small>Open your email client</small>
            </span>
            <span className="contact-option__arrow" aria-hidden="true">↗</span>
          </a>

          <a className="contact-option" href="https://www.linkedin.com/in/james-caldwell-686042138/" target="_blank" rel="noreferrer">
            <span className="contact-option__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M5.2 8.2H2.1V21h3.1V8.2ZM3.65 2A1.82 1.82 0 1 0 3.65 5.64 1.82 1.82 0 0 0 3.65 2ZM21.9 13.67c0-3.86-2.06-5.66-4.81-5.66-2.22 0-3.21 1.22-3.76 2.08V8.2h-3.1V21h3.1v-6.33c0-1.67.31-3.29 2.39-3.29 2.05 0 2.08 1.92 2.08 3.4V21h3.1v-7.33Z" />
              </svg>
            </span>
            <span>
              <strong>Message on LinkedIn</strong>
              <small>Connect with James Caldwell</small>
            </span>
            <span className="contact-option__arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}

export default ContactPage