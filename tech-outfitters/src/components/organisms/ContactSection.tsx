import ContactForm from '../molecules/ContactForm'

const contactImage = 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=1200&q=80'

function ContactSection() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__intro">
        <p className="eyebrow">Let&apos;s get you online</p>
        <h2 id="contact-title">Tell us about your business.</h2>
        <p>
          Share a few details and we&apos;ll follow up with a free preview of what your new site
          could look like - often within a day.
        </p>
        <img
          src={contactImage}
          alt="Close-up of program code on a screen"
          className="contact__image"
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
        />
      </div>
      <ContactForm />
    </section>
  )
}

export default ContactSection
