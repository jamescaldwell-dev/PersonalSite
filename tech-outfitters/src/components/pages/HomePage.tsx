import SiteHeader from '../molecules/SiteHeader'
import SiteFooter from '../molecules/SiteFooter'
import Hero from '../organisms/Hero'
import AboutUs from '../organisms/AboutUs'
import ServicesGrid from '../organisms/ServicesGrid'
import FaqSection from '../organisms/FaqSection'
import ContactSection from '../organisms/ContactSection'
import SEO from '../atoms/SEO'

function HomePage() {
  return (
    <main className="site-shell">
      <SEO
        title="Tech Outfitters | Websites That Bring You Business"
        description="Fast, affordable, engineer-vetted websites for small businesses in Monticello, Otsego, Big Lake, and surrounding communities."
        path="/"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Tech Outfitters LLC',
          url: 'https://techoutfitters.com/',
          areaServed: ['Monticello, MN', 'Otsego, MN', 'Big Lake, MN', 'Elk River, MN', 'Rogers, MN'],
        }}
      />
      <SiteHeader />
      <Hero />
      <AboutUs />
      <ServicesGrid />
      <FaqSection />
      <ContactSection />
      <SiteFooter />
    </main>
  )
}

export default HomePage
