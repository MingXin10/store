'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ADMIN_LINKS } from '@/components/navbar/constants'
import { Button } from '@/components/ui/Button'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside>
      {ADMIN_LINKS.map(({ href, label }) => {
        const isActivePage = pathname === href

        const variant = isActivePage ? 'default' : 'ghost'

        return (
          <Button
            key={href}
            asChild
            className="w-full mb-2 font-normal justify-start"
            variant={variant}
          >
            <Link href={href}>{label}</Link>
          </Button>
        )
      })}
    </aside>
  )
}

export default Sidebar
