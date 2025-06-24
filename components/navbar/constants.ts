type NavLink = {
  href: string
  label: string
}

export const LINK_LIST: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/cart', label: 'cart' },
  { href: '/favorites', label: 'favorites' },
  { href: '/orders', label: 'orders' },
  { href: '/products', label: 'products' }
]
