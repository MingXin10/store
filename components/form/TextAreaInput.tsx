'use client'

import { FocusEvent, useState } from 'react'

import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'

type TextAreaInputProps = {
  defaultValue?: string
  label?: string
  name: string
}

const TextAreaInput = ({ defaultValue, label, name }: TextAreaInputProps) => {
  const [description, setDescription] = useState(defaultValue)

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    const trimmedValue = e.target.value.trim()

    setDescription(trimmedValue)
  }

  return (
    <div className="mb-2">
      <Label className="mb-2" htmlFor={name}>
        {label || name}
      </Label>
      <Textarea
        className="leading-loose resize-none"
        id={name}
        name={name}
        required
        value={description}
        onBlur={handleBlur}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  )
}

export default TextAreaInput
