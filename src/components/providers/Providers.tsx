"use client"

import { type ReactNode } from "react"

import HydrationProvider from "@/components/providers/HydrationProvider"
import QueryProvider from "@/components/providers/QueryProvider"

interface ProvidersProps {
  children: ReactNode
  dehydratedState?: unknown
}

export default function Providers({
  children,
  dehydratedState,
}: ProvidersProps) {
  return (
    <QueryProvider>
      <HydrationProvider state={dehydratedState}>{children}</HydrationProvider>
    </QueryProvider>
  )
}
