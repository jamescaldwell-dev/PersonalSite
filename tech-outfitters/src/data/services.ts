export type ServiceTier = {
  id: string
  name: string
  price: string
  cadence: string
  description: string
  features: string[]
  isPlaceholder?: boolean
  startingAt?: boolean
  priceNote?: string
}

// One-time build tiers.
export const buildTiers: ServiceTier[] = [
  {
    id: 'prototype',
    name: 'Prototype',
    price: '$499',
    cadence: 'one-time',
    description: 'A single, professional page that gets a local business found and trusted online.',
    features: ['One-page responsive site', 'Google Business Profile setup', 'Same-day launch available'],
    priceNote: '*includes 2-3 project planning/review sessions to ensure satisfaction',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$999',
    cadence: 'one-time',
    description: 'A multi-page site built to convert visitors into calls, bookings, and walk-ins.',
    features: ['Everything in Prototype', 'Up to 5 pages', 'Logo & digital branding', 'Local SEO setup'],
    startingAt: true,
    priceNote: '*includes 2-3 project planning/review sessions to ensure satisfaction',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$3,000',
    cadence: 'one-time',
    description: 'A full custom build for businesses ready to lead their local market online.',
    features: ['Unlimited pages', 'Custom content & photography guidance', 'Advanced SEO strategy', 'Priority same-day support'],
    startingAt: true,
    priceNote: '*includes 2-3 project planning/review sessions to ensure satisfaction',
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
    priceNote: '*includes regular check-ins to ensure satisfaction in website',
  },
  {
    id: 'care-partner',
    name: 'Partner Care',
    price: '$350',
    cadence: '/ month',
    description: 'A hands-on digital partner focused on bringing in more leads.',
    features: ['Everything in Growth', 'Performance-based lead options', 'Priority turnaround'],
    priceNote: '*includes regular check-ins to ensure satisfaction in website',
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
