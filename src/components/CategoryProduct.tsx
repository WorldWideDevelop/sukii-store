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
      <div className="grid grid-flow-col grid-rows-2 gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-100 md:grid-rows-1 lg:gap-10">
        {children}
      </div>
    </div>
  )
}
