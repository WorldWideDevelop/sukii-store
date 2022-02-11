import { GetStaticProps } from 'next'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'

import type { Product } from '@lib/types'
import { cleanString, convertPrice } from '@lib/formatter'
import Link from 'next/link'
import ProductCard from '@components/ProductCard'
import CategoryProduct from '@components/CategoryProduct'

interface iProps<T> {
  products: T
}

type CatProduct<T> = {
  [K in keyof T]: Product[]
}

type CategoriesWithProduct<T> = {
  products: CatProduct<T>
}

export default function Home<T>({ products }: CategoriesWithProduct<T>) {
  return (
    <section className="mt-8 px-4 lg:px-8">
      <div className="h-72">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="rounded-lg shadow-lg"
        >
          <SwiperSlide>
            <img src="/women_swiper.jpg" alt="cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/men_swiper.jpg" alt="cover" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="mt-8">
        {Object.keys(products)
          .sort()
          .reverse()
          .map((category) => (
            <CategoryProduct category={category}>
              {products[category].map((product: Product) => (
                <ProductCard product={product} />
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
