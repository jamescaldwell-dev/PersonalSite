import 'dotenv/config'
import express from 'express'
import { verifyCaptcha } from './captcha.mjs'

const app = express()
const port = Number(process.env.PORT ?? 8788)
const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173,https://techoutfitters.com,https://www.techoutfitters.com')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
)
const recentSubmissions = new Map()
const requestCounts = new Map()
const submissionCooldownMs = 60_000
const rateLimitWindowMs = 15 * 60_000
const maximumRequestsPerWindow = 3
const fieldLimits = {
  name: 100,
  email: 254,
  businessName: 160,
  message: 5_000,
}

app.use(express.json({ limit: '20kb' }))
app.disable('x-powered-by')

app.use((request, response, next) => {
  response.set({
    'Cache-Control': 'no-store',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
  })

  const origin = request.get('origin')
  if (request.method === 'POST' && (!origin || !allowedOrigins.has(origin))) {
    return response.status(403).json({ error: 'This request origin is not allowed.' })
  }

  return next()
})

function exceedsRateLimit(clientAddress, now) {
  const requests = (requestCounts.get(clientAddress) ?? []).filter(
    (timestamp) => now - timestamp < rateLimitWindowMs,
  )

  if (requests.length >= maximumRequestsPerWindow) {
    requestCounts.set(clientAddress, requests)
    return true
  }

  requests.push(now)
  requestCounts.set(clientAddress, requests)
  return false
}

function containsControlCharacters(value) {
  return /[\r\n\0]/.test(value)
}

app.post('/api/contact', async (request, response) => {
  if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) {
    return response.status(400).json({ error: 'Please submit a valid message.' })
  }

  const { name, email, businessName, message, captchaToken } = request.body
  const values = [name, email, businessName ?? '', message].map((value) => typeof value === 'string' ? value.trim() : '')
  const [cleanName, cleanEmail, cleanBusinessName, cleanMessage] = values

  if (
    !cleanName || !cleanEmail || !cleanMessage
    || !/^\S+@\S+\.\S+$/.test(cleanEmail)
    || cleanName.length > fieldLimits.name
    || cleanEmail.length > fieldLimits.email
    || cleanBusinessName.length > fieldLimits.businessName
    || cleanMessage.length > fieldLimits.message
    || containsControlCharacters(cleanName)
    || containsControlCharacters(cleanBusinessName)
  ) {
    return response.status(400).json({ error: 'Please complete every required field with a valid email address.' })
  }

  const now = Date.now()
  if (exceedsRateLimit(request.ip, now)) {
    return response.status(429).json({ error: 'Please wait before sending another message.' })
  }

  const lastSubmission = recentSubmissions.get(cleanEmail) ?? 0
  if (now - lastSubmission < submissionCooldownMs) {
    return response.status(429).json({ error: 'Please wait a minute before sending another message.' })
  }

  const captchaResult = await verifyCaptcha(captchaToken, request.ip)
  if (!captchaResult.ok) {
    const status = captchaResult.reason === 'not-configured' ? 503 : 400
    return response.status(status).json({ error: 'We could not verify you are human. Please try again.' })
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_INBOX || !process.env.EMAIL_FROM) {
    return response.status(503).json({ error: 'The contact service is not configured yet. Please try again later.' })
  }

  const inboxRecipients = process.env.CONTACT_INBOX.split(',').map((value) => value.trim()).filter(Boolean)
  const messageText = `Name: ${cleanName}\nEmail: ${cleanEmail}\nBusiness: ${cleanBusinessName || 'n/a'}\n\n${cleanMessage}`
  const resendHeaders = {
    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  }

  try {
    const [inboxResponse, replyResponse] = await Promise.all([
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: resendHeaders,
        body: JSON.stringify({
          from: process.env.EMAIL_FROM,
          to: inboxRecipients,
          reply_to: cleanEmail,
          subject: `[Tech Outfitters] New inquiry from ${cleanName}`,
          text: messageText,
        }),
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: resendHeaders,
        body: JSON.stringify({
          from: process.env.EMAIL_FROM,
          to: [cleanEmail],
          subject: 'Thanks for reaching out to Tech Outfitters',
          text: `Hi ${cleanName},\n\nThanks for your message. We received it and will follow up soon with your free preview.\n\nJames & Erin Caldwell\nTech Outfitters`,
        }),
      }),
    ])

    if (!inboxResponse.ok || !replyResponse.ok) {
      return response.status(502).json({ error: 'Your message could not be delivered. Please try again.' })
    }

    recentSubmissions.set(cleanEmail, now)
    return response.status(204).send()
  } catch {
    return response.status(502).json({ error: 'Your message could not be delivered. Please try again.' })
  }
})

app.listen(port, () => {
  console.log(`Tech Outfitters contact API listening on port ${port}`)
})
