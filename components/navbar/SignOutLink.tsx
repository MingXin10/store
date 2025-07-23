import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'

const SignOutLink = () => (
  <SignOutButton>
    <Link className="w-full text-left" href="/">
      登出
    </Link>
  </SignOutButton>
)

export default SignOutLink
