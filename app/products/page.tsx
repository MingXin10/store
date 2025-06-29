import ProductsContainer from '@/components/products/ProductsContainer'

interface ProductsPageProps {
  searchParams: Promise<{
    layout?: string
    search?: string
  }>
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { layout = 'grid', search = '' } = await searchParams

  return (
    <>
      <ProductsContainer layout={layout} search={search} />
    </>
  )
}

export default ProductsPage
