import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

import FavoriteToggleButton from './FavoriteToggleButton'

import { Card, CardContent } from '@/components/ui/Card'
import { formatCurrency } from '@/utils/formatCurrency'

interface ProductsGridProps {
  productList: Product[]
}

const ProductsGrid = ({ productList }: ProductsGridProps) => (
  <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {productList.map(({ name, price, imageUrl, id }) => {
      const dollarsAmount = formatCurrency(price)

      return (
        <article key={id} className="group relative">
          <Link href={`/products/${id}`}>
            <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
              <CardContent className="p-4">
                <div className="relative h-64 md:h-48 rounded overflow-hidden">
                  <Image
                    alt={name}
                    className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    fill
                    priority
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    src={imageUrl}
                  />
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-lg">{name}</h2>
                  <p className="text-muted-foreground mt-2">{dollarsAmount}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <div className="absolute top-7 right-7 z-5">
            <FavoriteToggleButton productId={id} />
          </div>
        </article>
      )
    })}
  </div>
)

export default ProductsGrid
