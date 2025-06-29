import { Button } from '@/components/ui/Button'

interface AddToCartProps {
  productId: string
}

function AddToCart({ productId }: AddToCartProps) {
  return (
    <Button className="capitalize mt-8" size="lg">
      加入購物車
    </Button>
  )
}

export default AddToCart
