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

  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {totalProductCounts} product{totalProductCounts > 1 && 's'}
          </h4>
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
      <div>
        {totalProductCounts === 0 ? (
          <h5 className="text-2xl mt-16">「抱歉，沒有符合您搜尋的商品…」</h5>
        ) : layout === 'grid' ? (
          <ProductsGrid productList={productList} />
        ) : (
          <ProductsList productList={productList} />
        )}
      </div>
    </>
  )
}

export default ProductsContainer
