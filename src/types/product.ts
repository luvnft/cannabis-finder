export interface Product {
  id: number
  productName: string
  thc: number
  cbd: number
  genetic: string
  ratingsScore?: number
  ratingsCount?: number
  imgUrl: string
  effect?: string[]
  medicalUsage?: string[]
  terpenes?: string[]
  taste?: string[]
  strain: string
  manufacturer: string
  productClass: string
  priority: number
  popular?: boolean
  minPrice: number
  maxPrice: number
  origin?: string
  description?: string
}

export interface ProductsResponse {
  data: Product[]
  total: number
  page: number
  limit: number
}
