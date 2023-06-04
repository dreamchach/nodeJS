import { useEffect } from "react"
import { useSelector ,useDispatch} from "react-redux"
import { getCartItems } from "../store/thunkFuntions"

const Cart = () => {
  const userData = useSelector(state=>state.user?.userData)
  const dispatch = useDispatch()

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
  
  return (
    <div>Cart</div>
  )
}

export default Cart