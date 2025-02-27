"use client"

import { type Product } from "@/types/product"
import { create } from "zustand"

interface ProductsState {
  products: Product[]
  setProducts: (products: Product[]) => void
  filteredProducts: Product[]
  setFilteredProducts: (products: Product[]) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  filteredProducts: [],
  setFilteredProducts: (filteredProducts) => set({ filteredProducts }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  error: null,
  setError: (error) => set({ error }),
}))
