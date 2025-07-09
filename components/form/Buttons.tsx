'use client'

import { useFormStatus } from 'react-dom'
import { LuSquarePen, LuTrash2 } from 'react-icons/lu'
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

type ActionType = 'edit' | 'delete'

const IconButton = ({ actionType }: { actionType: ActionType }) => {
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

export { SubmitButton, IconButton }
