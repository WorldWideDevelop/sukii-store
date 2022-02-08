import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import { SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline'

export default function SuperHeader() {
  return (
    <section className="text-whity-secondary hidden bg-gray-900 px-4 lg:block lg:px-8 lg:py-3">
      <div className=" mx-auto flex w-full max-w-7xl items-center justify-between text-gray-300">
        <h1 className="text-sm ">Free shipping on domestic orders over $75!</h1>
        <div className="flex items-center space-x-6 text-xs">
          <div className="-mt-1 flex items-center border-b">
            <label htmlFor="search">
              <SearchIcon className="h-3 w-3" />
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search..."
              className="border-none bg-gray-900 text-xs focus:outline-none focus:ring-0"
            />
            <VisuallyHidden>Search</VisuallyHidden>
          </div>
          <button>Help</button>
          <button>
            <ShoppingBagIcon className="h-4 w-4" />
            <VisuallyHidden>Cart</VisuallyHidden>
          </button>
        </div>
      </div>
    </section>
  )
}
