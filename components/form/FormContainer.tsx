'use client'

import { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

import type { ActionFunction } from '@/utils/types'

interface FormContainerProps {
  action: ActionFunction
}

const FormContainer = ({
  action,
  children
}: PropsWithChildren<FormContainerProps>) => {
  const [state, formAction] = useFormState(action, {
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
