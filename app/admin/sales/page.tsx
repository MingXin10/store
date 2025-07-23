import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table'
import { fetchAdminOrders } from '@/utils/dbActions'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'

const SalesPage = async () => {
  const orderList = await fetchAdminOrders()

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>信箱</TableHead>
            <TableHead>商品數量</TableHead>
            <TableHead>總金額</TableHead>
            <TableHead>稅</TableHead>
            <TableHead>運費</TableHead>
            <TableHead>日期</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList.map(
            ({
              id,
              productCounts,
              orderTotal,
              tax,
              shipping,
              createdAt,
              email
            }) => (
              <TableRow key={id}>
                <TableCell>{email}</TableCell>
                <TableCell>{productCounts}</TableCell>
                <TableCell>{formatCurrency(orderTotal)}</TableCell>
                <TableCell>{formatCurrency(tax)}</TableCell>
                <TableCell>{formatCurrency(shipping)}</TableCell>
                <TableCell>{formatDate(createdAt)}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
        <TableCaption>訂單數量: {orderList.length}</TableCaption>
      </Table>
    </div>
  )
}

export default SalesPage
