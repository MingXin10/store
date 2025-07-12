import { formatCurrency } from '@/utils/formatCurrency'

interface CurrencyColumnProps {
  price: number
}

const CurrencyColumn = ({ price }: CurrencyColumnProps) => (
  <p className="font-medium md:ml-auto">{formatCurrency(price)}</p>
)

export default CurrencyColumn
