import SectionTitle from '@/components/global/SectionTitle'
import ProductsGrid from '@/components/products/ProductsGrid'
import { fetchUserFavoriteList } from '@/utils/dbActions'

const FavoritesPage = async () => {
  const favoriteList = await fetchUserFavoriteList()

  if (favoriteList.length === 0) {
    return <SectionTitle text="尚未有加入追蹤的商品" />
  }

  const productList = favoriteList.map(({ product }) => product)

  return (
    <>
      <SectionTitle text="追蹤清單" />
      <ProductsGrid productList={productList} />
    </>
  )
}

export default FavoritesPage
