'use client'

import { Card, CardHeader } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

const ReviewLoadingCard = () => (
  <Card>
    <CardHeader>
      <div className="flex items-center">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="ml-4">
          <Skeleton className="w-[150px] h-4 mb-2" />
          <Skeleton className="w-[100px] h-4" />
        </div>
      </div>
    </CardHeader>
  </Card>
)

const Loading = () => (
  <section className="grid md:grid-cols-2 gap-8 mt-4 ">
    <ReviewLoadingCard />
    <ReviewLoadingCard />
  </section>
)

export default Loading
