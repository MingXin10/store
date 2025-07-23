'use client'

import { Checkbox } from '@/components/ui/Checkbox'

type CheckboxInputProps = {
  name: string
  label: string
  checked?: boolean
}

const CheckboxInput = ({
  name,
  label,
  checked = false
}: CheckboxInputProps) => (
  <div className="flex items-center space-x-2">
    <Checkbox defaultChecked={checked} id={name} name={name} />
    <label
      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      htmlFor={name}
    >
      {label}
    </label>
  </div>
)

export default CheckboxInput
