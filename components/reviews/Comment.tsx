'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/Button'

interface CommentProps {
  comment: string
}

const Comment = ({ comment }: CommentProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isLongComment = comment.length > 130

  const visibleText =
    isLongComment && !isExpanded ? `${comment.slice(0, 130)}...` : comment

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div>
      <p className="text-sm">{visibleText}</p>
      {isLongComment && (
        <Button
          className="pl-0 text-muted-foreground"
          variant="link"
          onClick={toggleExpanded}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </div>
  )
}

export default Comment
