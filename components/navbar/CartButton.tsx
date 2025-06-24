import { LuShoppingCart } from 'react-icons/lu'
import Link from 'next/link'

import { Button } from '../ui/button'

const CartButton = () => {
  // TODO: Replace with actual cart item count logic
  const itemCounts = 1

  return (
    <Button
      asChild
      className="flex justify-center items-center relative"
      size="icon"
      variant="outline"
    >
      <Link href="/cart">
        <LuShoppingCart />
        {itemCounts > 0 && (
          <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
            {itemCounts}
          </span>
        )}
      </Link>
    </Button>
  )
}

export default CartButton
