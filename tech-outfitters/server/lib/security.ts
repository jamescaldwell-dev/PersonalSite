import type { Env } from './env'

export const securityHeaders = {
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
}

export function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { 'Content-Type': 'application/json', ...securityHeaders, ...init.headers },
  })
}

export function parseAllowedOrigins(env: Env): Set<string> {
  return new Set(
    (env.ALLOWED_ORIGINS ?? '')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  )
}

// Every state-changing request must come from an allowlisted origin.
export function isAllowedOrigin(request: Request, env: Env): boolean {
  const origin = request.headers.get('origin')
  if (!origin) return false
  return parseAllowedOrigins(env).has(origin)
}

export function containsControlCharacters(value: string): boolean {
  return /[\r\n\0]/.test(value)
}

export function cleanString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (trimmed.length > maxLength || containsControlCharacters(trimmed)) return ''
  return trimmed
}

export function isValidEmail(value: string): boolean {
  return /^\S+@\S+\.\S+$/.test(value) && value.length <= 254
}

export function isSafeHttpUrl(value: string, maxLength = 300): boolean {
  if (!value || value.length > maxLength) return false
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const rateLimitWindowSeconds = 15 * 60
const maximumRequestsPerWindow = 3

// Fixed-window counter backed by KV (Workers have no shared in-memory state across requests).
export async function exceedsRateLimit(env: Env, key: string, limit = maximumRequestsPerWindow): Promise<boolean> {
  const kvKey = `ratelimit:${key}`
  const current = Number((await env.KV.get(kvKey)) ?? '0')
  if (current >= limit) return true
  await env.KV.put(kvKey, String(current + 1), { expirationTtl: rateLimitWindowSeconds })
  return false
}

const submissionCooldownSeconds = 60

// Prevents the same identity (email/clientId) from resubmitting within a short cooldown.
export async function isInCooldown(env: Env, key: string): Promise<boolean> {
  return (await env.KV.get(`cooldown:${key}`)) !== null
}

export async function startCooldown(env: Env, key: string): Promise<void> {
  await env.KV.put(`cooldown:${key}`, '1', { expirationTtl: submissionCooldownSeconds })
}

export function getClientAddress(request: Request): string {
  return request.headers.get('cf-connecting-ip') ?? 'unknown'
}

// Every outbound call to a third party must have a hard timeout — an unresponsive
// external service should never hang the whole request indefinitely.
export async function fetchWithTimeout(input: string, init: RequestInit = {}, timeoutMs = 8_000): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}
