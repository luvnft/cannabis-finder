import Link from 'next/link'

export default function ProductNotFound() {
  return (
    <div className="container mx-auto flex h-[50vh] flex-col items-center justify-center px-4 py-8">
      <h1 className="mb-4 text-4xl font-bold">Product Not Found</h1>
      <p className="text-muted-foreground mb-8 text-lg">
        The product you are looking for could not be found.
      </p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
      >
        Back to Products
      </Link>
    </div>
  )
}
