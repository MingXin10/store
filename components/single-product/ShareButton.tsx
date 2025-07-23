'use client'

import { LuShare2 } from 'react-icons/lu'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton
} from 'react-share'

import { Button } from '../ui/Button'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/Popover'
interface ShareButton {
  productId: string
  name: string
}

const ShareButton = ({ productId, name }: ShareButton) => {
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL

  const shareLink = `${websiteUrl}/products/${productId}`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="p-2" size="icon" variant="outline">
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex items-center gap-x-2 justify-center w-full"
        side="top"
        sideOffset={10}
      >
        <TwitterShareButton title={name} url={shareLink}>
          <TwitterIcon round size={32} />
        </TwitterShareButton>
        <LinkedinShareButton title={name} url={shareLink}>
          <LinkedinIcon round size={32} />
        </LinkedinShareButton>
        <FacebookShareButton title={name} url={shareLink}>
          <FacebookIcon round size={32} />
        </FacebookShareButton>
      </PopoverContent>
    </Popover>
  )
}

export default ShareButton
