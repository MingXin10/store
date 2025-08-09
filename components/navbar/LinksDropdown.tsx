import { LuAlignLeft } from 'react-icons/lu'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
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

const LinksDropdown = () => {
  const { userId } = auth()

  const isAdmin = userId === process.env.ADMIN_USER_ID

  return (
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
            <Link className="w-full" href="/about">
              <button className="w-full text-left">關於我們</button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="w-full" href="/products">
              <button className="w-full text-left">商品一覽</button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left">登入</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left">註冊</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {LINK_LIST.map(({ href, label }) => {
            if (label === '後臺管理' && !isAdmin) return null

            return (
              <DropdownMenuItem key={label}>
                <Link className="w-full" href={href}>
                  {label}
                </Link>
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown
