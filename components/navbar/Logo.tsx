import { IoHome } from 'react-icons/io5'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'

const Logo = () => (
  <Button asChild size="icon">
    <Link href="/">
      <IoHome className="w-6 h-6" />
    </Link>
  </Button>
)

export default Logo
