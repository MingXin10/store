import { LuAlignLeft } from 'react-icons/lu'
import Link from 'next/link'

import { Button } from '../ui/button'
import { LINK_LIST } from './constants'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const LinksDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="flex gap-4 max-w-[100px]" variant="outline">
        <LuAlignLeft className="w-6 h-6" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="w-40" sideOffset={10}>
      {LINK_LIST.map(({ href, label }) => (
        <DropdownMenuItem key={label}>
          <Link className="capitalize w-full" href={href}>
            {label}
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)

export default LinksDropdown
