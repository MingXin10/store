'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/Button'

const COMMENT_LIMIT = 130

interface CommentProps {
  comment: string
}

const Comment = ({ comment }: CommentProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isLongComment = comment.length > COMMENT_LIMIT

  const visibleText =
    isLongComment && !isExpanded
      ? `${comment.slice(0, COMMENT_LIMIT)}...`
      : comment

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
          {isExpanded ? '顯示較少' : '顯示更多'}
        </Button>
      )}
    </div>
  )
}

export default Comment
