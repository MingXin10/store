import { Label } from '@/components/ui/Label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'

const RATING_LIST = Array.from({ length: 5 }, (_, i) => {
  const value = i + 1

  return value.toString()
}).reverse()

interface RatingInputProps {
  name: string
  labelText?: string
}

const RatingInput = ({ name, labelText }: RatingInputProps) => (
  <div className="mb-2 max-w-xs">
    <Label className="capitalize" htmlFor={name}>
      {labelText || name}
    </Label>
    <Select defaultValue={RATING_LIST[0]} name={name} required>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {RATING_LIST.map((number) => (
          <SelectItem key={number} value={number}>
            {number}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)

export default RatingInput
