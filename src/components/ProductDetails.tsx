import React from 'react'
import Image from 'next/image'

import { convertPrice } from '@lib/formatter'
import type { Product } from '@lib/types'
import { Title } from './common'

interface IProps {
  product: Product
}

export default function ProductDetails({ product }: IProps) {
  return (
    <div className="mb-20 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-4">
      <div className="flex items-center justify-center">
        <Image
          className="aspect-square"
          src={product.image}
          alt={product.title}
          height={454}
          width={414}
        />
      </div>
      <div className="space-y-4">
        <Title>{product.title}</Title>
        <p>{product.description}</p>
        <div className="flex items-center justify-between space-x-2">
          <h3 className="text-lg font-semibold">
            {convertPrice(product.price)}
          </h3>
          <button className="rounded-lg bg-secondary px-4 py-2 font-semibold text-white hover:bg-opacity-70">
            ADD TO CART
          </button>
        </div>
        <p className="text-gray-700">
          {product.rating.rate}/5{' '}
          <span className="text-sm text-gray-500">
            ({product.rating.count} reviews)
          </span>
        </p>
      </div>
    </div>
  )
}
