'use server'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import db from './db'
import { IMAGE_SCHEMA, PRODUCT_SCHEMA } from './productSchema'
import { uploadImage } from './supabase'
import type { ActionFunction } from './types'
import { validateWithZodSchema } from './validateWithZodSchema'

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

  try {
    const rawData = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(PRODUCT_SCHEMA, rawData)

    const imageFile = formData.get('image') as File

    const validatedImageFile = validateWithZodSchema(IMAGE_SCHEMA, {
      image: imageFile
    })

    const imagePath = await uploadImage(validatedImageFile.image)

    await db.product.create({
      data: {
        ...validatedFields,
        image: imagePath,
        clerkId: user.id
      }
    })
  } catch (error) {
    return renderError(error)
  }
  redirect('/admin/products')
}
