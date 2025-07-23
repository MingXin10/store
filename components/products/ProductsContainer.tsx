import { LuLayoutGrid, LuList } from 'react-icons/lu'
import Link from 'next/link'

import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'

import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { fetchAllProducts } from '@/utils/dbActions'

interface SearchParamProps {
  layout?: string
  search?: string
}

const ProductsContainer = async ({ layout, search = '' }: SearchParamProps) => {
  const productList = await fetchAllProducts({ search })

  const totalProductCounts = productList.length

  const searchTerm = search ? `&search=${search}` : ''

  const renderContent = () => {
    if (totalProductCounts === 0) {
      return <h5 className="text-2xl mt-16">抱歉，沒有符合您搜尋的商品…</h5>
    }

    return layout === 'grid' ? (
      <ProductsGrid productList={productList} />
    ) : (
      <ProductsList productList={productList} />
    )
  }

  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">商品列表</h4>
          <div className="flex gap-x-4">
            <Button
              asChild
              size="icon"
              variant={layout === 'grid' ? 'default' : 'ghost'}
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              asChild
              size="icon"
              variant={layout === 'list' ? 'default' : 'ghost'}
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      <div>{renderContent()}</div>
    </>
  )
}

export default ProductsContainer
