import { type Product } from '@/types/product'

export type SortField = 'productName' | 'thc' | 'cbd' | 'priority' | 'minPrice'
export type SortOrder = 'asc' | 'desc'

export function sortProducts(
  products: Product[],
  field: SortField = 'priority',
  order: SortOrder = 'desc'
): Product[] {
  return [...products].sort((a, b) => {
    const valueA = a[field]
    const valueB = b[field]

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return order === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA)
    }

    if (order === 'asc') {
      return (valueA as number) - (valueB as number)
    } else {
      return (valueB as number) - (valueA as number)
    }
  })
}

export function filterProducts(
  products: Product[],
  filters: Partial<{
    strain: string
    minThc: number
    maxThc: number
    minCbd: number
    maxCbd: number
    searchTerm: string
  }>
): Product[] {
  return products.filter(product => {
    // Filter by strain
    if (filters.strain && product.strain !== filters.strain) {
      return false
    }

    // Filter by THC range
    if (
      filters.minThc !== undefined &&
      filters.maxThc !== undefined &&
      (product.thc < filters.minThc || product.thc > filters.maxThc)
    ) {
      return false
    }

    // Filter by CBD range
    if (
      filters.minCbd !== undefined &&
      filters.maxCbd !== undefined &&
      (product.cbd < filters.minCbd || product.cbd > filters.maxCbd)
    ) {
      return false
    }

    // Filter by search term (product name, manufacturer, etc.)
    if (
      filters.searchTerm &&
      !product.productName
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase()) &&
      !product.manufacturer
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })
}
