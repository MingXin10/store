import Link from 'next/link'

import HeroCarousel from './HeroCarousel'

import { Button } from '@/components/ui/Button'

const Hero = () => (
  <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
    <div>
      <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
        We are changing the way people shop
      </h1>
      <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
        Discover a new era of shopping with our innovative products designed to
        enhance your lifestyle. From cutting-edge technology to everyday
        essentials, we have something for everyone.
      </p>
      <Button asChild className="mt-10" size="lg">
        <Link href="/products">Our Products</Link>
      </Button>
    </div>
    <HeroCarousel />
  </section>
)

export default Hero
