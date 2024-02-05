import type { Stripe } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js'

export default async function useClientStripe() {
  const { stripeKey } = useRuntimeConfig().public
  const stripe = useState<Stripe | null>('stripe-client', () => null)
  const isLoading = useState('stripe-client-loading', () => false)

  async function _loadStripe() {
    if (stripe.value)
      return stripe.value

    isLoading.value = true

    if (!stripeKey)
      console.warn('Stripe public key is not set in runtime config!')

    return await loadStripe(stripeKey, {
      // Optional Stripe client options...
    })
  }

  onMounted(async () => {
    if (!isLoading.value) {
      const _stripe = await _loadStripe()
      stripe.value = _stripe
      isLoading.value = false
    }
  })

  return stripe
}
