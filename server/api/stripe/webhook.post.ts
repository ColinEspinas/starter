import { eq, lt, sql } from 'drizzle-orm'
import type Stripe from 'stripe'
import { customers } from '~/server/schema/customers.sql'
import type { NewSubscription } from '~/server/schema/subscriptions.sql'
import { insertSubscriptionSchema, subscriptions } from '~/server/schema/subscriptions.sql'

const db = useDatabase()
const getCustomer = db.select().from(customers).where(eq(customers.stripe, sql.placeholder('stripeId'))).limit(1).prepare('get-customer')
const getSubscription = db.select().from(subscriptions).where(eq(subscriptions.stripe, sql.placeholder('stripeId'))).limit(1).prepare('get-subscription')

export default defineEventHandler(async (event) => {
  const stripeEvent = await readBody<Stripe.Event>(event)

  const { subscribeUser, unsubscribeUser } = await useSubscription()

  const subscription: Stripe.Subscription | undefined = stripeEvent.data.object as Stripe.Subscription
  const [customer] = await getCustomer.execute({ stripeId: subscription.customer })
  const [existingSubscription] = await getSubscription.execute({ stripeId: subscription.id })

  if (
    existingSubscription
    && existingSubscription.lastEventDate
    && existingSubscription.lastEventDate > stripeEvent.created
  )
    return 'More recent event already processed. Skipping.'

  let validatedSubscription: NewSubscription

  try {
    validatedSubscription = insertSubscriptionSchema.parse({
      stripe: subscription.id,
      customerId: customer.user,
      status: subscription.status,
      startDate: subscription.start_date,
      endDate: subscription.ended_at,
      lastEventDate: stripeEvent.created,
    })
  }
  catch (error) {
    throw createError({ statusMessage: `Failed to validate subscription`, statusCode: 400, cause: error })
  }

  switch (stripeEvent.type) {
    case 'customer.subscription.created':
      try {
        // Insert the subscription into the database
        await db.insert(subscriptions).values(validatedSubscription).onConflictDoUpdate({
          target: subscriptions.stripe,
          set: validatedSubscription,
          where: lt(subscriptions.lastEventDate, stripeEvent.created),
        }).execute()

        // Add pro role to user in Kinde
        await subscribeUser(customer.user).catch((error: any) => {
          if (error.statusCode !== 409)
            throw error
        })
      }
      catch (error) {
        throw createError({ statusMessage: 'Failed to insert created subscription', statusCode: 500 })
      }
      break
    case 'customer.subscription.deleted':
      try {
        // Update the subscription in the database
        await db.update(subscriptions).set(validatedSubscription).where(eq(subscriptions.stripe, subscription.id)).execute()

        // Remove pro role from user in Kinde
        await unsubscribeUser(customer.user).catch((error: any) => {
          if (error.statusCode !== 409)
            throw error
        })
      }
      catch (error) {
        throw createError({ statusMessage: 'Failed to delete subscription', statusCode: 500 })
      }
      break
    case 'customer.subscription.paused':
      try {
        // Update the subscription in the database
        await db.update(subscriptions).set(validatedSubscription).where(eq(subscriptions.stripe, subscription.id)).execute()

        // Remove pro role from user in Kinde
        await unsubscribeUser(customer.user).catch((error: any) => {
          if (error.statusCode !== 409)
            throw error
        })
      }
      catch (error) {
        throw createError({ statusMessage: 'Failed to pause subscription', statusCode: 500 })
      }
      break
    case 'customer.subscription.resumed':
      try {
        // Update the subscription in the database
        await db.update(subscriptions).set(validatedSubscription).where(eq(subscriptions.stripe, subscription.id)).execute()

        // Add pro role to user in Kinde
        await subscribeUser(customer.user).catch((error: any) => {
          if (error.statusCode !== 409)
            throw error
        })
      }
      catch (error) {
        throw createError({ statusMessage: 'Failed to resume subscription', statusCode: 500 })
      }
      break
    case 'customer.subscription.updated':
      try {
        // Update the subscription in the database
        await db.update(subscriptions).set(validatedSubscription).where(eq(subscriptions.stripe, subscription.id)).execute()
      }
      catch (error) {
        throw createError({ statusMessage: 'Failed to update subscription', statusCode: 500 })
      }
      break
    // ... handle other event types
    default:
      throw createError({ statusMessage: `Unhandled event type ${stripeEvent.type}`, statusCode: 400 })
  }

  return `Handled event type ${stripeEvent.type}`
})
