import type { Env } from './env'

export type Client = {
  id: string
  first_name: string
  last_name: string
  email: string
}

// All D1 access goes through prepared statements with bound params — never string concatenation.
export async function findClientByEmail(env: Env, email: string): Promise<Client | null> {
  const row = await env.DB.prepare('SELECT id, first_name, last_name, email FROM clients WHERE email = ?')
    .bind(email)
    .first<Client>()
  return row ?? null
}

export async function findClientById(env: Env, clientId: string): Promise<Client | null> {
  const row = await env.DB.prepare('SELECT id, first_name, last_name, email FROM clients WHERE id = ?')
    .bind(clientId)
    .first<Client>()
  return row ?? null
}

export async function createClient(env: Env, input: {
  firstName: string
  lastName: string
  email: string
  company?: string | null
  phone?: string | null
  address?: string | null
  businessType?: string | null
}): Promise<Client> {
  const id = crypto.randomUUID()
  await env.DB.prepare(
    'INSERT INTO clients (id, first_name, last_name, email, company, phone, address, business_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
  ).bind(
    id,
    input.firstName,
    input.lastName,
    input.email,
    input.company ?? null,
    input.phone ?? null,
    input.address ?? null,
    input.businessType ?? null,
  ).run()
  return { id, first_name: input.firstName, last_name: input.lastName, email: input.email }
}

export async function getOrCreateSubmission(env: Env, clientId: string): Promise<string> {
  const existing = await env.DB.prepare(
    "SELECT id FROM intake_submissions WHERE client_id = ? AND status = 'in_progress'",
  ).bind(clientId).first<{ id: string }>()
  if (existing) return existing.id

  const id = crypto.randomUUID()
  await env.DB.prepare('INSERT INTO intake_submissions (id, client_id) VALUES (?, ?)').bind(id, clientId).run()
  return id
}
