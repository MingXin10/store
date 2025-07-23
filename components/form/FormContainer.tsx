'use client'

import { PropsWithChildren } from 'react'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

import type { ActionFunction } from '@/utils/types'

interface FormContainerProps {
  action: ActionFunction
}

const FormContainer = ({
  action,
  children
}: PropsWithChildren<FormContainerProps>) => {
  const [state, formAction] = useActionState(action, {
    message: ''
  })

  useEffect(() => {
    if (state.message) {
      toast(state.message)
    }
  }, [state])

  return <form action={formAction}>{children}</form>
}

export default FormContainer
