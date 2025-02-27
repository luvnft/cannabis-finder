'use client'

import { useEffect } from 'react'

import { fetchProducts } from '@/api/products'
import { useProductsStore } from '@/store/products'
import { useQuery } from '@tanstack/react-query'

export const useProducts = () => {
  const {
    products,
    setProducts,
    isLoading: storeLoading,
    setIsLoading,
    error: storeError,
    setError,
  } = useProductsStore()

  // Use TanStack Query to fetch products
  const {
    data,
    isLoading: queryLoading,
    error: queryError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
    select: data => {
      return data
    },
  })

  // Sync query state with Zustand store
  useEffect(() => {
    if (data) {
      // Handle both direct data and data.data structure
      const productsArray = Array.isArray(data) ? data : data.data
      if (Array.isArray(productsArray)) {
        setProducts(productsArray)
      } else {
        console.error('Products data is not an array:', data)
        setError('Invalid data format received')
      }
    }
    setIsLoading(queryLoading)
    setError(queryError ? String(queryError) : null)
  }, [data, queryLoading, queryError, setProducts, setIsLoading, setError])

  return {
    products,
    isLoading: storeLoading,
    error: storeError,
  }
}
