import aboutImage from '../../assets/images/up-trip5-optimized.webp'
import ActionLink from '../atoms/ActionLink'

function AboutUs() {
  return (
    <section className="about-us" id="about" aria-labelledby="about-title">
      <div className="about-us__copy">
        <p className="eyebrow">About us</p>
        <h2 id="about-title">A local, husband-and-wife team.</h2>
        <p>
          We&apos;re James and Erin Caldwell, and we started Tech Outfitters to bring affordable,
          technically sound websites to small businesses across Monticello, Otsego, Big Lake, and
          the surrounding communities. We&apos;ve seen how fast these areas are growing, and how
          many great local businesses get left behind by outdated websites and expensive agencies.
        </p>
        <p>
          James brings a software engineering background - React, TypeScript, .NET, and AI-assisted
          development - and Erin brings 20 years of project leadership, operations, and client
          communication. Together, we build and support websites that help local businesses thrive.
        </p>
        <ActionLink href="https://jcaldwell.io/projects" variant="outline" target="_blank" rel="noreferrer">
          See James&apos;s portfolio
        </ActionLink>
      </div>

      <div className="about-us__media">
        <img
          src={aboutImage}
          alt="James and Erin Caldwell outdoors on a summer river walk"
          width={640}
          height={481}
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  )
}

export default AboutUs
