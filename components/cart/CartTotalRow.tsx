import { Separator } from '@/components/ui/Separator'
import { formatCurrency } from '@/utils/formatCurrency'

interface CartTotalRowProps {
  label: string
  amount: number
  isLastRow?: boolean
}

const CartTotalRow = ({ label, amount, isLastRow }: CartTotalRowProps) => (
  <>
    <p className="flex justify-between text-sm">
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
    {!isLastRow && <Separator className="my-2" />}
  </>
)

export default CartTotalRow
