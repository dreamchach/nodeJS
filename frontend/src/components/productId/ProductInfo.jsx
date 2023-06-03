import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/thunkFuntions'

const ProductInfo = ({product}) => {
  console.log(product)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addToCart({
      id:product._id
    }))
  }

  return (
    <div>
      <p>상품 정보</p>
      
      <ul>
        <li>가격 : {product.price} 원</li>
        <li>팔린 개수 : {product.sold} 개</li>
        <li>설명 : {product.description}</li>
      </ul>

      <div>
        <button onClick={handleClick}>
          장바구니로
        </button>
      </div>
    </div>
  )
}

export default ProductInfo