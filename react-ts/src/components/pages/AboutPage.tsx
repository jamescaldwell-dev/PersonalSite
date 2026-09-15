import SiteHeader from '../molecules/SiteHeader'
import ActionLink from '../atoms/ActionLink'

function AboutPage() {
  return (
    <main className="portfolio-shell about-page" id="about-james">
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
          <ActionLink href="#home" variant="outline">Back to home</ActionLink>
        </div>
      </section>
    </main>
  )
}

export default AboutPage