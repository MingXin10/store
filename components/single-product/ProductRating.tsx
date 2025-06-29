import { FaStar } from 'react-icons/fa'

interface ProductRatingProps {
  productId: string
}

const ProductRating = async ({ productId }: ProductRatingProps) => {
  // TODO: Fetch the rating and count from the database using productId
  const rating = 4.2

  const counts = 25

  const className = `flex gap-1 items-center text-md mt-1 mb-4`

  const countValue = `(${counts}) reviews`

  return (
    <span className={className}>
      <FaStar className="w-3 h-3" />
      {rating} {countValue}
    </span>
  )
}

export default ProductRating
