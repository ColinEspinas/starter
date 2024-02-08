import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'
import { customers } from './customers.sql'

export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  stripe: text('stripe_id').notNull().unique(),
  customerId: text('customer_id').notNull(),
  status: text('status').notNull(),
  startDate: integer('start_date').notNull(),
  endDate: integer('end_date'),
  lastEventDate: integer('last_event_date').default(-1),
})

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  customer: one(customers, {
    fields: [subscriptions.customerId],
    references: [customers.user],
  }),
}))

export const selectSubscriptionSchema = createSelectSchema(subscriptions)
export const insertSubscriptionSchema = createInsertSchema(subscriptions)

export type Subscription = z.infer<typeof selectSubscriptionSchema>
export type NewSubscription = z.infer<typeof insertSubscriptionSchema>
