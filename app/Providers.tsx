'use client'

import type { PropsWithChildren } from 'react'

import ThemeProvider from './ThemeProvider'

const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    disableTransitionOnChange
    enableSystem
  >
    {children}
  </ThemeProvider>
)

export default Providers
