import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'

type TextAreaInputProps = {
  defaultValue?: string
  labelText?: string
  name: string
}

const TextAreaInput = ({
  defaultValue,
  labelText,
  name
}: TextAreaInputProps) => (
  <div className="mb-2">
    <Label className="capitalize" htmlFor={name}>
      {labelText || name}
    </Label>
    <Textarea
      className="leading-loose"
      defaultValue={defaultValue}
      id={name}
      name={name}
      required
      rows={5}
    />
  </div>
)

export default TextAreaInput
