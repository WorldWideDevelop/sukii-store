import React, { ReactNode } from 'react'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('./navbar/Navbar'))

interface IProps {
  children: ReactNode
}

function Layout({ children }: IProps) {
  return (
    <main className="min-h-screen">
      <Navbar />
      {children}
    </main>
  )
}

export default Layout
