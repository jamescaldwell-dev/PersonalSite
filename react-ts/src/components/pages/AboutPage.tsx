import SiteHeader from '../molecules/SiteHeader'
import SiteFooter from '../molecules/SiteFooter'
import ActionLink from '../atoms/ActionLink'
import AboutGallery from '../organisms/AboutGallery'
import SEO from '../atoms/SEO'

function AboutPage() {
  return (
    <main className="portfolio-shell about-page" id="about-james">
      <SEO
        title="About James Caldwell | Developer, Trainer & Outdoor Enthusiast"
        description="Learn about James Caldwell, a software engineer and technical trainer who enjoys thoughtful products, clear systems, and time outdoors."
        path="/about"
        structuredData={{ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About James Caldwell', url: 'https://jcaldwell.io/about', description: 'About James Caldwell and his interests outside software development.' }}
      />
      <SiteHeader />

      <section className="about-intro" aria-labelledby="about-title">
        <p className="eyebrow">More about James / 03</p>
        <h1 id="about-title">Curious by<br /><span>nature.</span></h1>
        <div className="about-intro__copy">
          <p>
            I&apos;m James Caldwell, a software engineer and technical trainer based in
            Monticello, Minnesota. I enjoy turning complex ideas into useful, human-scale
            experiences.
          </p>
          <p>
            Outside of work, I make room for the slower things: time outdoors, long walks,
            and getting far enough away from a screen to notice the landscape again.
          </p>
          <ActionLink href="/" variant="outline">Back to home</ActionLink>
        </div>
      </section>

      <AboutGallery />
      <SiteFooter />
    </main>
  )
}

export default AboutPage