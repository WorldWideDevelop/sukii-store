import React from 'react'
import { GetStaticProps } from 'next'

import type { Product } from '@lib/types'

import ProductCard from '@components/ProductCard'
import CategoryProduct from '@components/CategoryProduct'
import HeroSwiper from '@components/HeroSwiper'
import { Container, MaxWrapper } from '@components/common'

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
