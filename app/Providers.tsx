'use client'

import type { PropsWithChildren } from 'react'

import ThemeProvider from './ThemeProvider'

import { Toaster } from '@/components/ui/Sonner'

const Providers = ({ children }: PropsWithChildren) => (
  <>
    <Toaster />
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      {children}
    </ThemeProvider>
  </>
)

export default Providers
