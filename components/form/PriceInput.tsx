import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

const NAME = 'price'

interface PriceInputProps {
  defaultValue?: number
}

const PriceInput = ({ defaultValue }: PriceInputProps) => (
  <div className="mb-2">
    <Label className="mb-2" htmlFor="price">
      價格 ($)
    </Label>
    <Input
      defaultValue={defaultValue}
      id={NAME}
      min={0}
      name={NAME}
      required
      type="number"
    />
  </div>
)

export default PriceInput
