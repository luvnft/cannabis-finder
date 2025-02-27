import type { Product, ProductsResponse } from '@/types/product'

const API_BASE_URL = 'https://api.extensive.live'

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

// Helper function to convert a product name to a URL-friendly slug
export function slugify(text: string): string {
  const germanCharMap: { [key: string]: string } = {
    ä: 'ae',
    ö: 'oe',
    ü: 'ue',
    ß: 'ss',
    Ä: 'Ae',
    Ö: 'Oe',
    Ü: 'Ue',
  }

  return text
    .toLowerCase()
    .replace(/[äöüßÄÖÜ]/g, match => {
      return germanCharMap[match] ?? match
    })
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
