import { PropsWithChildren } from 'react'
import Image from 'next/image'

import Comment from './Comment'
import Rating from './Rating'

import { Card, CardContent, CardHeader } from '@/components/ui/Card'

interface ReviewCardProps {
  reviewInfo: {
    comment: string
    rating: number
    name: string
    image: string
  }
}

const ReviewCard = ({
  reviewInfo: { name, image, rating, comment },
  children
}: PropsWithChildren<ReviewCardProps>) => (
  <Card className="relative p-6">
    <CardHeader className="p-0">
      <div className="flex items-center">
        <Image
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
          height={48}
          src={image}
          width={48}
        />
        <div className="ml-4">
          <h3 className="text-sm font-bold capitalize mb-1">{name}</h3>
          <Rating rating={rating} />
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <Comment comment={comment} />
    </CardContent>
    <div className="absolute top-3 right-3">{children}</div>
  </Card>
)

export default ReviewCard
