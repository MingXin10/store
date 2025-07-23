import { Cart } from '@prisma/client'

import { SubmitButton } from '../form/Buttons'
import FormContainer from '../form/FormContainer'
import CartTotalRow from './CartTotalRow'

import { Card, CardTitle } from '@/components/ui/Card'
import { createOrderAction } from '@/utils/dbActions'

interface CartTotalsProps {
  cart: Cart
}

const CartTotals = ({
  cart: { subTotal, shipping, tax, orderTotal }
}: CartTotalsProps) => (
  <div>
    <Card className="p-8 ">
      <CartTotalRow amount={subTotal} label="小計" />
      <CartTotalRow amount={shipping} label="運費" />
      <CartTotalRow amount={tax} label="稅" />
      <CardTitle className="mt-8">
        <CartTotalRow amount={orderTotal} isLastRow label="總金額" />
      </CardTitle>
    </Card>
    <FormContainer action={createOrderAction}>
      <SubmitButton className="w-full mt-8" text="送出訂單" />
    </FormContainer>
  </div>
)

export default CartTotals
