import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import instance from '../utils/axios'
import ProductImage from '../components/productId/ProductImage'
import ProductInfo from '../components/productId/ProductInfo'

const ProductId = () => {
  const params = useParams()
  const [product, setProduct] = useState({})

  useEffect(() => {
    (async()=>{
      try {
        const response = await instance.get(`/products/${params.productId}`)
        setProduct(response.data[0])
      } catch (error) {
        console.log(error)
      }
    })()
  }, [params.productId])

  

  return (
    <div>
      <div>
        <h1>{product?.title}</h1>
      </div>

      <div>
        <div>
          <ProductImage product={product}/>
        </div>
        <div>
          <ProductInfo product={product}/>
        </div>
      </div>
    </div>
  )
}

export default ProductId