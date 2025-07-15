import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

import FavoriteToggleButton from './FavoriteToggleButton'

import { Card, CardContent } from '@/components/ui/Card'
import { formatCurrency } from '@/utils/formatCurrency'

interface ProductsListProps {
  productList: Product[]
}

const ProductsList = ({ productList }: ProductsListProps) => (
  <div className="mt-12 grid gap-y-8">
    {productList.map(({ id, name, price, imageUrl, company }) => {
      const formattedPrice = formatCurrency(price)

      return (
        <article key={id} className="group relative">
          <Link href={`/products/${id}`}>
            <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
              <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                <div className="relative h-64  md:h-48 md:w-48">
                  <Image
                    alt={name}
                    className="w-full rounded-md object-cover"
                    fill
                    priority
                    sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                    src={imageUrl}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold capitalize">{name}</h2>
                  <h4 className="text-muted-foreground">{company}</h4>
                </div>
                <p className="text-muted-foreground text-lg md:ml-auto">
                  {formattedPrice}
                </p>
              </CardContent>
            </Card>
          </Link>
          <div className="absolute bottom-8 right-8 z-5">
            <FavoriteToggleButton productId={id} />
          </div>
        </article>
      )
    })}
  </div>
)

export default ProductsList
