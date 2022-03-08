import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import type { Product } from '@lib/types'

import { Container, MaxWrapper, Title } from '@components/common'
import ProductCard from '@components/ProductCard'
import Meta from '@components/Meta'

interface iProps {
  products: Product[]
  category: string
}

function Category({ products, category }: iProps) {
  return (
    <Container>
      <Meta category={category} description={`All kinds of ${category}`} />
      <MaxWrapper>
        <Title>{category}</Title>
        <div className="flex flex-wrap gap-4 pb-6">
          {products.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </div>
      </MaxWrapper>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${params?.category}`
  )
  const products = await response.json()

  return {
    props: { products, category: params?.category },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories')
  const categories = await response.json()

  const paths = categories.map((category: string) => ({
    params: {
      category,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default Category
