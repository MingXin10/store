import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import CartContainer from './CartContainer'

import SectionTitle from '@/components/global/SectionTitle'
import { fetchOrCreateCart, updateCart } from '@/utils/dbActions'

const CartPage = async () => {
  const { userId } = auth()

  if (!userId) redirect('/')

  const previousCart = await fetchOrCreateCart({ userId })

  const { cartItemList, currentCart } = await updateCart(previousCart)

  await updateCart(currentCart)

  if (cartItemList.length === 0) {
    return <SectionTitle text="購物車內無任何商品" />
  }

  return <CartContainer cartItemList={cartItemList} currentCart={currentCart} />
}

export default CartPage
