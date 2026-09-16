import heroImage from '../../assets/design-foundations/profilepic-optimized.jpg'
import resumePdf from '../../assets/design-foundations/JamesCaldwellResume.pdf'
import ActionLink from '../atoms/ActionLink'
import ArrowIcon from '../atoms/ArrowIcon'

function SplitHero() {
  return (
    <section className="split-hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Full-stack developer / {new Date().getFullYear()}</p>
        <h1 id="hero-title">
          Building digital
          <span>experiences</span>
          with intention.
        </h1>
        <p className="hero-intro">
          I&apos;m James Caldwell, a full-stack developer who turns thoughtful ideas into
          powerful UI/UX.
        </p>
        <div className="hero-actions">
          <ActionLink href="/projects">View selected work</ActionLink>
          <ActionLink href="/contact" variant="outline">
            Start a conversation
          </ActionLink>
        </div>
      </div>

      <div className="hero-portrait">
        <div className="portrait-frame">
          <img src={heroImage} alt="James Caldwell, full-stack developer" fetchPriority="high" width="475" height="640" />
          <span className="portrait-label">James Caldwell / 01</span>
        </div>
        <a
          className="resume-link"
          href={resumePdf}
          download="JamesCaldwellResume.pdf"
        >
          View resume
          <ArrowIcon className="resume-link__arrow" />
        </a>
      </div>
    </section>
  )
}

export default SplitHero
