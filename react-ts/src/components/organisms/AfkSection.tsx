import { useEffect, useRef, useState } from 'react'
import bwca2Image from '../../assets/design-foundations/bwca2-optimized.webp'
import afkBackgroundImage from '../../assets/design-foundations/background-optimized.webp'
import ActionLink from '../atoms/ActionLink'

function AfkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [shouldLoadBackground, setShouldLoadBackground] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadBackground(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="afk-section"
      id="about"
      aria-labelledby="afk-title"
      style={shouldLoadBackground ? { backgroundImage: `url(${afkBackgroundImage})` } : undefined}
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
        <ActionLink href="/about" variant="outline">
          More about James
        </ActionLink>
      </div>

      <div className="afk-gallery">
        <figure className="afk-image afk-image--tall">
          <img src={bwca2Image} alt="A canoeist resting on a quiet lake surrounded by trees" loading="lazy" decoding="async" width="640" height="853" />
          <figcaption>Boundary Waters / Minnesota with my bestie</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default AfkSection