import Stripe from 'stripe'
import type { H3Event } from 'h3'

export async function useServerStripe(event: H3Event): Promise<Stripe> {
  const { stripeSecret } = useRuntimeConfig()

  // Return Stripe's instance if already initialized in event context
  if (event.context._stripe)
    return event.context._stripe

  if (!stripeSecret)
    console.warn('Stripe secret key is not set in runtime config!')

  const stripe = new Stripe(stripeSecret, {
    // Optional Stripe client options...
  })

  // Store the initialized Stripe instance in the event context for future use
  event.context._stripe = stripe

  return event.context._stripe
}
