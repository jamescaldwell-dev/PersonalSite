import { useEffect } from 'react'

type SEOProps = {
  title: string
  description: string
  path: string
  type?: 'website' | 'profile'
  structuredData?: Record<string, unknown> | Record<string, unknown>[]
}

const siteUrl = 'https://jcaldwell.io'
const socialImage = `${siteUrl}/og-image.jpg`
function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function SEO({ title, description, path, type = 'website', structuredData }: SEOProps) {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}${path}`
    document.title = title

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:site_name', 'James Caldwell')
    upsertMeta('property', 'og:image', socialImage)
    upsertMeta('property', 'og:image:alt', 'A quiet forest landscape from James Caldwell\'s portfolio')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', socialImage)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    let schema = document.head.querySelector<HTMLScriptElement>('#seo-schema')
    if (!schema) {
      schema = document.createElement('script')
      schema.id = 'seo-schema'
      schema.type = 'application/ld+json'
      document.head.appendChild(schema)
    }
    schema.textContent = structuredData ? JSON.stringify(structuredData) : ''
  }, [description, path, structuredData, title, type])

  return null
}

export { siteUrl }
export default SEO
