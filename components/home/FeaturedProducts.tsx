import EmptyList from '@/components/global/EmptyList'
import SectionTitle from '@/components/global/SectionTitle'
import ProductsGrid from '@/components/products/ProductsGrid'
import { fetchFeaturedProducts } from '@/utils/dbActions'

const FeaturedProducts = async () => {
  const productList = await fetchFeaturedProducts()

  if (productList.length === 0) return <EmptyList />

  return (
    <section className="pt-24">
      <SectionTitle text="featured products" />
      <ProductsGrid productList={productList} />
    </section>
  )
}

export default FeaturedProducts
