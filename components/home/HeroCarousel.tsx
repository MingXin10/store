import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/Card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/Carousel1'
import hero1 from '@/public/images/hero1.jpg'
import hero2 from '@/public/images/hero2.jpg'
import hero3 from '@/public/images/hero3.jpg'
import hero4 from '@/public/images/hero4.jpg'

const carouselImageList = [hero1, hero2, hero3, hero4]

const HeroCarousel = () => (
  <div className="hidden lg:block">
    <Carousel>
      <CarouselContent>
        {carouselImageList.map((imagePath, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="p-2">
                <Image
                  alt="hero"
                  className="w-full h-[24rem] rounded-md object-cover"
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
