import type { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

interface ContainerProps {
  className?: string
}

const Container = ({
  children,
  className
}: PropsWithChildren<ContainerProps>) => (
  <div className={cn('mx-auto max-w-6xl xl:max-w-7xl px-8', className)}>
    {children}
  </div>
)

export default Container
