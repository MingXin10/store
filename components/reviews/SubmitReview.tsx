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
      <Button size="lg" onClick={() => setIsReviewFormVisible((prev) => !prev)}>
        評價商品
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
            <RatingInput label="評價星等" name="rating" />
            <TextAreaInput label="評論" name="comment" />
            <SubmitButton className="mt-4" text="送出評論" />
          </FormContainer>
        </Card>
      )}
    </div>
  )
}

export default SubmitReview
