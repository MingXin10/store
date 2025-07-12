import { LuShoppingCart } from 'react-icons/lu'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { fetchCartItems } from '@/utils/dbActions'

const CartButton = async () => {
  const itemCounts = await fetchCartItems()

  return (
    <Button
      asChild
      className="flex justify-center items-center relative"
      size="icon"
      variant="outline"
    >
      <Link href="/cart">
        <LuShoppingCart />
        <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
          {itemCounts}
        </span>
      </Link>
    </Button>
  )
}

export default CartButton
