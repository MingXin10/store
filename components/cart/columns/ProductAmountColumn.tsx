'use client'

import type { TransitionStartFunction } from 'react'

import { SubmitButton } from '../../form/Buttons'
import FormContainer from '../../form/FormContainer'
import SelectAmount, {
  SelectAmountProps
} from '../../single-product/SelectAmount'

import { removeCartItemAction, updateCartItem } from '@/utils/dbActions'

export interface ProductAmountColumnProps {
  quantity: number
  id: string
  startTransition: TransitionStartFunction
}

const ProductAmountColumn = ({
  quantity,
  id,
  startTransition
}: ProductAmountColumnProps) => {
  const handleAmountChange: SelectAmountProps['onChange'] = (value) => {
    startTransition(() => {
      updateCartItem({
        amount: value,
        cartItemId: id
      })
    })
  }

  const handleDeleteClick = () => {
    startTransition(() => {
      removeCartItemAction(id)
    })
  }

  return (
    <div className="md:ml-8">
      <SelectAmount
        amount={quantity}
        maxAmount={quantity + 10}
        width="w-[100px]"
        onChange={handleAmountChange}
      />
      <SubmitButton
        className="mt-4"
        size="sm"
        text="刪除"
        onClick={handleDeleteClick}
      />
    </div>
  )
}

export default ProductAmountColumn
