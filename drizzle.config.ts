import process from 'node:process'
import type { Config } from 'drizzle-kit'
import 'dotenv/config'

export default {
  schema: './server/schema/*.sql.ts',
  out: './.drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NUXT_DB_URL || '',
  },
} satisfies Config
