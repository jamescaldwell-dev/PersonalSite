import ServiceCard from '../molecules/ServiceCard'
import { buildTiers, carePlans, hourlyRate } from '../../data/services'

const servicesImage = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'

function ServicesGrid() {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="services__intro">
        <div>
          <p className="eyebrow">Services &amp; pricing</p>
          <h2 id="services-title">Simple packages, no surprises.</h2>
        </div>
        <img
          src={servicesImage}
          alt="A team collaborating around a table with notes, working through a problem together"
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
        />
      </div>

      <h3 className="services__group-title">Website builds</h3>
      <div className="services__grid">
        {buildTiers.map((tier) => (
          <ServiceCard key={tier.id} tier={tier} featured={tier.id === 'growth'} />
        ))}
      </div>

      <h3 className="services__group-title">Monthly care plans</h3>
      <div className="services__grid">
        {carePlans.map((tier) => (
          <ServiceCard key={tier.id} tier={tier} featured={tier.id === 'care-growth'} />
        ))}
      </div>

      <h3 className="services__group-title">Need something smaller?</h3>
      <div className="services__grid services__grid--single">
        <ServiceCard tier={hourlyRate} />
      </div>
    </section>
  )
}

export default ServicesGrid
