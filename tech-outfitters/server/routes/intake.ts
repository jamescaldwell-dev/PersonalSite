import type { Env } from '../lib/env'
import { json } from '../lib/security'
import { getSessionClientId } from '../lib/session'
import { findClientById } from '../lib/clients'
import {
  addComparisonSite,
  getClientFiles,
  getComparisonSites,
  getSubmissionForClient,
  markSubmitted,
  removeComparisonSite,
  updateBrandGuidelinesStep,
  updateCurrentStep,
  updateCurrentWebsiteStep,
  updateDesignPreferenceStep,
  updateDomainStep,
  updateFeaturesStep,
  updateTechStackStep,
} from '../lib/intake'
import { sendEmail } from '../lib/email'

const stepHandlers: Record<string, (env: Env, submissionId: string, fields: Record<string, unknown>) => Promise<void>> = {
  currentWebsite: updateCurrentWebsiteStep,
  designPreference: updateDesignPreferenceStep,
  features: updateFeaturesStep,
  domain: updateDomainStep,
  techStack: updateTechStackStep,
  brandGuidelines: updateBrandGuidelinesStep,
  // Consolidated frontend step covering features + domain + tech stack + brand guidelines together.
  designDetails: async (env, submissionId, fields) => {
    await updateFeaturesStep(env, submissionId, fields)
    await updateDomainStep(env, submissionId, fields)
    await updateTechStackStep(env, submissionId, fields)
    await updateBrandGuidelinesStep(env, submissionId, fields)
  },
}

async function requireSession(request: Request, env: Env): Promise<string | Response> {
  const clientId = await getSessionClientId(request, env)
  if (!clientId) return json({ error: 'Please sign in again to continue.' }, { status: 401 })
  return clientId
}

export async function handleGetState(request: Request, env: Env): Promise<Response> {
  const sessionResult = await requireSession(request, env)
  if (sessionResult instanceof Response) return sessionResult
  const clientId = sessionResult

  const [client, submission] = await Promise.all([
    findClientById(env, clientId),
    getSubmissionForClient(env, clientId),
  ])
  if (!client || !submission) return json({ error: 'No in-progress intake found.' }, { status: 404 })

  const [comparisonSites, files] = await Promise.all([
    getComparisonSites(env, submission.id),
    getClientFiles(env, clientId),
  ])

  return json({ client, submission, comparisonSites, files })
}

export async function handlePatchStep(request: Request, env: Env): Promise<Response> {
  const sessionResult = await requireSession(request, env)
  if (sessionResult instanceof Response) return sessionResult
  const clientId = sessionResult

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid request body.' }, { status: 400 })
  }
  const { step, fields } = (body ?? {}) as { step?: string, fields?: Record<string, unknown> }
  if (!step || !stepHandlers[step] || typeof fields !== 'object' || fields === null) {
    return json({ error: 'Unknown step.' }, { status: 400 })
  }

  const submission = await getSubmissionForClient(env, clientId)
  if (!submission || submission.status !== 'in_progress') {
    return json({ error: 'No in-progress intake found.' }, { status: 404 })
  }

  try {
    await stepHandlers[step](env, submission.id, fields)
    await updateCurrentStep(env, submission.id, Number(fields.stepIndex) || submission.current_step)
    return json({ ok: true })
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'invalid_input'
    return json({ error: reason === 'invalid_url' ? 'Please enter a valid http(s) URL.' : 'Please check your input.' }, { status: 400 })
  }
}

export async function handleAddComparisonSite(request: Request, env: Env): Promise<Response> {
  const sessionResult = await requireSession(request, env)
  if (sessionResult instanceof Response) return sessionResult
  const clientId = sessionResult

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid request body.' }, { status: 400 })
  }
  const { url, notes } = (body ?? {}) as { url?: string, notes?: string }
  if (!url) return json({ error: 'A URL is required.' }, { status: 400 })

  const submission = await getSubmissionForClient(env, clientId)
  if (!submission || submission.status !== 'in_progress') {
    return json({ error: 'No in-progress intake found.' }, { status: 404 })
  }

  try {
    const id = await addComparisonSite(env, submission.id, url, notes ?? '')
    return json({ id })
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'invalid_input'
    if (reason === 'limit_reached') return json({ error: 'You can add up to 3 comparison sites.' }, { status: 400 })
    return json({ error: 'Please enter a valid http(s) URL.' }, { status: 400 })
  }
}

export async function handleRemoveComparisonSite(request: Request, env: Env, siteId: string): Promise<Response> {
  const sessionResult = await requireSession(request, env)
  if (sessionResult instanceof Response) return sessionResult
  const clientId = sessionResult

  const submission = await getSubmissionForClient(env, clientId)
  if (!submission) return json({ error: 'No in-progress intake found.' }, { status: 404 })

  await removeComparisonSite(env, submission.id, siteId)
  return json({ ok: true })
}

const maxUploadBytes = 50 * 1024 * 1024
const zipMagicBytes = [0x50, 0x4b, 0x03, 0x04]

async function isZipFile(file: File): Promise<boolean> {
  const header = new Uint8Array(await file.slice(0, 4).arrayBuffer())
  return zipMagicBytes.every((byte, index) => header[index] === byte)
}

export async function handleFileUpload(request: Request, env: Env): Promise<Response> {
  const sessionResult = await requireSession(request, env)
  if (sessionResult instanceof Response) return sessionResult
  const clientId = sessionResult

  const submission = await getSubmissionForClient(env, clientId)
  if (!submission || submission.status !== 'in_progress') {
    return json({ error: 'No in-progress intake found.' }, { status: 404 })
  }

  const formData = await request.formData()
  const file = formData.get('file')
  const fileType = formData.get('fileType')

  if (!(file instanceof File) || (fileType !== 'design_reference' && fileType !== 'brand_guidelines')) {
    return json({ error: 'A zip file and file type are required.' }, { status: 400 })
  }
  if (!file.name.toLowerCase().endsWith('.zip') || file.size > maxUploadBytes || !(await isZipFile(file))) {
    return json({ error: 'Please upload a .zip file up to 50MB.' }, { status: 400 })
  }

  const fileId = crypto.randomUUID()
  const r2Key = `clients/${clientId}/intake/${fileType}/${fileId}-${file.name}`
  await env.FILES.put(r2Key, file.stream(), { httpMetadata: { contentType: 'application/zip' } })

  await env.DB.prepare(
    'INSERT INTO client_files (id, client_id, submission_id, file_type, r2_key, original_filename, size_bytes) VALUES (?, ?, ?, ?, ?, ?, ?)',
  ).bind(fileId, clientId, submission.id, fileType, r2Key, file.name, file.size).run()

  return json({ id: fileId, fileType, originalFilename: file.name, sizeBytes: file.size })
}

export async function handleSubmit(request: Request, env: Env): Promise<Response> {
  const sessionResult = await requireSession(request, env)
  if (sessionResult instanceof Response) return sessionResult
  const clientId = sessionResult

  const client = await findClientById(env, clientId)
  const submission = await getSubmissionForClient(env, clientId)
  if (!client || !submission || submission.status !== 'in_progress') {
    return json({ error: 'No in-progress intake found.' }, { status: 404 })
  }

  await markSubmitted(env, submission.id)

  const inboxRecipients = env.CONTACT_INBOX.split(',').map((value) => value.trim()).filter(Boolean)
  await sendEmail(env, {
    to: inboxRecipients,
    replyTo: client.email,
    subject: `[Tech Outfitters] New project intake from ${client.first_name} ${client.last_name}`,
    text: `A new project intake was submitted.\n\nClient: ${client.first_name} ${client.last_name}\nEmail: ${client.email}\nClient ID: ${client.id}\n\nReview it in the admin dashboard.`,
  })
  await sendEmail(env, {
    to: [client.email],
    subject: 'We received your project details — Tech Outfitters',
    text: `Hi ${client.first_name},\n\nThanks for sharing your project details. James & Erin will review everything and follow up soon to schedule your kickoff call.\n\nTech Outfitters`,
  })

  return json({ ok: true })
}
