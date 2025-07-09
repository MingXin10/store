'use server'

import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import db from './db'
import { IMAGE_SCHEMA, PRODUCT_SCHEMA } from './productSchema'
import { deleteImage, uploadImage } from './supabase'
import type { ActionFunction } from './types'
import { validateWithZodSchema } from './validateWithZodSchema'

export const fetchAllProducts = async ({ search = '' }: { search: string }) =>
  db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } }
      ]
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

export const fetchFeaturedProducts = async () => {
  const productList = await db.product.findMany({
    where: {
      featured: true
    }
  })

  return productList
}

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId
    }
  })

  if (!product) {
    redirect('/products')
  }

  return product
}

export const fetchAdminProducts = async () => {
  await getAdminUser()

  const productList = await db.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return productList
}

const getAuthUser = async () => {
  const user = await currentUser()

  if (!user) {
    throw new Error('You must be logged in to access this route')
  }

  return user
}

export const getAdminUser = async () => {
  const user = await getAuthUser()

  if (user.id !== process.env.ADMIN_USER_ID) redirect('/')

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

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState

  await getAdminUser()

  try {
    const product = await db.product.delete({
      where: {
        id: productId
      }
    })

    await deleteImage(product.image)

    revalidatePath('/admin/products')

    return { message: 'product removed' }
  } catch (error) {
    return renderError(error)
  }
}
