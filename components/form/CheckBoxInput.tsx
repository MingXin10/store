'use client'

import { Checkbox } from '@/components/ui/Checkbox'

type CheckboxInputProps = {
  name: string
  label: string
  defaultChecked?: boolean
}

const CheckboxInput = ({
  name,
  label,
  defaultChecked = false
}: CheckboxInputProps) => (
  <div className="flex items-center space-x-2">
    <Checkbox defaultChecked={defaultChecked} id={name} name={name} />
    <label
      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
      htmlFor={name}
    >
      {label}
    </label>
  </div>
)

export default CheckboxInput
