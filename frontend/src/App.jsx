import { Route, Routes, useLocation } from "react-router-dom"
import Layout from "./layout/Layout"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { authUser } from "./store/thunkFuntions"
import ProtectedRoutes from "./components/ProtectedRoutes"
import NotAuthRoutes from "./components/NotAuthRoutes"
import Upload from "./pages/Upload"
import ProductId from "./pages/ProductId"
import Cart from "./pages/Cart"
import History from "./pages/History"

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(state=>state.user?.isAuth)
  const {pathname} = useLocation()

  useEffect(()=>{
    if(isAuth) {
      dispatch(authUser())
    }
  },[isAuth, pathname, dispatch])

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
  
        <Route index element={<Landing/>}/>

        <Route element={< ProtectedRoutes isAuth={isAuth}/>}>
          <Route path="/product/upload" element={<Upload/>}/>
          <Route path="/product/:productId" element={<ProductId/>}/>
          <Route path="/user/cart" element={<Cart/>}/>
          <Route path="/history" element={<History/>}/>
        </Route>

        <Route element={<NotAuthRoutes isAuth={isAuth}/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App