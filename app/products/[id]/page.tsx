import Image from 'next/image'

import FavoriteToggleButton from '@/components/products/FavoriteToggleButton'
import AddToCart from '@/components/single-product/AddToCart'
import BreadCrumbs from '@/components/single-product/BreadCrumbs'
import ProductRating from '@/components/single-product/ProductRating'
import { fetchSingleProduct } from '@/utils/dbActions'
import { formatCurrency } from '@/utils/formatCurrency'

interface SingleProductPageProps {
  params: Promise<{ id: string }>
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  const { id } = await params

  const product = await fetchSingleProduct(id)

  const { name, image, company, description, price } = product

  const formattedPrice = formatCurrency(price)

  return (
    <section>
      <BreadCrumbs name={name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <div className="relative h-full">
          <Image
            alt={name}
            className="w-full rounded-md object-cover"
            fill
            priority
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            src={image}
          />
        </div>
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            <FavoriteToggleButton productId={id} />
          </div>
          <ProductRating productId={id} />
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            {formattedPrice}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToCart productId={id} />
        </div>
      </div>
    </section>
  )
}

export default SingleProductPage
