import React from 'react'
import { GetStaticProps } from 'next'

import type { Product } from '@lib/types'

import ProductCard from '@components/ProductCard'
import CategoryProduct from '@components/CategoryProduct'
import HeroSwiper from '@components/HeroSwiper'

type CatProduct<T> = {
  [K in keyof T]: Product[]
}

type CategoriesWithProduct<T> = {
  products: CatProduct<T>
}

export default function Home<T>({ products }: CategoriesWithProduct<T>) {
  return (
    <section className="mt-8 px-4 lg:px-8">
      <HeroSwiper />
      <div className="mt-8">
        {Object.keys(products)
          .sort()
          .reverse()
          .map((category) => (
            <CategoryProduct key={category} category={category}>
              {products[category].map((product: Product) => (
                <ProductCard key={product.title} product={product} />
              ))}
            </CategoryProduct>
          ))}
      </div>
    </section>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch('https://fakestoreapi.com/products')
  const products = await response.json()

  const newProd = products.reduce((r: any, a: Product) => {
    r[a.category] = r[a.category] || []
    r[a.category].push(a)
    return r
  }, {})

  return {
    props: {
      products: newProd,
    },
  }
}
