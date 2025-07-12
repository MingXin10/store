'use client'

import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'

import { SubmitButton } from '../form/Buttons'
import { ProductSignInButton } from '../form/Buttons'
import FormContainer from '../form/FormContainer'
import SelectProductAmount, {
  SelectProductAmountProps
} from './SelectProductAmount'
import { Mode } from './SelectProductAmount'

import { addToCartAction } from '@/utils/dbActions'

interface AddToCartProps {
  productId: string
}

const AddToCart = ({ productId }: AddToCartProps) => {
  const { userId } = useAuth()

  const [amount, setAmount] = useState(1)

  const handleCartAmountChange: SelectProductAmountProps['onChange'] = (
    value
  ) => {
    setAmount(value)
  }

  return (
    <div className="mt-4">
      <SelectProductAmount
        amount={amount}
        mode={Mode.SingleProduct}
        onChange={handleCartAmountChange}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input name="productId" type="hidden" value={productId} />
          <input name="amount" type="hidden" value={amount} />
          <SubmitButton className="mt-8" size="default" text="add to cart" />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </div>
  )
}

export default AddToCart
