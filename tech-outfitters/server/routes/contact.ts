import type { Env } from '../lib/env'
import { cleanString, exceedsRateLimit, getClientAddress, isInCooldown, isValidEmail, json, startCooldown } from '../lib/security'
import { verifyCaptcha } from '../lib/captcha'
import { sendEmail } from '../lib/email'

const fieldLimits = {
  name: 100,
  email: 254,
  businessName: 160,
  message: 5_000,
}

export async function handleContact(request: Request, env: Env): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Please submit a valid message.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ error: 'Please submit a valid message.' }, { status: 400 })
  }

  const { name, email, businessName, message, captchaToken } = body as Record<string, unknown>
  const cleanName = cleanString(name, fieldLimits.name)
  const cleanEmail = cleanString(email, fieldLimits.email)
  const cleanBusinessName = cleanString(businessName ?? '', fieldLimits.businessName)
  const cleanMessage = cleanString(message, fieldLimits.message)

  if (!cleanName || !cleanEmail || !cleanMessage || !isValidEmail(cleanEmail)) {
    return json({ error: 'Please complete every required field with a valid email address.' }, { status: 400 })
  }

  const clientAddress = getClientAddress(request)
  if (await exceedsRateLimit(env, `contact:${clientAddress}`)) {
    return json({ error: 'Please wait before sending another message.' }, { status: 429 })
  }

  if (await isInCooldown(env, `contact:${cleanEmail}`)) {
    return json({ error: 'Please wait a minute before sending another message.' }, { status: 429 })
  }

  const captchaResult = await verifyCaptcha(captchaToken, clientAddress, env)
  if (!captchaResult.ok) {
    const status = captchaResult.reason === 'not-configured' ? 503 : 400
    return json({ error: 'We could not verify you are human. Please try again.' }, { status })
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_INBOX || !env.EMAIL_FROM) {
    return json({ error: 'The contact service is not configured yet. Please try again later.' }, { status: 503 })
  }

  const inboxRecipients = env.CONTACT_INBOX.split(',').map((value) => value.trim()).filter(Boolean)
  const messageText = `Name: ${cleanName}\nEmail: ${cleanEmail}\nBusiness: ${cleanBusinessName || 'n/a'}\n\n${cleanMessage}`

  try {
    const [inboxSent, replySent] = await Promise.all([
      sendEmail(env, {
        to: inboxRecipients,
        replyTo: cleanEmail,
        subject: `[Tech Outfitters] New inquiry from ${cleanName}`,
        text: messageText,
      }),
      sendEmail(env, {
        to: [cleanEmail],
        subject: 'Thanks for reaching out to Tech Outfitters',
        text: `Hi ${cleanName},\n\nThanks for your message. We received it and will follow up soon with your free preview.\n\nJames & Erin Caldwell\nTech Outfitters`,
      }),
    ])

    if (!inboxSent || !replySent) {
      return json({ error: 'Your message could not be delivered. Please try again.' }, { status: 502 })
    }

    await startCooldown(env, `contact:${cleanEmail}`)
    return new Response(null, { status: 204 })
  } catch {
    return json({ error: 'Your message could not be delivered. Please try again.' }, { status: 502 })
  }
}
