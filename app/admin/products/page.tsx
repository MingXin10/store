import Link from 'next/link'

import { IconButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import EmptyList from '@/components/global/EmptyList'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table'
import { deleteProductAction, fetchAdminProducts } from '@/utils/dbActions'
import { formatCurrency } from '@/utils/formatCurrency'

const DeleteProductButton = ({ productId }: { productId: string }) => {
  const deleteProduct = deleteProductAction.bind(null, { productId })

  return (
    <FormContainer action={deleteProduct}>
      <IconButton actionType="delete" />
    </FormContainer>
  )
}

const ItemsPage = async () => {
  const productList = await fetchAdminProducts()

  const productCounts = productList.length

  if (productCounts === 0) return <EmptyList />

  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>商品名稱</TableHead>
            <TableHead>製造商</TableHead>
            <TableHead>價格</TableHead>
            <TableHead>編輯與刪除</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productList.map(({ id, name, company, price }) => (
            <TableRow key={id}>
              <TableCell>
                <Link
                  className="underline text-muted-foreground tracking-wide"
                  href={`/products/${id}`}
                >
                  {name}
                </Link>
              </TableCell>
              <TableCell>{company}</TableCell>
              <TableCell>{formatCurrency(price)}</TableCell>
              <TableCell className="flex items-center gap-x-2">
                <Link href={`/admin/products/${id}/edit`}>
                  <IconButton actionType="edit" />
                </Link>
                <DeleteProductButton productId={id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>商品總數: {productCounts}</TableCaption>
      </Table>
    </section>
  )
}

export default ItemsPage
