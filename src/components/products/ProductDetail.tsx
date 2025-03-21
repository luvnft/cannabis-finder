'use client'

import Image from 'next/image'
import Link from 'next/link'

import { API_BASE_URL } from '@/api/consts'
import { type Product } from '@/types/product'
import { ArrowLeft } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ProductDetailProps {
  product: 🪴 Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="container mx-auto py-8">
      <Link
        href="https://products.weedw3w.com"
        className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm"
      >
        <ArrowLeft size={16} />
        Back to Products
      </Link>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-2xl">{product.productName}</CardTitle>
          <CardDescription>
            {product.manufacturer} | {product.strain}
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 p-6 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Image
              src={`${API_BASE_URL}${product.imgUrl}`}
              alt={product.productName}
              width={200}
              height={200}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <h3 className="font-semibold">Details</h3>
              <div className="bg-muted/50 grid grid-cols-2 gap-2 rounded-lg p-3">
                <div className="text-muted-foreground text-sm">THC</div>
                <div className="text-sm font-medium">{product.thc}%</div>

                <div className="text-muted-foreground text-sm">CBD</div>
                <div className="text-sm font-medium">{product.cbd}%</div>

                <div className="text-muted-foreground text-sm">Genetic</div>
                <div className="text-sm font-medium">{product.genetic}</div>

                <div className="text-muted-foreground text-sm">Class</div>
                <div className="text-sm font-medium">
                  {product.productClass}
                </div>

                {product.origin && (
                  <>
                    <div className="text-muted-foreground text-sm">Origin</div>
                    <div className="text-sm font-medium">{product.origin}</div>
                  </>
                )}
              </div>
            </div>

            {product.description && (
              <div className="grid gap-2">
                <h3 className="font-semibold">Description</h3>
                <p className="text-muted-foreground text-sm">
                  {product.description}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {product.effect?.map(effect => (
                <span
                  key={effect}
                  className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs"
                >
                  {effect}
                </span>
              ))}
            </div>

            <div className="mt-auto">
              <p className="text-lg font-bold">
                Price:{' '}
                {product.minPrice === product.maxPrice
                  ? `$${product.minPrice}`
                  : `$${product.minPrice} - $${product.maxPrice}`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
