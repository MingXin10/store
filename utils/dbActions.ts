'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { Cart } from '@prisma/client'
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

export const getAdminUser = async () => {
  const user = await getAuthUser()

  if (user.id !== process.env.ADMIN_USER_ID) redirect('/')

  return user
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
        imageUrl: imagePath,
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

    await deleteImage(product.imageUrl)

    revalidatePath('/admin/products')

    return { message: '已刪除商品' }
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

    return { message: '商品更新成功' }
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
        imageUrl: newImagePath
      }
    })
    revalidatePath(`/admin/products/${productId}/edit`)

    return { message: '商品圖片更新成功' }
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
      message: favoriteId ? '已從追蹤清單移除' : '已加入追蹤清單'
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

    return { message: '感謝你的評論！' }
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
          imageUrl: true,
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

    return { message: '已刪除評價' }
  } catch (error) {
    return renderError(error)
  }
}

export const findExistingReview = async (userId: string, productId: string) =>
  await db.review.findFirst({
    where: {
      clerkId: userId,
      productId
    }
  })

export const fetchCartItems = async () => {
  const { userId } = await auth()

  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId ?? ''
    },
    select: {
      totalItemCounts: true
    }
  })

  return cart?.totalItemCounts || 0
}

const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId
    }
  })

  if (!product) {
    throw new Error('Product not found')
  }

  return product
}

const includeProductClause = {
  cartItemList: {
    include: {
      product: true
    }
  }
}

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false
}: {
  userId: string
  errorOnFailure?: boolean
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId
    },
    include: includeProductClause
  })

  if (!cart && errorOnFailure) {
    throw new Error('Cart not found')
  }

  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId
      },
      include: includeProductClause
    })
  }

  return cart
}

export const updateCart = async (cart: Cart) => {
  const cartItemList = await db.cartItem.findMany({
    where: {
      cartId: cart.id
    },
    include: {
      product: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  let totalItemCounts = 0

  let subTotal = 0

  for (const item of cartItemList) {
    totalItemCounts += item.amount
    subTotal += item.amount * item.product.price
  }

  const tax = cart.taxRate * subTotal

  const shipping = subTotal ? cart.shipping : 0

  const orderTotal = subTotal + tax + shipping

  const currentCart = await db.cart.update({
    where: {
      id: cart.id
    },

    data: {
      totalItemCounts,
      subTotal,
      tax,
      orderTotal
    },
    include: includeProductClause
  })

  return { currentCart, cartItemList }
}

const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount
}: {
  productId: string
  cartId: string
  amount: number
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId
    }
  })

  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id
      },
      data: {
        amount: cartItem.amount + amount
      }
    })
  } else {
    cartItem = await db.cartItem.create({
      data: { amount, productId, cartId }
    })
  }
}

export const addToCartAction = async (
  preState: unknown,
  formData: FormData
) => {
  const user = await getAuthUser()

  try {
    const productId = formData.get('productId') as string

    const amount = Number(formData.get('amount'))

    await fetchProduct(productId)

    const cart = await fetchOrCreateCart({ userId: user.id })

    await updateOrCreateCartItem({ productId, cartId: cart.id, amount })
    await updateCart(cart)
  } catch (error) {
    return renderError(error)
  }
  redirect('/cart')
}

export const createOrderAction = async (
  prevState: unknown,
  formData: FormData
) => {
  const user = await getAuthUser()

  let orderId: null | string = null

  let cartId: null | string = null

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true
    })

    cartId = cart.id
    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false
      }
    })

    const order = await db.order.create({
      data: {
        clerkId: user.id,
        productCounts: cart.totalItemCounts,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress
      }
    })

    orderId = order.id
  } catch (error) {
    return renderError(error)
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`)
}

export const removeCartItemAction = async (cartItemId: string) => {
  const user = await getAuthUser()

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true
    })

    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id
      }
    })

    await updateCart(cart)
    revalidatePath('/cart')

    return { message: '已移除商品' }
  } catch (error) {
    return renderError(error)
  }
}

export const updateCartItem = async ({
  amount,
  cartItemId
}: {
  amount: number
  cartItemId: string
}) => {
  const user = await getAuthUser()

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true
    })

    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id
      },
      data: {
        amount
      }
    })
    await updateCart(cart)
    revalidatePath('/cart')

    return { message: '已更新數量' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchUserOrders = async () => {
  const user = await getAuthUser()

  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return orders
}

export const fetchAdminOrders = async () => {
  const user = await getAdminUser()

  const orders = await db.order.findMany({
    where: {
      isPaid: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return orders
}
