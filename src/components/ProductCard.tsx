import Link from 'next/link'
import React from 'react'

import { cleanString, convertPrice } from '@lib/formatter'
import type { Product } from '@lib/types'

interface iProps {
  product: Product
}

export default function ProductCard({ product }: iProps) {
  return (
    <Link href={`/${cleanString(product.category)}/${product.id}`}>
      <a className="h-64 w-72 rounded-lg border border-gray-100 p-4 pb-16 shadow-md hover:cursor-pointer">
        <img
          className="aspect-square h-full w-full"
          src={product.image}
          alt={product.title}
        />
        <div className="flex items-center justify-between space-x-4 font-semibold text-gray-900">
          <h1 className="truncate">{product.title}</h1>
          <p>{convertPrice(product.price)}</p>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <p className="text-gray-700">{product.rating.rate}/5</p>
        </div>
      </a>
    </Link>
  )
}
