import type { ServiceTier } from '../../data/services'

type ServiceCardProps = {
  tier: ServiceTier
  featured?: boolean
}

function ServiceCard({ tier, featured = false }: ServiceCardProps) {
  return (
    <article className={`service-card${featured ? ' service-card--featured' : ''}`}>
      <h3>{tier.name}</h3>
      <p className="service-card__price">
        {tier.startingAt && <span className="service-card__starting-at">Starting at</span>}
        {tier.price}
        <span className="service-card__cadence">{tier.cadence}</span>
      </p>
      {tier.priceNote && <p className="service-card__price-note">{tier.priceNote}</p>}
      <p className="service-card__description">{tier.description}</p>
      <ul className="service-card__features">
        {tier.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      {tier.isPlaceholder && <p className="service-card__note">Estimated pricing — confirm before quoting.</p>}
    </article>
  )
}

export default ServiceCard
