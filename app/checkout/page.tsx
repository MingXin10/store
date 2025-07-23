'use client'

import React, { Suspense } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

import LoadingContainer from '@/components/global/LoadingContainer'

const STRIPE_PROMISE = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

const CheckoutContent = () => {
  const searchParams = useSearchParams()

  const orderId = searchParams.get('orderId')

  const cartId = searchParams.get('cartId')

  const fetchClientSecret = async () => {
    const response = await axios.post('/api/payment', {
      orderId,
      cartId
    })

    return response.data.clientSecret
  }

  const options = { fetchClientSecret }

  return (
    <EmbeddedCheckoutProvider options={options} stripe={STRIPE_PROMISE}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )
}

const CheckoutPage = () => (
  <div id="checkout">
    <Suspense fallback={<LoadingContainer />}>
      <CheckoutContent />
    </Suspense>
  </div>
)

export default CheckoutPage
