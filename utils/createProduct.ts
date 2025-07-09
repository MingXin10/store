'use server'

import { auth, currentUser } from '@clerk/nextjs/server'

import db from './db'
import type { ActionFunction } from './types'

const getAuthUser = async () => {
  const user = await currentUser()

  if (!user) {
    throw new Error('You must be logged in to access this route')
  }

  return user
}

const renderError = (error: unknown): { message: string } => {
  console.log(error)

  return {
    message: error instanceof Error ? error.message : 'An error occurred'
  }
}

export const createProduct: ActionFunction = async (prevState, formData) => {
  const user = await getAuthUser()

  console.log('user:', user)

  try {
    const name = formData.get('name') as string

    const company = formData.get('company') as string

    const price = Number(formData.get('price') as string)

    const image = formData.get('image') as File

    const description = formData.get('description') as string

    const featured = Boolean(formData.get('featured') as string)

    await db.product.create({
      data: {
        name,
        company,
        price,
        image: '/images/hero1.jpg',
        description,
        featured,
        clerkId: user.id
      }
    })

    return { message: 'product created' }
  } catch (error) {
    return renderError(error)
  }
}
