import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export function useDatabase(): PostgresJsDatabase {
  const { dbUrl } = useRuntimeConfig()
  const queryClient = postgres(dbUrl)
  return drizzle(queryClient)
}
