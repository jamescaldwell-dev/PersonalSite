// Cloudflare Worker bindings + secrets for tech-outfitters.
export interface Env {
  DB: D1Database
  FILES: R2Bucket
  KV: KVNamespace
  ASSETS: Fetcher
  ALLOWED_ORIGINS: string
  RESEND_API_KEY: string
  EMAIL_FROM: string
  CONTACT_INBOX: string
  CAPTCHA_PROVIDER?: string
  CAPTCHA_SECRET_KEY: string
  // Signs session cookies + magic-link tokens; set via `wrangler secret put SESSION_SECRET`.
  SESSION_SECRET: string
  // Base URL used to build magic-link/share URLs (e.g. https://techoutfitters.jcaldwell.io).
  PUBLIC_SITE_URL: string
  // Cloudflare Access application gating /support/* — see https://developers.cloudflare.com/cloudflare-one/identity/authorization-cookie/validating-json/
  CF_ACCESS_TEAM_DOMAIN: string
  CF_ACCESS_AUD: string
  // Comma-separated allowlist of admin emails permitted to open share links (defense in depth alongside Access policy).
  CF_ACCESS_ADMIN_EMAILS: string
}
