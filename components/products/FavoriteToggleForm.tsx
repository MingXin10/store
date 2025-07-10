'use client'

import { usePathname } from 'next/navigation'

import { CardSubmitButton } from '../form/Buttons'
import FormContainer from '../form/FormContainer'

import { toggleFavoriteAction } from '@/utils/dbActions'

interface FavoriteToggleFormProps {
  productId: string
  favoriteId: string | null
}

const FavoriteToggleForm = ({
  productId,
  favoriteId
}: FavoriteToggleFormProps) => {
  const pathname = usePathname()

  const toggleAction = toggleFavoriteAction.bind(null, {
    productId,
    favoriteId,
    pathname
  })

  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  )
}

export default FavoriteToggleForm
