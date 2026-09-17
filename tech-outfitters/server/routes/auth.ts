import type { Env } from '../lib/env'
import { cleanString, exceedsRateLimit, getClientAddress, isValidEmail, json } from '../lib/security'
import { verifyCaptcha } from '../lib/captcha'
import { clearSessionCookie, createSessionCookie } from '../lib/session'
import { createClient, findClientByEmail, getOrCreateSubmission } from '../lib/clients'
import { getClientFiles, getComparisonSites, getSubmissionForClient } from '../lib/intake'

const fieldLimits = { name: 100, email: 254 }

// Directly creates/loads the client, starts a session, and returns the initial state —
// no email verification loop. Captcha + rate limiting remain the anti-abuse gate.
export async function handleStart(request: Request, env: Env): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Please submit valid details.' }, { status: 400 })
  }
  if (!body || typeof body !== 'object') {
    return json({ error: 'Please submit valid details.' }, { status: 400 })
  }

  const { firstName, lastName, email, company, phone, address, businessType, captchaToken } = body as Record<string, unknown>
  const cleanFirstName = cleanString(firstName, fieldLimits.name)
  const cleanLastName = cleanString(lastName, fieldLimits.name)
  const cleanEmail = cleanString(email, fieldLimits.email).toLowerCase()

  if (!cleanFirstName || !cleanLastName || !cleanEmail || !isValidEmail(cleanEmail)) {
    return json({ error: 'First name, last name, and a valid email are required.' }, { status: 400 })
  }

  const clientAddress = getClientAddress(request)
  if (await exceedsRateLimit(env, `start:${clientAddress}`) || await exceedsRateLimit(env, `start:${cleanEmail}`)) {
    return json({ error: 'Please wait before trying again.' }, { status: 429 })
  }

  const captchaResult = await verifyCaptcha(captchaToken, clientAddress, env)
  if (!captchaResult.ok) {
    const status = captchaResult.reason === 'not-configured' ? 503 : 400
    return json({ error: 'We could not verify you are human. Please try again.' }, { status })
  }

  const client = (await findClientByEmail(env, cleanEmail))
    ?? (await createClient(env, {
      firstName: cleanFirstName,
      lastName: cleanLastName,
      email: cleanEmail,
      company: cleanString(company ?? '', 160) || null,
      phone: cleanString(phone ?? '', 40) || null,
      address: cleanString(address ?? '', 300) || null,
      businessType: cleanString(businessType ?? '', 160) || null,
    }))

  const submissionId = await getOrCreateSubmission(env, client.id)
  const cookie = await createSessionCookie(env, client.id)

  const [submission, comparisonSites, files] = await Promise.all([
    getSubmissionForClient(env, client.id),
    getComparisonSites(env, submissionId),
    getClientFiles(env, client.id),
  ])

  return json({ client, submission, comparisonSites, files }, { headers: { 'Set-Cookie': cookie } })
}

export async function handleLogout(): Promise<Response> {
  return new Response(null, { status: 204, headers: { 'Set-Cookie': clearSessionCookie() } })
}
