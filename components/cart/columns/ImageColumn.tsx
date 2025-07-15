import Image from 'next/image'

interface ImageColumnProps {
  imageUrl: string
  name: string
}

const ImageColumn = ({ name, imageUrl }: ImageColumnProps) => (
  <div className="relative h-24 w-24 sm:h-32 sm:w-32">
    <Image
      alt={name}
      className="w-full rounded-md object-cover"
      fill
      priority
      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
      src={imageUrl}
    />
  </div>
)

export default ImageColumn
