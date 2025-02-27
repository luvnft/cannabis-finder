import { Suspense } from 'react'

import { queryClient } from '@/hooks/query'
import { dehydrate } from '@tanstack/react-query'

import { HomePage } from '@/components/HomePage'
import Providers from '@/components/providers/Providers'

import { fetchProducts } from '@/lib/api/products'

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
