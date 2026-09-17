// Random token generation + one-way hashing for tokens stored at rest (magic links, share codes).
function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export function generateToken(byteLength = 32): string {
  const bytes = new Uint8Array(byteLength)
  crypto.getRandomValues(bytes)
  return toHex(bytes.buffer)
}

// Never store raw tokens at rest — hash them so a KV/D1 read doesn't hand over usable credentials.
export async function hashToken(token: string): Promise<string> {
  const encoded = new TextEncoder().encode(token)
  const digest = await crypto.subtle.digest('SHA-256', encoded)
  return toHex(digest)
}
