import { FaStar } from 'react-icons/fa'

import { fetchProductRating } from '@/utils/dbActions'

interface ProductRatingProps {
  productId: string
}

const ProductRating = async ({ productId }: ProductRatingProps) => {
  const { rating, counts } = await fetchProductRating(productId)

  const countValue = `(${counts}) reviews`

  return (
    <span className="flex gap-1 items-center text-md mt-1 mb-4">
      <FaStar className="w-3 h-3" />
      {rating} {countValue}
    </span>
  )
}

export default ProductRating
