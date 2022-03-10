import React from 'react'
import Image from 'next/image'

import { convertPrice } from '@lib/formatter'
import type { Product } from '@lib/types'
import { useAppDispatch } from '@store-redux/hook'

import { Title } from './common'
import { addToCart } from './cart/store/cartSlice'

interface IProps {
  product: Product
}

export default function ProductDetails({ product }: IProps) {
  const dispatch = useAppDispatch()
  return (
    <div className="mb-20 grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-4">
      <div className="flex items-center justify-center">
        <div className="h-[360px] w-[288px] lg:h-[454px] lg:w-[414px]">
          <Image
            className="aspect-auto"
            src={product.image}
            alt={product.title}
            height={454}
            width={414}
            layout="responsive"
          />
        </div>
      </div>
      <div className="space-y-4">
        <Title>{product.title}</Title>
        <p>{product.description}</p>
        <div className="flex items-center justify-between space-x-2">
          <h3 className="text-lg font-semibold">
            {convertPrice(product.price)}
          </h3>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-70 lg:text-base"
          >
            ADD TO CART
          </button>
        </div>
        <p className="text-gray-900">
          {product.rating.rate}/5{' '}
          <span className="text-sm text-gray-700">
            ({product.rating.count} reviews)
          </span>
        </p>
      </div>
    </div>
  )
}
