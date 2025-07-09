import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

const NAME = 'price'

type PriceInputProps = {
  defaultValue?: number
}

const PriceInput = ({ defaultValue }: PriceInputProps) => (
  <div className="mb-2">
    <Label className="capitalize" htmlFor="price">
      Price ($)
    </Label>
    <Input
      defaultValue={defaultValue || 100}
      id={NAME}
      min={0}
      name={NAME}
      required
      type="number"
    />
  </div>
)

export default PriceInput
