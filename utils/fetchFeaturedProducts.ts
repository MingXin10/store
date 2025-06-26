import db from '@/utils/db'

export const fetchFeaturedProducts = async () => {
  const productList = await db.product.findMany({
    where: {
      featured: true
    }
  })

  return productList
}
