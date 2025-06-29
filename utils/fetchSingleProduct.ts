import { redirect } from 'next/navigation'

import db from '@/utils/db'

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
