'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import { Input } from '@/components/ui/Input'

const NavSearch = () => {
  const searchParams = useSearchParams()

  const { replace } = useRouter()

  const [searchTerm, setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  )

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }

    replace(`/products?${params.toString()}`)
  }, 300)

  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearch('')
    }
  }, [searchParams.get('search')])

  return (
    <Input
      className="max-w-xs dark:bg-muted "
      placeholder="Search Products..."
      type="search"
      value={searchTerm}
      onChange={(e) => {
        setSearch(e.target.value)
        handleSearch(e.target.value)
      }}
    />
  )
}

export default NavSearch
