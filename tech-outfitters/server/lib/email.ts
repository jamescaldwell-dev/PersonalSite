import type { Env } from './env'
import { fetchWithTimeout } from './security'

type SendEmailInput = {
  to: string[]
  subject: string
  text: string
  replyTo?: string
}

// Thin Resend wrapper; never log message contents, only whether the send succeeded.
export async function sendEmail(env: Env, input: SendEmailInput): Promise<boolean> {
  try {
    const response = await fetchWithTimeout('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: input.to,
        reply_to: input.replyTo,
        subject: input.subject,
        text: input.text,
      }),
    })
    return response.ok
  } catch {
    return false
  }
}
