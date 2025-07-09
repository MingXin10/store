import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

type FormInputProps = {
  name: string
  type: string
  label?: string
  defaultValue?: string
  placeholder?: string
}

const FormInput = ({
  label,
  name,
  type,
  defaultValue,
  placeholder
}: FormInputProps) => (
  <div className="mb-2">
    <Label className="capitalize" htmlFor={name}>
      {label || name}
    </Label>
    <Input
      defaultValue={defaultValue}
      id={name}
      name={name}
      placeholder={placeholder}
      required
      type={type}
    />
  </div>
)

export default FormInput
