export type ServiceTier = {
  id: string
  name: string
  price: string
  cadence: string
  description: string
  features: string[]
  isPlaceholder?: boolean
}

// One-time build tiers are draft placeholders pending real pricing from the owners.
export const buildTiers: ServiceTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$499',
    cadence: 'one-time',
    description: 'A single, professional page that gets a local business found and trusted online.',
    features: ['One-click prototype preview', 'One-page responsive site', 'Google Business Profile setup', 'Same-day launch available'],
    isPlaceholder: true,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$1,499',
    cadence: 'one-time',
    description: 'A multi-page site built to convert visitors into calls, bookings, and walk-ins.',
    features: ['Up to 5 pages', 'Logo & digital branding', 'Local SEO setup', 'Contact & lead forms'],
    isPlaceholder: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$2,999',
    cadence: 'one-time',
    description: 'A full custom build for businesses ready to lead their local market online.',
    features: ['Unlimited pages', 'Custom content & photography guidance', 'Advanced SEO strategy', 'Priority same-day support'],
    isPlaceholder: true,
  },
]

// Monthly care plan pricing ($150-350/mo) reflects the real range from the business plan.
export const carePlans: ServiceTier[] = [
  {
    id: 'care-essential',
    name: 'Essential Care',
    price: '$150',
    cadence: '/ month',
    description: 'Keep your site online, secure, and up to date.',
    features: ['Hosting & monitoring', 'Automated backups', 'Security updates'],
  },
  {
    id: 'care-growth',
    name: 'Growth Care',
    price: '$250',
    cadence: '/ month',
    description: 'Ongoing content and SEO attention so your site keeps working for you.',
    features: ['Everything in Essential', 'Monthly content updates', 'SEO updates'],
  },
  {
    id: 'care-partner',
    name: 'Partner Care',
    price: '$350',
    cadence: '/ month',
    description: 'A hands-on digital partner focused on bringing in more leads.',
    features: ['Everything in Growth', 'Performance-based lead options', 'Priority turnaround'],
  },
]

// Real, confirmed rate from the business plan.
export const hourlyRate: ServiceTier = {
  id: 'hourly',
  name: 'Hourly Enhancements',
  price: '$75',
  cadence: '/ hour',
  description: 'For one-off changes, add-ons, or enhancements outside a care plan.',
  features: ['No monthly commitment', 'Billed in clear, itemized increments'],
}
