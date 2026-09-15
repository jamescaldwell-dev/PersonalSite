import SiteHeader from '../molecules/SiteHeader'
import AfkSection from '../organisms/AfkSection'
import SplitHero from '../organisms/SplitHero'

function HomePage() {
  return (
    <main className="portfolio-shell" id="home">
      <SiteHeader />
      <SplitHero />

      <section className="home-footer" aria-label="Portfolio overview">
        <p>Based in Monticello, Minnesota, USA</p>
        <a href="#about" className="scroll-cue">
          <span>Explore</span>
          <span aria-hidden="true">↓</span>
        </a>
        <p className="home-footer__discipline">Strategy / Interface / Engineering</p>
      </section>

      <AfkSection />

      <div className="placeholder-sections" aria-hidden="true">
        <section id="resume" />
        <section id="projects" />
        <section id="contact" />
      </div>
    </main>
  )
}

export default HomePage
