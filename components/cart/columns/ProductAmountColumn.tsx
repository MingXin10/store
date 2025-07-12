'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { SubmitButton } from '../../form/Buttons'
import FormContainer from '../../form/FormContainer'
import SelectProductAmount from '../../single-product/SelectProductAmount'
import { Mode } from '../../single-product/SelectProductAmount'

import { removeCartItemAction, updateCartItemAction } from '@/utils/dbActions'

interface ProductAmountColumnProps {
  quantity: number
  id: string
}

const ProductAmountColumn = ({ quantity, id }: ProductAmountColumnProps) => {
  const [amount, setAmount] = useState(quantity)

  const [isLoading, setIsLoading] = useState(false)

  const handleAmountChange = async (value: number) => {
    setIsLoading(true)
    toast('Calculating...')

    const result = await updateCartItemAction({
      amount: value,
      cartItemId: id
    })

    setAmount(value)
    toast(result.message)
    setIsLoading(false)
  }

  return (
    <div className="md:ml-8">
      <SelectProductAmount
        amount={amount}
        isLoading={isLoading}
        mode={Mode.CartItem}
        onChange={handleAmountChange}
      />
      <FormContainer action={removeCartItemAction}>
        <input name="id" type="hidden" value={id} />
        <SubmitButton className="mt-4" size="sm" text="remove" />
      </FormContainer>
    </div>
  )
}

export default ProductAmountColumn
