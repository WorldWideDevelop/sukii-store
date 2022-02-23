import React from 'react'

import { useAppDispatch } from '@store-redux/hook'
import { convertPrice } from '@lib/formatter'
import type { Product } from '@lib/types'
import { removeItem } from './store/cartSlice'

interface IProps {
  product: Product
}

export default function CartItem({ product }: IProps) {
  const dispatch = useAppDispatch()
  return (
    <article className="-ml-5 grid grid-cols-2">
      <div className="flex items-center space-x-2 lg:space-x-4">
        <div className="h-20 w-20">
          <img
            className="aspect-square h-full w-full"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="max-w-xs">
          <h1 className="text-left text-sm font-semibold">{product.title}</h1>
          <p className="truncate text-left text-xs lg:text-sm">
            {product.category}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 space-x-2">
        <div className="-mt-3 flex flex-col items-center justify-center space-y-2">
          <input type="text" className="w-16 rounded-lg text-xs lg:text-sm" />
          <button
            onClick={() => dispatch(removeItem(product))}
            className="text-xs text-secondary"
          >
            Remove
          </button>
        </div>
        <p>{convertPrice(product.price)}</p>
      </div>
    </article>
  )
}
