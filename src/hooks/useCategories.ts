import { fetcher } from '@lib/fetcher'
import useSWR from 'swr'

export const useCategories = () => {
  const { data, error } = useSWR(
    'https://fakestoreapi.com/products/categories',
    fetcher
  )

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
