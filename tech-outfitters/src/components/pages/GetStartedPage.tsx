import SiteHeader from '../molecules/SiteHeader'
import SiteFooter from '../molecules/SiteFooter'
import SEO from '../atoms/SEO'
import IntakeWizard from '../organisms/IntakeWizard'

function GetStartedPage() {
  return (
    <main className="site-shell">
      <SEO
        title="Start Your Project | Tech Outfitters"
        description="Tell us about your project in a few short, guided steps before we meet — nothing is required, save your progress anytime."
        path="/get-started"
      />
      <SiteHeader />
      <section className="get-started-page">
        <h1>Let&rsquo;s get started</h1>
        <IntakeWizard />
      </section>
      <SiteFooter />
    </main>
  )
}

export default GetStartedPage
