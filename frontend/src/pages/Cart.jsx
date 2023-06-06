import { useEffect, useState} from "react"
import { useSelector ,useDispatch} from "react-redux"
import { getCartItems, removeItem, payProducts } from "../store/thunkFuntions"
import CartTable from "../components/cart/CartTable"

const Cart = () => {
  const userData = useSelector(state=>state.user?.userData)
  const cartDetail = useSelector((state)=>state.user?.cartDetail)
  console.log(cartDetail)
  const dispatch = useDispatch()

  const [total, setTotal] = useState(0)

  useEffect(() => {
    let cartItemIds=[]

    if(userData?.cart && userData.cart.length > 0) {
      userData.cart.forEach(item=>{
        cartItemIds.push(item.id)
      })

      const body = {
        cartItemIds,
        userCart:userData.cart
      }

      dispatch(getCartItems(body))
    }
  }, [])

  useEffect(() => {
    calculateTotal(cartDetail)
  }, [cartDetail])

  const calculateTotal = (cartItems)=>{
    let total = 0
    cartItems.map((item)=> {
      console.log(item)
      total += item.price * item.qua
    })
    setTotal(total)
  }

  const onRemoveItem = (productId) => {
    dispatch(removeItem(productId))
  }

  const handlePayment = () => {
    dispatch(payProducts(cartDetail))
  }
  
  
  return (
    <div>
      <div>
        <h2>나의 장바구니</h2>
      </div>
      {cartDetail?.length > 0 ? 
        <div>
          <CartTable product={cartDetail} onRemoveItem={onRemoveItem}/>
          <div>
            <p>합계 : {total}원</p>
            <button onClick={handlePayment}>결제하기</button>
          </div>
        </div>
        :
        <div>장바구니가 비었습니다</div>
      }
    </div>
  )
}

export default Cart