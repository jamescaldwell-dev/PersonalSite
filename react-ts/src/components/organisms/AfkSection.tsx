import bwca2Image from '../../assets/design-foundations/bwca2.jpg'
import afkBackgroundImage from '../../assets/design-foundations/background.jpg'
import ActionLink from '../atoms/ActionLink'

function AfkSection() {
  return (
    <section
      className="afk-section"
      id="about"
      aria-labelledby="afk-title"
      style={{ backgroundImage: `url(${afkBackgroundImage})` }}
    >
      <div className="afk-heading">
        <p className="eyebrow">When I&apos;m AFK / 02</p>
        <h2 id="afk-title">Go to the forest for rest...<em>not all who wander are lost</em></h2>
      </div>

      <div className="afk-story">
        <p className="afk-story__lead">
          When I&apos;m away from the screen, I like to spend my time unplugged in nature.
          The quiet helps me return with a clearer head and a better sense of what matters.
        </p>
        <ActionLink href="#about-james" variant="outline">
          More about James
        </ActionLink>
      </div>

      <div className="afk-gallery">
        <figure className="afk-image afk-image--tall">
          <img src={bwca2Image} alt="A canoeist resting on a quiet lake surrounded by trees" />
          <figcaption>Boundary Waters / Minnesota with my bestie</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default AfkSection