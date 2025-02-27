'use client'

import Link from 'next/link'

import { type Product } from '@/types/product'
import { slugify } from '@/utils/slugify'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  // Create a slug for the product URL
  const productSlug = slugify(product.productName)

  return (
    <Link href={`/product/${productSlug}`}>
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle className="truncate">{product.productName}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span>THC: {product.thc}%</span>
            <span>CBD: {product.cbd}%</span>
          </div>
          <div className="text-muted-foreground">{product.strain}</div>
        </CardContent>
      </Card>
    </Link>
  )
}
