'use client'

import { useFormStatus } from 'react-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { LuSquarePen, LuTrash2 } from 'react-icons/lu'
import { SignInButton } from '@clerk/nextjs'
import { ReloadIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface SubmitButtonProps {
  className?: string
  text?: string
  size?: 'default' | 'lg' | 'sm'
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

interface ActionType {
  actionType: 'edit' | 'delete'
}

const IconButton = ({ actionType }: ActionType) => {
  const { pending } = useFormStatus()

  const renderIcon = () => {
    switch (actionType) {
      case 'edit':
        return <LuSquarePen />
      case 'delete':
        return <LuTrash2 />
      default:
        const never: never = actionType

        throw new Error(`Invalid action type: ${never}`)
    }
  }

  return (
    <Button
      className="p-2 cursor-pointer"
      size="icon"
      type="submit"
      variant="link"
    >
      {pending ? <ReloadIcon className=" animate-spin" /> : renderIcon()}
    </Button>
  )
}

const CardSignInButton = () => (
  <SignInButton mode="modal">
    <Button
      asChild
      className="p-2 cursor-pointer"
      size="icon"
      type="button"
      variant="outline"
    >
      <FaRegHeart />
    </Button>
  </SignInButton>
)

interface CardSubmitButton {
  isFavorite: boolean
}

const CardSubmitButton = ({ isFavorite }: CardSubmitButton) => {
  const { pending } = useFormStatus()

  return (
    <Button
      className=" p-2 cursor-pointer"
      size="icon"
      type="submit"
      variant="outline"
    >
      {pending ? (
        <ReloadIcon className=" animate-spin" />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  )
}

const ProductSignInButton = () => (
  <SignInButton mode="modal">
    <Button className="mt-8" size="default" type="button">
      Please Sign In
    </Button>
  </SignInButton>
)

export {
  SubmitButton,
  IconButton,
  CardSignInButton,
  CardSubmitButton,
  ProductSignInButton
}
