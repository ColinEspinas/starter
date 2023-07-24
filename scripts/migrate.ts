import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import 'dotenv/config'

const sql = postgres(process.env.NUXT_DB_URL || '', { max: 1 })
const db = drizzle(sql)

try {
  await migrate(db, { migrationsFolder: './.drizzle' })
}
catch (error) {
  console.error(error)
}
finally {
  console.log('Migration completed')
  process.exit(0)
}
