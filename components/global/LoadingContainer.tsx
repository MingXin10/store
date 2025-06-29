import { Card, CardContent } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

const LoadingProduct = () => (
  <Card>
    <CardContent className="p-4">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4 mt-4" />
      <Skeleton className="h-4 w-1/4 mt-4" />
    </CardContent>
  </Card>
)

const LoadingContainer = () => (
  <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <LoadingProduct />
    <LoadingProduct />
    <LoadingProduct />
  </div>
)

export default LoadingContainer
