import { GetServerSideProps } from 'next'
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'

import type { Product } from '@lib/types'

const siteUrl = 'https://sukiistore.vercel.app'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch('https://fakestoreapi.com/products')
  const products: Product[] = await response.json()

  const fields: ISitemapField[] = products.map((product) => ({
    loc: `${siteUrl}/${product.category}/${product.id}`,
    lastmod: new Date().toISOString(),
  }))

  return getServerSideSitemap(ctx, fields)
}

export default function SiteMap() {}
