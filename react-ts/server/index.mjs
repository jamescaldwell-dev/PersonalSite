import 'dotenv/config'
import express from 'express'

const app = express()
const port = Number(process.env.PORT ?? 8787)
const recentSubmissions = new Map()

app.use(express.json({ limit: '20kb' }))

app.post('/api/contact', async (request, response) => {
  const { name, email, subject, message } = request.body ?? {}
  const values = [name, email, subject, message].map((value) => typeof value === 'string' ? value.trim() : '')

  if (values.some((value) => !value) || !/^\S+@\S+\.\S+$/.test(email)) {
    return response.status(400).json({ error: 'Please complete every field with a valid email address.' })
  }

  const [cleanName, cleanEmail, cleanSubject, cleanMessage] = values
  const now = Date.now()
  const lastSubmission = recentSubmissions.get(cleanEmail) ?? 0
  if (now - lastSubmission < 60_000) {
    return response.status(429).json({ error: 'Please wait a minute before sending another message.' })
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_INBOX || !process.env.EMAIL_FROM) {
    return response.status(503).json({ error: 'The contact service is not configured yet. Please try again later.' })
  }

  const messageText = `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`
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
          to: [process.env.CONTACT_INBOX],
          reply_to: cleanEmail,
          subject: `[Portfolio] ${cleanSubject}`,
          text: messageText,
        }),
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: resendHeaders,
        body: JSON.stringify({
          from: process.env.EMAIL_FROM,
          to: [cleanEmail],
          subject: `Thanks for reaching out, ${cleanName}`,
          text: `Hi ${cleanName},\n\nThanks for your message about "${cleanSubject}". I received it and will get back to you soon.\n\nJames Caldwell`,
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
  console.log(`Contact API listening on port ${port}`)
})