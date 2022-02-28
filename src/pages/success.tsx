import React from 'react'
import useSWR from 'swr'
import { GetServerSideProps } from 'next'

import { Container, MaxWrapper } from '@components/common'
import { fetcher } from '@lib/fetcher'
import { CheckIcon } from '@heroicons/react/outline'
import { shootFireworks } from '@lib/fireworks'

export default function Success({
  session_id,
}: {
  session_id: string | string[] | undefined
}) {
  const { data, error } = useSWR(
    () => `/api/checkout_sessions/${session_id}`,
    fetcher
  )

  React.useEffect(() => {
    if (data?.statusCode !== 500 && data) {
      data && !error && shootFireworks()
    }
  }, [data])

  return (
    <Container>
      <MaxWrapper>
        {error || data?.statusCode === 500 ? (
          <div className="bg-rose-100 text-rose-500 mx-auto max-w-md rounded-md p-2">
            <p className="text-2xl font-semibold text-primary">
              Sorry, something went wrong!
            </p>
          </div>
        ) : !data ? (
          <div className="mx-auto max-w-md rounded-md bg-gray-100 p-2 text-gray-500">
            <p className="animate-pulse text-center text-xl">Loading...</p>
          </div>
        ) : (
          <div className="mx-auto max-w-lg rounded-md bg-gray-100 px-8 py-4">
            <h2 className="flex flex-col items-center space-x-1 text-4xl font-semibold">
              <CheckIcon className="text-green-600 h-12 w-12 flex-shrink-0" />
              <span>Thanks for your order!</span>
            </h2>
            <p className="mt-3 text-center text-lg">
              Check your inbox for the receipt.
            </p>
          </div>
        )}
      </MaxWrapper>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const sessionId = query.session_id as string

  if (!sessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session_id: sessionId,
    },
  }
}
