import { Suspense } from 'react'

import { fetchProducts } from '@/api/products'
import { queryClient } from '@/hooks/query'
import { dehydrate } from '@tanstack/react-query'

import { HomePage } from '@/components/pages/HomePage'
import Providers from '@/components/providers/Providers'

export default async function Home() {
  // Prefetch products on the server
  const productsData = await fetchProducts()

  // Prefetch and cache the data with TanStack Query
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => Promise.resolve(productsData),
  })

  // Dehydrate the cache for passing to the client
  const dehydratedState = dehydrate(queryClient)

  return (
    <Providers dehydratedState={dehydratedState}>
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <HomePage />
      </Suspense>
    </Providers>
  )
}
