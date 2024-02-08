import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { customers } from '~/server/schema/customers.sql'

const { appDomain } = useRuntimeConfig().public
const db = useDatabase()
const getCustomer = db.select().from(customers).where(eq(customers.user, sql.placeholder('userId'))).limit(1).prepare('get-customer')

export default defineEventHandler(async (event) => {
  const { lookupKey, userId } = await getValidatedQuery(event, (data: any) => z.object({
    lookupKey: z.string(),
    userId: z.string(),
  }).parse({
    lookupKey: data.lookup_key,
    userId: data.user_id,
  }))

  const { client, sessionManager } = useKindeServerClient(event)
  const user = await client.getUserProfile(sessionManager)

  if (user.id !== userId)
    throw createError({ statusMessage: 'Unauthorized', statusCode: 403 })

  // Get the stripe url and customer id
  const stripe = await useServerStripe(event)
  const price = await stripe.prices.retrieve(lookupKey)

  let customerId = null
  try {
    const result = await getCustomer.execute({ userId })
    customerId = result[0]?.stripe
  }
  catch (error) {
    throw createError({ statusMessage: 'Failed to fetch customer', statusCode: 500 })
  }
  if (!customerId) {
    try {
      const customer = await stripe.customers.create({ email: user.email })
      customerId = customer.id

      // Update the user's stripe customer id
      await db.insert(customers).values({ stripe: customerId, user: userId })
    }
    catch (error) {
      throw createError({ statusMessage: 'Failed to create customer', statusCode: 500 })
    }
  }

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${appDomain}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appDomain}/subscribe`,
    customer: customerId,
  })

  // Redirect to the stripe checkout page
  if (!session.url)
    throw createError({ statusMessage: 'Failed to create checkout session', statusCode: 500 })
  await sendRedirect(event, session.url)
})
