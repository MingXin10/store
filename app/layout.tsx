import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Providers from './Providers'

import './globals.css'
import Container from '@/components/global/Container'
import Navbar from '@/components/navbar/NavBar'

const INTER = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Palette Living',
  description: '讓每一件家具，成為你生活中的美好片段與記憶。'
}

const RootLayout = ({
  children
}: Readonly<{
  children: ReactNode
}>) => (
  <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={INTER.className}>
        <Providers>
          <Navbar />
          <Container className="py-20">{children}</Container>
        </Providers>
      </body>
    </html>
  </ClerkProvider>
)

export default RootLayout
