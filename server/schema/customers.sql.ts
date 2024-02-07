import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'
import { subscriptions } from './subscriptions.sql'

export const customers = pgTable('customers', {
  user: text('user_id').primaryKey(),
  stripe: text('stripe_id').notNull(),
})

export const customersRelations = relations(customers, ({ many }) => ({
  subscriptions: many(subscriptions),
}))

export const selectCustomerSchema = createSelectSchema(customers)
export const insertCustomerSchema = createInsertSchema(customers)

export type Customer = z.infer<typeof selectCustomerSchema>
export type NewCustomer = z.infer<typeof insertCustomerSchema>
