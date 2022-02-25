import { useRouter } from 'next/router'
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
    data && data.statusCode !== 500 && shootFireworks()
  }, [data])

  return (
    <Container>
      <MaxWrapper>
        {error || data.statusCode === 500 ? (
          <div className="max-w-md p-2 mx-auto rounded-md bg-rose-100 text-rose-500">
            <p className="text-2xl font-semibold text-primary">
              Sorry, something went wrong!
            </p>
          </div>
        ) : !data ? (
          <div className="max-w-md p-2 mx-auto text-gray-500 bg-gray-100 rounded-md">
            <p className="text-xl animate-pulse">Loading...</p>
          </div>
        ) : (
          <div className="max-w-lg px-8 py-4 mx-auto bg-gray-100 rounded-md">
            <h2 className="flex flex-col items-center space-x-1 text-4xl font-semibold">
              <CheckIcon className="flex-shrink-0 w-12 h-12 text-green-600" />
              <span>Thanks for your order!</span>
            </h2>
            <p className="mt-3 text-lg text-center">
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
    }, // will be passed to the page component as props
  }
}
