import { Hero } from "../../components/ui/Hero/Hero"
import styles from './Home.module.css'
import { CardProduct } from "../../components/ui/CardProduct"
import { getProducts } from "../../service"
import { Toaster } from "sonner"
import { useQuery } from "react-query"
import { useState } from "react"
import type { Product } from "../../interface"

const Home = () => {

  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useQuery(
    ["products", page], () => getProducts(page), 
    {keepPreviousData: true})

  const products = data?.data || []

  // const [products, setProducts] = useState<Product[]>([])
  // const [error, setError] = useState(false)
  // const [isLoading, setIsLoading] = useState(true)
  
  // useEffect(() => {
  //   getProducts().then((data)=>{
  //     setProducts(data)
  //   }).catch(()=>{
  //     setError(true)
  //   }).finally(()=>{
  //     setIsLoading(false)
  //   })
  // },[])
  
  return (
    <>
      <Hero />
      <Toaster richColors />
      { isLoading && <p>Loading...</p>}
      { error && <p>Something went wrong</p>}
      <div className={styles.container}>
        {products.map((product: Product)=> (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className={styles.paginationButton}>previous page</button>
        <div className={styles.pageNumber}>
          <span>{page}</span>
        </div>
        <button onClick={() => setPage(page + 1)} disabled={page===data?.pages} className={styles.paginationButton}>next page</button>
      </div>
    </>
  )
}

export default Home
