import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

interface FormInputProps {
  name: string
  type: string
  label?: string
  defaultValue?: string
}

const FormInput = ({
  label,
  name,
  type,
  defaultValue = ''
}: FormInputProps) => (
  <div className="mb-2">
    <Label className="mb-2" htmlFor={name}>
      {label || name}
    </Label>
    <Input
      defaultValue={defaultValue}
      id={name}
      name={name}
      required
      type={type}
    />
  </div>
)

export default FormInput
