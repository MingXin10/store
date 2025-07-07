import { LuAlignLeft } from 'react-icons/lu'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
import Link from 'next/link'

import { LINK_LIST } from './constants'
import SignOutLink from './SignOutLink'
import UserIcon from './UserIcon'

import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'

const LinksDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="flex gap-4 max-w-[100px]" variant="outline">
        <LuAlignLeft className="w-6 h-6" />
        <UserIcon />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="w-40" sideOffset={10}>
      <SignedOut>
        <DropdownMenuItem>
          <SignInButton mode="modal">
            <button className="w-full text-left">Login</button>
          </SignInButton>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignUpButton mode="modal">
            <button className="w-full text-left">Register</button>
          </SignUpButton>
        </DropdownMenuItem>
      </SignedOut>
      <SignedIn>
        {LINK_LIST.map(({ href, label }) => (
          <DropdownMenuItem key={label}>
            <Link className="capitalize w-full" href={href}>
              {label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutLink />
        </DropdownMenuItem>
      </SignedIn>
    </DropdownMenuContent>
  </DropdownMenu>
)

export default LinksDropdown
