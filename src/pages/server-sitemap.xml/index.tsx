import { GetServerSideProps } from 'next'
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'

import type { Product } from '@lib/types'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch('https://fakestoreapi.com/products')
  const products: Product[] = await response.json()

  const fields: ISitemapField[] = products.map((product) => ({
    loc: `https://sukiistore.vercel.app/${product.category}/${product.id}`,
    lastmod: new Date().toISOString(),
  }))

  return getServerSideSitemap(ctx, fields)
}

export default function SiteMap() {}
