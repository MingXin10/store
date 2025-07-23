import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/Card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/Carousel'
import hero1 from '@/public/images/hero1.jpg'
import hero2 from '@/public/images/hero2.jpg'
import hero3 from '@/public/images/hero3.jpg'
import hero4 from '@/public/images/hero4.jpg'

const CAROUSEL_IMAGE_LIST = [hero1, hero2, hero3, hero4]

const HeroCarousel = () => (
  <div className="hidden lg:block">
    <Carousel>
      <CarouselContent>
        {CAROUSEL_IMAGE_LIST.map((imagePath, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="p-2">
                <Image
                  alt="hero"
                  className="w-full h-[24rem] rounded-md object-cover"
                  priority={index === 0}
                  src={imagePath}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
)

export default HeroCarousel
