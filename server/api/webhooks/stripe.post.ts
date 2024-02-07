import { eq, lt, sql } from 'drizzle-orm'
import type Stripe from 'stripe'
import { customers } from '~/server/schema/customers.sql'
import type { NewSubscription } from '~/server/schema/subscriptions.sql'
import { insertSubscriptionSchema, subscriptions } from '~/server/schema/subscriptions.sql'

const db = useDatabase()
const getCustomer = db.select().from(customers).where(eq(customers.user, sql.placeholder('userId'))).limit(1).prepare('get-customer')

export default defineEventHandler(async (event) => {
  const stripeEvent = await readBody<Stripe.Event>(event)

  const subscription: Stripe.Subscription | undefined = stripeEvent.data.object as Stripe.Subscription
  const [customer] = await getCustomer.execute({ userId: subscription.customer })
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
    throw createError({ message: 'Failed to validate subscription', status: 400 })
  }

  switch (stripeEvent.type) {
    case 'customer.subscription.created': {
      try {
        await db.insert(subscriptions).values(validatedSubscription).onConflictDoUpdate({
          target: subscriptions.stripe,
          set: validatedSubscription,
          where: lt(subscriptions.lastEventDate, stripeEvent.created),
        }).execute()
      }
      catch (error) {
        throw createError({ message: 'Failed to insert created subscription', status: 500 })
      }
      break
    }
    case 'customer.subscription.deleted':
      // Then define and call a function to handle the event customer.subscription.deleted
      break
    case 'customer.subscription.paused':
      // Then define and call a function to handle the event customer.subscription.paused
      break
    case 'customer.subscription.resumed':
      // Then define and call a function to handle the event customer.subscription.resumed
      break
    case 'customer.subscription.updated':
      // Then define and call a function to handle the event customer.subscription.updated
      break
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${stripeEvent.type}`)
  }

  return `Handled event type ${stripeEvent.type}`
})
