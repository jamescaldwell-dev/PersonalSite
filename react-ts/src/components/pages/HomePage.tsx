import SiteHeader from '../molecules/SiteHeader'
import SiteFooter from '../molecules/SiteFooter'
import SEO, { siteUrl } from '../atoms/SEO'
import AfkSection from '../organisms/AfkSection'
import SplitHero from '../organisms/SplitHero'

function HomePage() {
  return (
    <main className="portfolio-shell" id="home">
      <SEO
        title="James Caldwell | Full-Stack Developer & Technical Trainer"
        description="James Caldwell is a full-stack developer and technical trainer creating thoughtful React, TypeScript, and healthcare technology experiences."
        path="/"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'James Caldwell',
            url: siteUrl,
            jobTitle: 'Full-Stack Developer and Technical Trainer',
            address: { '@type': 'PostalAddress', addressLocality: 'Monticello', addressRegion: 'MN', addressCountry: 'US' },
            sameAs: ['https://www.linkedin.com/in/james-caldwell-686042138/'],
            knowsAbout: ['React', 'TypeScript', 'ASP.NET Core', 'GraphQL', 'Healthcare technology'],
          },
          { '@context': 'https://schema.org', '@type': 'WebSite', name: 'James Caldwell', url: siteUrl },
        ]}
      />
      <SiteHeader />
      <SplitHero />

      <section className="home-footer" aria-label="Portfolio overview">
        <p>Based in Monticello, Minnesota, USA</p>
        <a href="/about" className="scroll-cue">
          <span>Explore</span>
          <span aria-hidden="true">↓</span>
        </a>
        <p className="home-footer__discipline">Strategy / Interface / Engineering</p>
      </section>

      <AfkSection />

      <div className="placeholder-sections" aria-hidden="true">
        <section id="resume" />
        <section id="projects" />
      </div>

      <SiteFooter />
    </main>
  )
}

export default HomePage
