'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'

import { SubmitButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import TextAreaInput from '@/components/form/TextAreaInput'
import RatingInput from '@/components/reviews/RatingInput'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { createReviewAction } from '@/utils/dbActions'

interface SubmitReviewProps {
  productId: string
}

const SubmitReview = ({ productId }: SubmitReviewProps) => {
  const { user } = useUser()

  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false)

  return (
    <div>
      <Button
        className="capitalize"
        size="lg"
        onClick={() => setIsReviewFormVisible((prev) => !prev)}
      >
        leave review
      </Button>
      {isReviewFormVisible && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input name="productId" type="hidden" value={productId} />
            <input
              name="authorName"
              type="hidden"
              value={user?.firstName || 'user'}
            />
            <input
              name="authorImageUrl"
              type="hidden"
              value={user?.imageUrl || ''}
            />
            <RatingInput name="rating" />
            <TextAreaInput
              defaultValue="Outstanding product!!!"
              labelText="feedback"
              name="comment"
            />
            <SubmitButton className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  )
}

export default SubmitReview
