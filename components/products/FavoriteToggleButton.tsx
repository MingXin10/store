import { auth } from '@clerk/nextjs/server'

import { CardSignInButton } from '../form/Buttons'
import FavoriteToggleForm from './FavoriteToggleForm'

import { fetchFavoriteId } from '@/utils/dbActions'

interface FavoriteToggleButtonProps {
  productId: string
}

const FavoriteToggleButton = async ({
  productId
}: FavoriteToggleButtonProps) => {
  const { userId } = await auth()

  if (!userId) return <CardSignInButton />

  const favoriteId = await fetchFavoriteId({ productId })

  return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />
}

export default FavoriteToggleButton
