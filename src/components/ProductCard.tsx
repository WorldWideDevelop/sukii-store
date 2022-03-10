import Link from 'next/link'
import React from 'react'

import { convertPrice } from '@lib/formatter'
import type { Product } from '@lib/types'
import Image from 'next/image'

interface iProps {
  product: Product
}

export default function ProductCard({ product }: iProps) {
  return (
    <Link href={`/${product.category}/${product.id}`}>
      <a className="h-56 w-60 transform rounded-lg border border-gray-100 p-4 shadow-md duration-200 hover:scale-95 hover:cursor-pointer lg:h-[360px] lg:w-72">
        <div className="mb-4 flex items-center justify-center">
          <div className="h-32 w-28 lg:h-64 lg:w-52">
            <Image
              className="aspect-auto"
              src={product.image}
              alt={product.title}
              height={381}
              width={321}
              layout="responsive"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between space-x-4 text-sm font-semibold text-gray-900 lg:text-base">
            <h1 className="truncate ">{product.title}</h1>
            <p>{convertPrice(product.price)}</p>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <p className="text-sm text-gray-900 lg:text-base">
              {product.rating.rate}/5{' '}
              <span className="text-sm text-gray-700">
                ({product.rating.count})
              </span>
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}
