import type { BasicInfo, ClientFile, IntakeState, WizardStep } from '../types/intake'

const jsonHeaders = { 'Content-Type': 'application/json' }

async function parseErrorMessage(response: Response, fallback: string): Promise<string> {
  const body = await response.json().catch(() => null) as { error?: string } | null
  return body?.error ?? fallback
}

// Directly creates/loads the client and starts a session — no email verification step.
export async function startIntake(info: BasicInfo & { captchaToken: string }): Promise<IntakeState> {
  const response = await fetch('/api/intake/start', {
    method: 'POST',
    headers: jsonHeaders,
    credentials: 'include',
    body: JSON.stringify(info),
  })
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, 'We could not save your details. Please try again.'))
  }
  return response.json() as Promise<IntakeState>
}

export async function getIntakeState(): Promise<IntakeState | null> {
  const response = await fetch('/api/intake/state', { credentials: 'include' })
  if (response.status === 401 || response.status === 404) return null
  if (!response.ok) throw new Error('We could not load your saved progress.')
  return response.json() as Promise<IntakeState>
}

export async function saveStep(step: WizardStep, fields: Record<string, unknown>, stepIndex: number): Promise<void> {
  const response = await fetch('/api/intake/step', {
    method: 'PATCH',
    headers: jsonHeaders,
    credentials: 'include',
    body: JSON.stringify({ step, fields: { ...fields, stepIndex } }),
  })
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, 'We could not save that step. Please try again.'))
  }
}

export async function addComparisonSite(url: string, notes: string): Promise<{ id: string }> {
  const response = await fetch('/api/intake/comparison-sites', {
    method: 'POST',
    headers: jsonHeaders,
    credentials: 'include',
    body: JSON.stringify({ url, notes }),
  })
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, 'We could not add that site.'))
  }
  return response.json() as Promise<{ id: string }>
}

export async function removeComparisonSite(id: string): Promise<void> {
  await fetch(`/api/intake/comparison-sites/${id}`, { method: 'DELETE', credentials: 'include' })
}

export async function uploadIntakeFile(file: File, fileType: 'design_reference' | 'brand_guidelines'): Promise<ClientFile> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('fileType', fileType)
  const response = await fetch('/api/intake/files', { method: 'POST', credentials: 'include', body: formData })
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, 'That file could not be uploaded.'))
  }
  const result = await response.json() as { id: string, fileType: ClientFile['file_type'], originalFilename: string, sizeBytes: number }
  return {
    id: result.id,
    file_type: result.fileType,
    original_filename: result.originalFilename,
    size_bytes: result.sizeBytes,
    uploaded_at: new Date().toISOString(),
  }
}

export async function submitIntake(): Promise<void> {
  const response = await fetch('/api/intake/submit', { method: 'POST', credentials: 'include' })
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, 'We could not submit your details. Please try again.'))
  }
}

export async function createShareLink(): Promise<{ shareUrl: string }> {
  const response = await fetch('/api/intake/share', { method: 'POST', credentials: 'include' })
  if (!response.ok) throw new Error('We could not create a share link.')
  return response.json() as Promise<{ shareUrl: string }>
}

export async function revokeShareLink(): Promise<void> {
  await fetch('/api/intake/share/revoke', { method: 'POST', credentials: 'include' })
}
