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

async function SalesPage() {
  const orderList = await fetchAdminOrders()

  const orderCounts = orderList.length

  return (
    <div>
      <Table>
        <TableCaption>Total orders : {orderCounts}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date</TableHead>
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
      </Table>
    </div>
  )
}

export default SalesPage
