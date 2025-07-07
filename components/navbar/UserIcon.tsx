import { LuUserRound } from 'react-icons/lu'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'

const UserIcon = async () => {
  const user = await currentUser()

  const profileImage = user?.imageUrl

  if (profileImage) {
    return (
      <Image
        alt="profile-image"
        className="w-6 h-6 rounded-full object-cover"
        height={50}
        src={profileImage}
        width={50}
      />
    )
  }

  return <LuUserRound className="w-6 h-6 bg-primary rounded-full text-white" />
}

export default UserIcon
