'use client'

import { useEffect, useState, useTransition } from 'react'
import { Prisma } from '@prisma/client'
import { Cart } from '@prisma/client'
import { toast } from 'sonner'

import CartItemList from '@/components/cart/CartItemList'
import CartTotals from '@/components/cart/CartTotals'
import Loading from '@/components/global/Loading'
import SectionTitle from '@/components/global/SectionTitle'

type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true }
}>

interface CartContainerProps {
  cartItemList: CartItemWithProduct[]
  currentCart: Cart
}

const CartContainer = ({ cartItemList, currentCart }: CartContainerProps) => {
  const [isPending, startTransition] = useTransition()

  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (isPending) {
      setIsUpdating(true)
    } else if (isUpdating) {
      toast('商品數量已更新')
      setIsUpdating(false)
    }
  }, [isPending, isUpdating])

  return (
    <div className="relative">
      {isPending && <Loading />}
      <SectionTitle text="商品清單" />
      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemList
            cartItemList={cartItemList}
            startTransition={startTransition}
          />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals cart={currentCart} />
        </div>
      </div>
    </div>
  )
}

export default CartContainer
