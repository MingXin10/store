'use client'

import { useFormStatus } from 'react-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { LuSquare, LuTrash2 } from 'react-icons/lu'
import { SignInButton } from '@clerk/nextjs'
import { ReloadIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type ButtonSize = 'default' | 'lg' | 'sm'

type SubmitButtonProps = {
  className?: string
  text?: string
  size?: ButtonSize
}

const SubmitButton = ({
  className = '',
  text = 'submit',
  size = 'lg'
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      className={cn('capitalize', className)}
      disabled={pending}
      size={size}
      type="submit"
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  )
}

export { SubmitButton }
