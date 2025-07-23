import { Prisma } from '@prisma/client'

import CurrencyColumn from './columns/CurrencyColumn'
import ImageColumn from './columns/ImageColumn'
import ProductAmountColumn, {
  ProductAmountColumnProps
} from './columns/ProductAmountColumn'
import ProductInfoColumn from './columns/ProductInfoColumn'

import { Card } from '@/components/ui/Card'

type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true }
}>

export interface CartItemListProps
  extends Pick<ProductAmountColumnProps, 'startTransition'> {
  cartItemList: CartItemWithProduct[]
}

const CartItemList = ({ cartItemList, startTransition }: CartItemListProps) => (
  <div>
    {cartItemList.map(
      ({
        id,
        amount,
        product: { id: productId, imageUrl, name, company, price }
      }) => (
        <Card
          key={id}
          className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
        >
          <ImageColumn imageUrl={imageUrl} name={name} />
          <ProductInfoColumn
            company={company}
            name={name}
            productId={productId}
          />
          <ProductAmountColumn
            id={id}
            quantity={amount}
            startTransition={startTransition}
          />
          <CurrencyColumn price={price} />
        </Card>
      )
    )}
  </div>
)

export default CartItemList
