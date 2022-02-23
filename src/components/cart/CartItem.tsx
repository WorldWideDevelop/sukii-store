import React from 'react'

import { useAppDispatch } from '@store-redux/hook'
import { convertPrice } from '@lib/formatter'
import type { ProductCart } from '@lib/types'
import { addToCart, removeItem } from './store/cartSlice'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

interface IProps {
  product: ProductCart
}

export default function CartItem({ product }: IProps) {
  const dispatch = useAppDispatch()
  return (
    <article className="-ml-8 grid grid-cols-2 md:-ml-5">
      <div className="flex items-center space-x-2 lg:space-x-4">
        <div className="h-10 w-10">
          <img
            className="hidden aspect-square h-full w-full sm:block"
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
        <div className="flex items-center justify-center space-x-1 md:space-x-2">
          <button
            onClick={() => dispatch(removeItem(product))}
            className="group p-2"
          >
            <ChevronLeftIcon className="h-4 w-4 transform duration-200 group-hover:-translate-x-1" />
          </button>
          <span className="font-semibold text-primary">{product.qty}</span>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="group p-2"
          >
            <ChevronRightIcon className="h-4 w-4 transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <p>{convertPrice(product.price)}</p>
        </div>
      </div>
    </article>
  )
}
