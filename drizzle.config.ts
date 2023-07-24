import type { Config } from 'drizzle-kit'
import 'dotenv/config'

export default {
  schema: './server/schema/*.sql.ts',
  out: './.drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.NUXT_DB_URL || '',
  },
} satisfies Config
