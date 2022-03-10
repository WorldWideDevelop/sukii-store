import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

import CategoryProduct from '@components/CategoryProduct'
import { Container, MaxWrapper } from '@components/common'
import Meta from '@components/Meta'

const ProductCard = dynamic(() => import('@components/ProductCard'))
const ProductDetails = dynamic(() => import('@components/ProductDetails'))

import type { Product } from '@lib/types'

interface IProps {
  product: Product
  filterProd: Product[]
  category: string
}

export default function SingleProduct({ product, filterProd }: IProps) {
  return (
    <Container>
      <Meta
        title={product.title}
        description={product.description}
        category={product.category}
        productId={`${product.id}`}
      />
      <MaxWrapper>
        <ProductDetails product={product} />
        <CategoryProduct category="YOU MIGHT ALSO LIKE">
          {filterProd.map((product: Product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </CategoryProduct>
      </MaxWrapper>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context

  const [product, productsInCategory] = await Promise.all([
    await (
      await fetch(`https://fakestoreapi.com/products/${params?.product}`)
    ).json(),
    await (
      await fetch(
        `https://fakestoreapi.com/products/category/${params?.category}`
      )
    ).json(),
  ])

  const filterProd = productsInCategory.filter(
    (d: Product) => d.id !== product.id
  )

  return {
    props: { product, filterProd },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://fakestoreapi.com/products')
  const products = await response.json()

  const paths = products.map((product: Product) => ({
    params: { category: product.category, product: `${product.id}` },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
