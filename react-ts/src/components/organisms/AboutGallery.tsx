import bwca4 from '../../assets/design-foundations/bwca4-optimized.webp'
import sunset1 from '../../assets/design-foundations/sunset1-optimized.webp'
import sunset2 from '../../assets/design-foundations/sunset2-optimized.webp'
import upTrip1 from '../../assets/design-foundations/up-trip1-optimized.webp'
import upTrip2 from '../../assets/design-foundations/up-trip2-optimized.webp'
import upTrip3 from '../../assets/design-foundations/up-trip3-optimized.webp'
import upTrip4 from '../../assets/design-foundations/up-trip4-optimized.webp'
import upTrip5 from '../../assets/design-foundations/up-trip5-optimized.webp'
import upTrip6 from '../../assets/design-foundations/up-trip6-optimized.webp'

type GalleryImage = {
  src: string
  alt: string
  caption: string
  layout: string
  width: number
  height: number
}

const galleryImages: GalleryImage[] = [
  { src: sunset2, alt: 'A green field beneath a dramatic sunset sky', caption: 'Evening / open country', layout: 'about-gallery__item--lead', width: 640, height: 481 },
  { src: bwca4, alt: 'A dark lake and tree silhouettes under a fading blue sky', caption: 'Boundary Waters / dusk', layout: 'about-gallery__item--anchor', width: 640, height: 480 },
  { src: upTrip1, alt: 'Blue water meeting a rocky shoreline beneath a clear sky', caption: 'Black Rocks | cliff jumping', layout: 'about-gallery__item--lower-left', width: 640, height: 481 },
  { src: upTrip2, alt: 'A turquoise bay curving around a wooded sandy bluff', caption: 'Pictured Rocks / sand dunes', layout: 'about-gallery__item--lower-right', width: 640, height: 480 },
  { src: upTrip6, alt: 'A tall pine rising into a bright blue sky', caption: 'Forest canopy / looking up', layout: 'about-gallery__item--vertical', width: 481, height: 640 },
  { src: upTrip3, alt: 'My family playing minigolf on Mackinac Island', caption: 'Mackinac Island / together', layout: 'about-gallery__item--stack-top', width: 640, height: 481 },
  { src: upTrip5, alt: 'A shallow river flowing over rocks through a green forest', caption: 'River walk / summer', layout: 'about-gallery__item--bottom-left', width: 640, height: 481 },
  { src: upTrip4, alt: 'James and Erin (wife) hiking on the North Shore', caption: 'Top of the falls / together', layout: 'about-gallery__item--stack-bottom', width: 640, height: 481 },
  { src: sunset1, alt: 'A coloful sunset in the backyard never lets me down', caption: 'Sunsets at home / late light', layout: 'about-gallery__item--bottom-right', width: 640, height: 480 },
]

function AboutGallery() {
  return (
    <section className="about-gallery" aria-labelledby="about-gallery-title">
      <div className="about-gallery__heading">
        <p className="eyebrow">Away from the screen / 04</p>
        <h2 id="about-gallery-title">A little room<br /><em>to wander.</em></h2>
        <p>Small records of the places and people that keep the work grounded.</p>
      </div>

      <div className="about-gallery__grid">
        {galleryImages.map((image, index) => (
          <figure className={`about-gallery__item ${image.layout}`} key={image.src}>
            <div className="about-gallery__frame">
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption><span>0{index + 1}</span>{image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default AboutGallery
