import SectionTitle from '@/components/global/SectionTitle'
import ProductsGrid from '@/components/products/ProductsGrid'
import { fetchUserFavoriteList } from '@/utils/dbActions'

const FavoritesPage = async () => {
  const favoriteList = await fetchUserFavoriteList()

  if (favoriteList.length === 0) {
    return <SectionTitle text="You have no favorite yet." />
  }

  return (
    <div>
      <SectionTitle text="Favorites" />
      <ProductsGrid productList={favoriteList.map(({ product }) => product)} />
    </div>
  )
}

export default FavoritesPage
