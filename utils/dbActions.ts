'use server'

import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import db from './db'
import { IMAGE_SCHEMA, PRODUCT_SCHEMA, REVIEW_SCHEMA } from './productSchema'
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

export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser()

  const product = await db.product.findUnique({
    where: {
      id: productId
    }
  })

  if (!product) redirect('/admin/products')

  return product
}

export const updateProduct = async (prevState: unknown, formData: FormData) => {
  await getAdminUser()
  try {
    const productId = formData.get('id') as string

    const rawData = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(PRODUCT_SCHEMA, rawData)

    await db.product.update({
      where: {
        id: productId
      },
      data: {
        ...validatedFields
      }
    })
    revalidatePath(`/admin/products/${productId}/edit`)

    return { message: 'Product updated successfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const updateProductImage = async (
  prevState: unknown,
  formData: FormData
) => {
  await getAuthUser()
  try {
    const image = formData.get('image') as File

    const productId = formData.get('id') as string

    const oldImageUrl = formData.get('url') as string

    const validatedFile = validateWithZodSchema(IMAGE_SCHEMA, { image })

    const newImagePath = await uploadImage(validatedFile.image)

    await deleteImage(oldImageUrl)
    await db.product.update({
      where: {
        id: productId
      },
      data: {
        image: newImagePath
      }
    })
    revalidatePath(`/admin/products/${productId}/edit`)

    return { message: 'Product Image updated successfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser()

  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id
    },
    select: {
      id: true
    }
  })

  return favorite?.id || null
}

export const toggleFavoriteAction = async (prevState: {
  productId: string
  favoriteId: string | null
  pathname: string
}) => {
  const user = await getAuthUser()

  const { productId, favoriteId, pathname } = prevState

  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId
        }
      })
    } else {
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id
        }
      })
    }

    revalidatePath(pathname)

    return {
      message: favoriteId ? 'Removed from Favorites' : 'Added to Favorites'
    }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchUserFavoriteList = async () => {
  const user = await getAuthUser()

  const favoriteList = await db.favorite.findMany({
    where: {
      clerkId: user.id
    },
    include: {
      product: true
    }
  })

  return favoriteList
}

export const createReviewAction = async (
  prevState: unknown,
  formData: FormData
) => {
  const user = await getAuthUser()

  try {
    const rawData = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(REVIEW_SCHEMA, rawData)

    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id
      }
    })
    revalidatePath(`/products/${validatedFields.productId}`)

    return { message: 'Review submitted successfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchProductReviews = async (productId: string) => {
  const reviewList = await db.review.findMany({
    where: {
      productId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return reviewList
}

export const fetchProductRating = async (productId: string) => {
  const ratingList = await db.review.groupBy({
    by: ['productId'],
    _avg: {
      rating: true
    },
    _count: {
      rating: true
    },
    where: {
      productId
    }
  })

  return {
    rating: ratingList[0]?._avg.rating?.toFixed(1) ?? 0,
    counts: ratingList[0]?._count.rating ?? 0
  }
}

export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser()

  const reviewList = await db.review.findMany({
    where: {
      clerkId: user.id
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true
        }
      }
    }
  })

  return reviewList
}

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState

  const user = await getAuthUser()

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id
      }
    })

    revalidatePath('/reviews')

    return { message: 'Review deleted successfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const findExistingReview = async (userId: string, productId: string) =>
  db.review.findFirst({
    where: {
      clerkId: userId,
      productId
    }
  })
