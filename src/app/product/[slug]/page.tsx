import { Suspense } from "react"

import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProductDetail } from "@/components/products/ProductDetail"

import { fetchProductBySlug } from "@/lib/api/products"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const slug = resolvedParams.slug

    const product = await fetchProductBySlug(slug)

    return {
      title: `${product.productName} | Cannabis Finder`,
      description:
        product.description ??
        `Details about ${product.productName} cannabis product`,
    }
  } catch {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found",
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const resolvedParams = await params
    const slug = resolvedParams.slug

    // Check if the slug is valid
    if (!slug) {
      console.error("Invalid slug parameter")
      notFound()
      return null
    }

    // Fetch the product data on the server
    const product = await fetchProductBySlug(slug)

    // Verify product data is valid
    if (!product.id) {
      console.error("Retrieved product is invalid:", product)
      notFound()
      return null
    }

    return (
      <Suspense
        fallback={
          <div className="p-8 text-center">Loading product details...</div>
        }
      >
        <ProductDetail product={product} />
      </Suspense>
    )
  } catch (error) {
    const resolvedParams = await params
    console.error(
      `Failed to load product with slug ${resolvedParams.slug}:`,
      error
    )
    notFound()
    return null
  }
}
