'use client'

import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'
import { toast } from 'sonner'

const SignOutLink = () => {
  const handleLogout = () => {
    toast('Logging Out...')
  }

  return (
    <SignOutButton>
      <Link className="w-full text-left" href="/" onClick={handleLogout}>
        Logout
      </Link>
    </SignOutButton>
  )
}

export default SignOutLink
