import Link from 'next/link'

interface ProductInfoColumnProps {
  name: string
  company: string
  productId: string
}

const ProductInfoColumn = ({
  name,
  company,
  productId
}: ProductInfoColumnProps) => (
  <div className=" sm:w-48">
    <Link href={`/products/${productId}`}>
      <h3 className="font-medium hover:underline">{name}</h3>
    </Link>
    <h4 className="mt-2 text-xs">{company}</h4>
  </div>
)

export default ProductInfoColumn
