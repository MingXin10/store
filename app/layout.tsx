import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Providers from './Providers'

import './globals.css'
import Container from '@/components/global/Container'
import Navbar from '@/components/navbar/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Store app',
  description: "Joey's Store"
}

const RootLayout = ({
  children
}: Readonly<{
  children: ReactNode
}>) => (
  <html lang="en" suppressHydrationWarning>
    <body className={inter.className}>
      <Providers>
        <Navbar />
        <Container className="py-20">{children}</Container>
      </Providers>
    </body>
  </html>
)

export default RootLayout
