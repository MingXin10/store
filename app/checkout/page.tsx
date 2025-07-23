'use client'

import React from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

const STRIPE_PROMISE = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

const CheckoutPage = () => {
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
    <div id="checkout">
      <EmbeddedCheckoutProvider options={options} stripe={STRIPE_PROMISE}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default CheckoutPage
