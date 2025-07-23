import SectionTitle from '../global/SectionTitle'
import ReviewCard from './ReviewCard'

import { fetchProductReviews } from '@/utils/dbActions'

interface ProductReviewsProps {
  productId: string
}

const ProductReviews = async ({ productId }: ProductReviewsProps) => {
  const reviewList = await fetchProductReviews(productId)

  return (
    <div className="mt-16">
      <SectionTitle text="商品評價" />
      <div className="grid md:grid-cols-2 gap-8 my-4">
        {reviewList.map(
          ({ comment, rating, authorImageUrl, authorName, id }) => {
            const reviewInfo = {
              comment,
              rating,
              imageUrl: authorImageUrl,
              name: authorName
            }

            return <ReviewCard key={id} reviewInfo={reviewInfo} />
          }
        )}
      </div>
    </div>
  )
}

export default ProductReviews
