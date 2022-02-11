import React, { ReactNode } from 'react'
import { Title } from './common'

interface iProps {
  category: string
  children: ReactNode
}

export default function CategoryProduct({ category, children }: iProps) {
  return (
    <div className="p-b2 my-8">
      <Title>{category}</Title>
      <div className="flex items-center gap-10 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-100">
        {children}
      </div>
    </div>
  )
}
