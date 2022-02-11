import React from 'react'
import { GetStaticProps } from 'next'

import type { Product } from '@lib/types'

import ProductCard from '@components/ProductCard'
import CategoryProduct from '@components/CategoryProduct'
import HeroSwiper from '@components/HeroSwiper'
import { Container } from '@components/common'

type CatProduct<T> = {
  [K in keyof T]: Product[]
}

type CategoriesWithProduct<T> = {
  products: CatProduct<T>
}

export default function Home<T>({ products }: CategoriesWithProduct<T>) {
  return (
    <Container>
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
    </Container>
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
