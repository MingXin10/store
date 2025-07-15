'use client'

import { PropsWithChildren, useState } from 'react'
import Image from 'next/image'

import { Button } from '../ui/Button'
import { SubmitButton } from './Buttons'
import FormContainer from './FormContainer'
import ImageInput from './ImageInput'

import type { ActionFunction } from '@/utils/types'

interface ImageInputContainerProps {
  imageUrl: string
  name: string
  action: ActionFunction
  text: string
}

const ImageInputContainer = ({
  imageUrl,
  name,
  action,
  text,
  children
}: PropsWithChildren<ImageInputContainerProps>) => {
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false)

  return (
    <div className="mb-8">
      <Image
        alt={name}
        className="rounded-md object-cover mb-4 w-[200px] h-[200px]"
        height={200}
        src={imageUrl}
        width={200}
      />

      <Button
        size="sm"
        variant="outline"
        onClick={() => setUpdateFormVisible((prev) => !prev)}
      >
        {text}
      </Button>
      {isUpdateFormVisible && (
        <div className="max-w-md mt-4">
          <FormContainer action={action}>
            {children}
            <ImageInput />
            <SubmitButton size="sm" />
          </FormContainer>
        </div>
      )}
    </div>
  )
}

export default ImageInputContainer
