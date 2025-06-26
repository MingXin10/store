import { FaHeart } from 'react-icons/fa'

import { Button } from '@/components/ui/Button'

interface FavoriteToggleButtonProps {
  productId: string
}

const FavoriteToggleButton = ({ productId }: FavoriteToggleButtonProps) => (
  <Button className="p-2 cursor-pointer" size="icon" variant="outline">
    <FaHeart />
  </Button>
)

export default FavoriteToggleButton
