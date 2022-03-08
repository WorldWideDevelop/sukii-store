import Head from 'next/head'
import React from 'react'

const siteUrl = 'https://sukiistore.vercel.app'

interface IMetaProps {
  title?: string
  description?: string
  category?: string
  productId?: string
}

export default function Meta({
  title,
  description = 'Ecommerce Store',
  category = '',
  productId,
}: IMetaProps) {
  const url = category
    ? productId
      ? `${siteUrl}/${category}/${productId}`
      : `${siteUrl}/${category}`
    : siteUrl

  const siteTitle = category
    ? title
      ? `Sukii Store | ${
          category.charAt(0).toUpperCase() + category.slice(1)
        } | ${title}`
      : `Sukii Store | ${category.charAt(0).toUpperCase() + category.slice(1)}`
    : `Sukii Store`

  return (
    <>
      <Head>
        <title>{siteTitle}</title>

        <meta name="title" content={siteTitle} />
        <meta property="og:title" content={title} />
        <meta property="twitter:title" content={title} />

        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="twitter:description" content={description} />

        <meta property="og:url" content={url} />
        <meta property="twitter:url" content={url} />

        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
    </>
  )
}
