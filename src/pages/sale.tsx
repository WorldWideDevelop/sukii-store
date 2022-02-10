import { GetStaticProps } from 'next'
import type { Product } from '@lib/types'

interface iProps {
  products: Product[]
}

export default function Home({ products }: iProps) {
  console.log({ products })
  return (
    <div>
      <h1>SALE</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch('https://fakestoreapi.com/products')
  const products = await response.json()

  return {
    props: {
      products,
    },
  }
}
