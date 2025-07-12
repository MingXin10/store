import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'

export enum Mode {
  SingleProduct = 'singleProduct',
  CartItem = 'cartItem'
}

export type SelectProductAmountProps = {
  mode: Mode.SingleProduct
  amount: number
  onChange: (value: number) => void
}

export type SelectCartItemAmountProps = {
  mode: Mode.CartItem
  amount: number
  isLoading: boolean
  onChange: (value: number) => Promise<void>
}

const SelectProductAmount = (
  props: SelectProductAmountProps | SelectCartItemAmountProps
) => {
  const { mode, amount, onChange } = props

  const cartItem = mode === Mode.CartItem

  return (
    <>
      <h4 className="mb-2">Amount : </h4>
      <Select
        defaultValue={amount.toString()}
        disabled={cartItem ? props.isLoading : false}
        onValueChange={(value) => onChange(Number(value))}
      >
        <SelectTrigger className={cartItem ? 'w-[100px]' : 'w-[150px]'}>
          <SelectValue placeholder={amount} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: cartItem ? amount + 10 : 10 }, (_, index) => {
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
}

export default SelectProductAmount
