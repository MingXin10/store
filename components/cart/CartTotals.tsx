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
  cart: { cartTotal, shipping, tax, orderTotal }
}: CartTotalsProps) => (
  <div>
    <Card className="p-8 ">
      <CartTotalRow amount={cartTotal} label="Subtotal" />
      <CartTotalRow amount={shipping} label="Shipping" />
      <CartTotalRow amount={tax} label="Tax" />
      <CardTitle className="mt-8">
        <CartTotalRow amount={orderTotal} isLastRow label="Order Total" />
      </CardTitle>
    </Card>
    <FormContainer action={createOrderAction}>
      <SubmitButton className="w-full mt-8" text="Place Order" />
    </FormContainer>
  </div>
)

export default CartTotals
