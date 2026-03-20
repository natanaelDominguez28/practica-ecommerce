import type { PaginatedResponse, Product } from "../interface"

export const getProducts = async (page = 1): Promise<PaginatedResponse> => {
  try {
    const response = await fetch('/db.json')
    if (response.ok) {
      const json = await response.json()
      const allProducts: Product[] = json.products

      const perPage = 24
      const start = (page - 1) * perPage
      const data = allProducts.slice(start, start + perPage)
      const pages = Math.ceil(allProducts.length / perPage)

      return { data, pages }
    } else {
      throw new Error('Failed to fetch products')
    }
  } catch (error) {
    throw new Error('Network error', { cause: error })
  }
}
  
  // export const createProduct = async(product: Product): Promise<Product> => {
  //   try {
  //     const response = await fetch('http://localhost:3000/products',{
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(product)
  //     })

  //     if (response.ok) {
  //       const data = await response.json()
  //       return data
  //     } else {
  //       throw new Error('Failed to create product')
  //     }

  //   } catch (error) {
  //     throw new Error('Network error', { cause: error })
  //   }
  // }
