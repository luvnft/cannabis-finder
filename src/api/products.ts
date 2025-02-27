import type { Product, ProductsResponse } from '@/types/product'
import { slugify } from '@/utils/slugify'

import { API_BASE_URL } from './consts'

export async function fetchProducts(
  params?: URLSearchParams
): Promise<ProductsResponse> {
  const defaultParams = new URLSearchParams({
    page: '1',
    limit: '2000',
  })

  const finalParams = params
    ? new URLSearchParams([...defaultParams, ...params])
    : defaultParams

  const response = await fetch(
    `${API_BASE_URL}/product?${finalParams.toString()}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  try {
    // Convert slug to product name (e.g., "blue-dream" to "Blue Dream")
    const productName = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    // Search for the product by name
    const response = await fetch(
      `${API_BASE_URL}/product?search=${encodeURIComponent(productName)}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`)
      throw new Error(`Failed to fetch product: ${response.statusText}`)
    }

    const data = await response.json()

    // Find the product that most closely matches the requested slug
    // First, try exact slug match
    let product = data.data?.find((p: Product) => {
      const productSlug = slugify(p.productName)
      return productSlug === slug
    })

    // If no exact match found, try the first product from search results
    if (!product && data.data && data.data.length > 0) {
      product = data.data[0]
    }

    if (!product) {
      console.error(
        `No matching product found for: "${productName}" (slug: ${slug})`
      )
      console.error(`Search returned ${data.data?.length || 0} results`)
      throw new Error(`Product not found: ${productName}`)
    }

    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}
