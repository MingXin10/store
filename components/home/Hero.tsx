import Link from 'next/link'

import HeroCarousel from './HeroCarousel'

import { Button } from '@/components/ui/Button'

const Hero = () => (
  <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
    <div>
      <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
        好家具，成就好生活
      </h1>
      <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
        從材質挑選到工藝細節，我們堅持只為你打造值得珍藏的家具。讓家不只是空間，更是充滿溫度與品味的生活場域。
      </p>
      <Button asChild className="mt-10" size="lg">
        <Link href="/products">所有商品</Link>
      </Button>
    </div>
    <HeroCarousel />
  </section>
)

export default Hero
