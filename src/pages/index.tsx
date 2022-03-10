import React from 'react'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

import type { Product } from '@lib/types'

import { Container, MaxWrapper } from '@components/common'

const ProductCard = dynamic(() => import('@components/ProductCard'))
const HeroSwiper = dynamic(() => import('@components/HeroSwiper'))
const CategoryProduct = dynamic(() => import('@components/CategoryProduct'))
const Meta = dynamic(() => import('@components/Meta'))

type ProductsWithKeys = Record<string, Product[]>

type CategoriesWithProduct = {
  products: ProductsWithKeys
}

export default function Home({ products }: CategoriesWithProduct) {
  const renderProducts = React.useMemo(() => {
    return Object.keys(products)
      .sort()
      .reverse()
      .map((category) => (
        <CategoryProduct key={category} category={category}>
          {products[category].map((product: Product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </CategoryProduct>
      ))
  }, [products])

  return (
    <Container>
      <Meta />
      <MaxWrapper>
        <HeroSwiper />
        <div className="mt-8">{renderProducts}</div>
      </MaxWrapper>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch('https://fakestoreapi.com/products')
  const products = await response.json()

  const newProd = products.reduce((r: ProductsWithKeys, a: Product) => {
    r[a.category] = r[a.category] || []
    r[a.category].push(a)
    return r
  }, {} as ProductsWithKeys)

  return {
    props: {
      products: newProd,
    },
  }
}
