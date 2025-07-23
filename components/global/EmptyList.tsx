import { cn } from '@/utils/cn'

interface EmptyListProps {
  className?: string
  heading?: string
}

const EmptyList = ({ className, heading = '無商品' }: EmptyListProps) => (
  <h2 className={cn('text-xl ', className)}>{heading}</h2>
)

export default EmptyList
