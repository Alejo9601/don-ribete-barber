import { createClient } from '@libsql/client'

const tursoUrl = process.env.TURSO_DB_URL
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN

if (!tursoUrl || !tursoAuthToken) {
  throw new Error('Missing TURSO_DB_URL or TURSO_AUTH_TOKEN environment variables')
}

export const client = createClient({
  url: tursoUrl,
  authToken: tursoAuthToken
})
