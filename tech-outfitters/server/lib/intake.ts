import type { Env } from './env'
import { cleanString, containsControlCharacters, isSafeHttpUrl } from './security'

const limits = {
  shortText: 300,
  longText: 3000,
  url: 300,
}

export type IntakeSubmission = {
  id: string
  client_id: string
  current_step: number
  status: 'in_progress' | 'submitted'
  has_current_website: number | null
  current_website_url: string | null
  current_website_likes: string | null
  current_website_dislikes: string | null
  has_design_in_mind: number | null
  features_needed: string | null
  existing_domain: string | null
  has_no_domain: number
  preferred_tech_stack: string | null
  has_brand_guidelines: number | null
}

export async function getSubmissionForClient(env: Env, clientId: string): Promise<IntakeSubmission | null> {
  const row = await env.DB.prepare(
    "SELECT * FROM intake_submissions WHERE client_id = ? ORDER BY submitted_at IS NOT NULL, id DESC LIMIT 1",
  ).bind(clientId).first<IntakeSubmission>()
  return row ?? null
}

export async function getComparisonSites(env: Env, submissionId: string) {
  const { results } = await env.DB.prepare(
    'SELECT id, url, likes_notes, sort_order FROM comparison_sites WHERE submission_id = ? ORDER BY sort_order ASC',
  ).bind(submissionId).all()
  return results
}

export async function getClientFiles(env: Env, clientId: string) {
  const { results } = await env.DB.prepare(
    'SELECT id, file_type, original_filename, size_bytes, uploaded_at FROM client_files WHERE client_id = ? ORDER BY uploaded_at ASC',
  ).bind(clientId).all()
  return results
}

function toNullableBool(value: unknown): number | null {
  if (value === true) return 1
  if (value === false) return 0
  return null
}

// Each step updates only its own fixed set of columns via bound parameters — never dynamic column names.
export async function updateCurrentWebsiteStep(env: Env, submissionId: string, fields: Record<string, unknown>) {
  const hasSite = toNullableBool(fields.hasCurrentWebsite)
  const siteUrl = typeof fields.currentWebsiteUrl === 'string' ? cleanString(fields.currentWebsiteUrl, limits.url) : ''
  const likes = typeof fields.currentWebsiteLikes === 'string' ? cleanString(fields.currentWebsiteLikes, limits.longText) : ''
  const dislikes = typeof fields.currentWebsiteDislikes === 'string' ? cleanString(fields.currentWebsiteDislikes, limits.longText) : ''

  if (siteUrl && !isSafeHttpUrl(siteUrl)) {
    throw new Error('invalid_url')
  }

  await env.DB.prepare(
    `UPDATE intake_submissions
     SET has_current_website = ?, current_website_url = ?, current_website_likes = ?, current_website_dislikes = ?
     WHERE id = ?`,
  ).bind(hasSite, siteUrl || null, likes || null, dislikes || null, submissionId).run()
}

export async function updateDesignPreferenceStep(env: Env, submissionId: string, fields: Record<string, unknown>) {
  const hasDesign = toNullableBool(fields.hasDesignInMind)
  await env.DB.prepare('UPDATE intake_submissions SET has_design_in_mind = ? WHERE id = ?')
    .bind(hasDesign, submissionId).run()
}

export async function updateFeaturesStep(env: Env, submissionId: string, fields: Record<string, unknown>) {
  const features = typeof fields.featuresNeeded === 'string' ? cleanString(fields.featuresNeeded, limits.longText) : ''
  await env.DB.prepare('UPDATE intake_submissions SET features_needed = ? WHERE id = ?')
    .bind(features || null, submissionId).run()
}

export async function updateDomainStep(env: Env, submissionId: string, fields: Record<string, unknown>) {
  const hasNoDomain = fields.hasNoDomain === true ? 1 : 0
  const domain = typeof fields.existingDomain === 'string' ? cleanString(fields.existingDomain, limits.shortText) : ''
  await env.DB.prepare('UPDATE intake_submissions SET existing_domain = ?, has_no_domain = ? WHERE id = ?')
    .bind(hasNoDomain ? null : (domain || null), hasNoDomain, submissionId).run()
}

export async function updateTechStackStep(env: Env, submissionId: string, fields: Record<string, unknown>) {
  const stack = typeof fields.preferredTechStack === 'string' ? cleanString(fields.preferredTechStack, limits.shortText) : ''
  await env.DB.prepare('UPDATE intake_submissions SET preferred_tech_stack = ? WHERE id = ?')
    .bind(stack || null, submissionId).run()
}

export async function updateBrandGuidelinesStep(env: Env, submissionId: string, fields: Record<string, unknown>) {
  const hasGuidelines = toNullableBool(fields.hasBrandGuidelines)
  await env.DB.prepare('UPDATE intake_submissions SET has_brand_guidelines = ? WHERE id = ?')
    .bind(hasGuidelines, submissionId).run()
}

export async function updateCurrentStep(env: Env, submissionId: string, step: number) {
  await env.DB.prepare('UPDATE intake_submissions SET current_step = ? WHERE id = ?').bind(step, submissionId).run()
}

const maxComparisonSites = 3

export async function addComparisonSite(env: Env, submissionId: string, url: string, notes: string) {
  if (containsControlCharacters(url) || !isSafeHttpUrl(url, limits.url)) {
    throw new Error('invalid_url')
  }
  const cleanNotes = cleanString(notes, limits.longText)

  const { results } = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM comparison_sites WHERE submission_id = ?',
  ).bind(submissionId).all<{ count: number }>()
  const count = results[0]?.count ?? 0
  if (count >= maxComparisonSites) {
    throw new Error('limit_reached')
  }

  const id = crypto.randomUUID()
  await env.DB.prepare(
    'INSERT INTO comparison_sites (id, submission_id, url, likes_notes, sort_order) VALUES (?, ?, ?, ?, ?)',
  ).bind(id, submissionId, url, cleanNotes || null, count).run()
  return id
}

export async function removeComparisonSite(env: Env, submissionId: string, siteId: string) {
  await env.DB.prepare('DELETE FROM comparison_sites WHERE id = ? AND submission_id = ?')
    .bind(siteId, submissionId).run()
}

export async function markSubmitted(env: Env, submissionId: string) {
  await env.DB.prepare(
    "UPDATE intake_submissions SET status = 'submitted', submitted_at = datetime('now') WHERE id = ?",
  ).bind(submissionId).run()
}
