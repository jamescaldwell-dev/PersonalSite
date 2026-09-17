import ActionLink from '../atoms/ActionLink'

const heroImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow">Tech Outfitters / Monticello &amp; Otsego, MN</p>
        <h1 id="hero-title">
          Engineer-vetted websites
          <span>that bring you business.</span>
        </h1>
        <p className="hero__intro">
          We build fast, affordable, AI-assisted websites - reviewed by a real software engineer -
          that turn local searches into calls, bookings, and walk-ins for your business.
        </p>
        <div className="hero__actions">
          <ActionLink href="/get-started">Start your project</ActionLink>
          <ActionLink href="#contact" variant="outline">Get your free preview</ActionLink>
        </div>
      </div>

      <div className="hero__media">
        <img
          src={heroImage}
          alt="Close-up of code on a laptop screen, representing engineer-vetted development"
          width={1200}
          height={800}
          fetchPriority="high"
        />
      </div>
    </section>
  )
}

export default Hero
