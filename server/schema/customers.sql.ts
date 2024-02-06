import { pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const customers = pgTable('customers', {
  user: text('user_id').primaryKey(),
  id: text('stripe_id').notNull(),
})

export const selectCustomerSchema = createSelectSchema(customers)
export const insertCustomerSchema = createInsertSchema(customers)

export type Customer = z.infer<typeof selectCustomerSchema>
export type NewCustomer = z.infer<typeof insertCustomerSchema>
