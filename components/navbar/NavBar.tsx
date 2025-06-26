import CartButton from './CartButton'
import LinksDropdown from './LinksDropdown'
import Logo from './Logo'
import NavSearch from './NavSearch'
import ThemeMode from './ThemeMode'

import Container from '@/components/global/Container'

const Navbar = () => (
  <div className="border-b">
    <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
      <Logo />
      <NavSearch />
      <div className="flex items-center gap-4">
        <CartButton />
        <ThemeMode />
        <LinksDropdown />
      </div>
    </Container>
  </div>
)

export default Navbar
