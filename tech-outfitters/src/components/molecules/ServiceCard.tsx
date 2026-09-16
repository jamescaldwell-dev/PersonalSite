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
        {tier.price}
        <span>{tier.cadence}</span>
      </p>
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
