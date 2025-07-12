import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import CartItemsList from '@/components/cart/CartItemsList'
import CartTotals from '@/components/cart/CartTotals'
import SectionTitle from '@/components/global/SectionTitle'
import { fetchOrCreateCart, updateCart } from '@/utils/dbActions'

const CartPage = async () => {
  const { userId } = auth()

  if (!userId) redirect('/')

  const previousCart = await fetchOrCreateCart({ userId })

  const { cartItemList, currentCart } = await updateCart(previousCart)

  await updateCart(currentCart)

  if (cartItemList.length === 0) {
    return <SectionTitle text="Empty cart" />
  }

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList cartItemList={cartItemList} />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals cart={currentCart} />
        </div>
      </div>
    </>
  )
}

export default CartPage
