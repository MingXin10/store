import type { NextRequest } from 'next/server'
import Stripe from 'stripe'

import db from '@/utils/db'

const STRIPE = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const POST = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers)

  const origin = requestHeaders.get('origin')

  const { orderId, cartId } = await req.json()

  const order = await db.order.findUnique({
    where: {
      id: orderId
    }
  })

  const cart = await db.cart.findUnique({
    where: {
      id: cartId
    },
    include: {
      cartItems: {
        include: {
          product: true
        }
      }
    }
  })

  if (!order || !cart) {
    return Response.json(null, {
      status: 404,
      statusText: 'Not Found'
    })
  }

  const lineItemList = [
    ...cart.cartItems.map((cartItem) => ({
      quantity: cartItem.amount,
      price_data: {
        currency: 'usd',
        product_data: {
          name: cartItem.product.name,
          images: [cartItem.product.image]
        },
        unit_amount: cartItem.product.price * 100 // price in cents
      }
    })),
    {
      quantity: 1,
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Tax'
        },
        unit_amount: cart.tax * 100
      }
    },
    {
      quantity: 1,
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Shipping'
        },
        unit_amount: cart.shipping * 100
      }
    }
  ]

  try {
    const session = await STRIPE.checkout.sessions.create({
      ui_mode: 'embedded',
      metadata: { orderId, cartId },
      line_items: lineItemList,
      mode: 'payment',
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`
    })

    return Response.json({ clientSecret: session.client_secret })
  } catch (error) {
    console.log(error)

    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Error'
    })
  }
}
