export type Product = {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating: ProductRating
}

export type ProductCart = Product & { qty: number }

export type ProductRating = {
  rate: number
  count: number
}

export type Categories = {
  name: string
  href: string
}

export type CheckOutItem = {
  name: string
  amount: number
  currency: 'usd' | 'php'
  quantity: number
}
