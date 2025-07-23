import { IconButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import SectionTitle from '@/components/global/SectionTitle'
import ReviewCard from '@/components/reviews/ReviewCard'
import {
  deleteReviewAction,
  fetchProductReviewsByUser
} from '@/utils/dbActions'

const DeleteReviewButton = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId })

  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType="delete" />
    </FormContainer>
  )
}

const ReviewsPage = async () => {
  const reviewList = await fetchProductReviewsByUser()

  if (reviewList.length === 0) {
    return <SectionTitle text="尚無評價" />
  }

  return (
    <>
      <SectionTitle text="所有評價" />
      <section className="grid md:grid-cols-2 gap-8 mt-4 ">
        {reviewList.map(
          ({ comment, rating, id, product: { name, imageUrl } }) => {
            const reviewInfo = {
              comment,
              rating,
              name,
              imageUrl
            }

            return (
              <ReviewCard key={id} reviewInfo={reviewInfo}>
                <DeleteReviewButton reviewId={id} />
              </ReviewCard>
            )
          }
        )}
      </section>
    </>
  )
}

export default ReviewsPage
