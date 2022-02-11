import Link from 'next/link'
import React from 'react'

import { cleanString, convertPrice } from '@lib/formatter'
import type { Product } from '@lib/types'
import Image from 'next/image'

interface iProps {
  product: Product
}

export default function ProductCard({ product }: iProps) {
  return (
    <Link href={`/${cleanString(product.category)}/${product.id}`}>
      <a className="w-72 transform rounded-lg border border-gray-100 p-4 shadow-md duration-200 hover:scale-95 hover:cursor-pointer">
        <div className="mb-4 flex items-center justify-center">
          <Image
            className="mx-auto aspect-square"
            src={product.image}
            alt={product.title}
            height={254}
            width={214}
          />
        </div>
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
