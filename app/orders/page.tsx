import SectionTitle from '@/components/global/SectionTitle'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table'
import { fetchUserOrders } from '@/utils/dbActions'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'

const OrdersPage = async () => {
  const orderList = await fetchUserOrders()

  return (
    <>
      <SectionTitle text="你的訂單" />
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>商品</TableHead>
              <TableHead>總金額</TableHead>
              <TableHead>稅</TableHead>
              <TableHead>運費</TableHead>
              <TableHead>日期</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList.map(
              ({ id, productCounts, orderTotal, tax, shipping, createdAt }) => (
                <TableRow key={id}>
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
    </>
  )
}

export default OrdersPage
