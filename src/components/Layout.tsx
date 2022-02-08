import React, { ReactNode } from 'react'
import Navbar from './navbar/Navbar'

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
