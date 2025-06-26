import { cn } from '@/lib/utils'

interface EmptyListProps {
  className?: string
  heading?: string
}

const EmptyList = ({
  className,
  heading = 'No items found.'
}: EmptyListProps) => <h2 className={cn('text-xl ', className)}>{heading}</h2>

export default EmptyList
