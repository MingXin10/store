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

const DeleteProduct = ({ productId }: { productId: string }) => {
  const deleteProduct = deleteProductAction.bind(null, { productId })

  return (
    <FormContainer action={deleteProduct}>
      <IconButton actionType="delete" />
    </FormContainer>
  )
}

const ItemsPage = async () => {
  const productList = await fetchAdminProducts()

  if (productList.length === 0) return <EmptyList />

  return (
    <section>
      <Table>
        <TableCaption className="capitalize">
          Total products: {productList.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productList.map(({ id, name, company, price }) => (
            <TableRow key={id}>
              <TableCell>
                <Link
                  className="underline text-muted-foreground tracking-wide capitalize"
                  href={`/products/${id}`}
                >
                  {name}
                </Link>
              </TableCell>
              <TableCell>{company}</TableCell>
              <TableCell>{formatCurrency(price)}</TableCell>
              <TableCell className="flex items-center gap-x-2">
                <Link href={`/admin/products/${id}/edit`}>
                  <IconButton actionType="edit"></IconButton>
                </Link>
                <DeleteProduct productId={id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

export default ItemsPage
