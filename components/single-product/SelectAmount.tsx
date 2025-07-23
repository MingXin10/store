import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'

export interface SelectAmountProps {
  amount: number
  maxAmount?: number
  width?: string
  onChange: (value: number) => void
}

const SelectAmount = ({
  amount,
  maxAmount = 10,
  width = 'w-[150px]',
  onChange
}: SelectAmountProps) => (
  <>
    <h4 className="mb-2">數量：</h4>
    <Select
      defaultValue={amount.toString()}
      onValueChange={(value) => onChange(Number(value))}
    >
      <SelectTrigger className={width}>
        <SelectValue placeholder={amount} />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: maxAmount }, (_, index) => {
          const selectValue = (index + 1).toString()

          return (
            <SelectItem key={index} value={selectValue}>
              {selectValue}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  </>
)

export default SelectAmount
