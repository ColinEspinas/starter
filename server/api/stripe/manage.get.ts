import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { customers } from '~/server/schema/customers.sql'

const { appDomain } = useRuntimeConfig().public
const db = useDatabase()
const getCustomer = db.select().from(customers).where(eq(customers.user, sql.placeholder('userId'))).limit(1).prepare('get-customer')

export default defineEventHandler(async (event) => {
  const sessionId = await getValidatedQuery(event, (data: any) => z.string().parse(data.session_id ?? ''))

  const stripe = await useServerStripe(event)

  let customerId = null

  if (sessionId) {
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)
    customerId = checkoutSession.customer as string
  }
  else {
    const { client, sessionManager } = useKindeClient(event)
    const user = await client.getUserProfile(sessionManager)

    try {
      const result = await getCustomer.execute({ userId: user.id })
      customerId = result[0]?.stripe
    }
    catch (error) {
      throw createError({ statusMessage: 'Failed to fetch customer', statusCode: 500 })
    }
  }
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${appDomain}`,
  })

  await sendRedirect(event, portalSession.url)
})
