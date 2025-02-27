"use client"

import { useProducts } from "@/hooks/useProducts"

import { ProductCard } from "@/components/products/ProductCard"

export function HomePage() {
  const { products, isLoading, error } = useProducts()

  if (isLoading) {
    return <div className="p-8 text-center">Loading products...</div>
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading products: {error}
      </div>
    )
  }

  // Check if products is actually an array
  if (!Array.isArray(products)) {
    console.error("Products is not an array:", products)
    return (
      <div className="p-8 text-center text-red-500">
        Error: Products data is not in the expected format.
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Products ({products.length})</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full p-8 text-center">No products found</div>
        )}
      </div>
    </div>
  )
}
