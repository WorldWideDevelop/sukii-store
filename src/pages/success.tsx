import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import tw from 'tailwind-styled-components'

import { Container, MaxWrapper } from '@components/common'
import { fetcher } from '@lib/fetcher'

export default function Success() {
  const {
    query: { session_id },
    push,
  } = useRouter()

  const { data, error } = useSWR(
    session_id ? `/api/checkout_sessions/${session_id}` : null,
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!session_id) push('/')
  console.log({ data })
  console.log({ error })
  return (
    <Container>
      <MaxWrapper>
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
        <h3>CheckoutSession response:</h3>
        {/* <PrintObject content={data ?? 'loading...'} />
        <Cart>
          <ClearCart />
        </Cart> */}
      </MaxWrapper>
    </Container>
  )
}
