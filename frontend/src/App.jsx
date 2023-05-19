import { Route, Routes, useLocation } from "react-router-dom"
import Layout from "./layout/Layout"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { authUser } from "./store/thunkFuntions"

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
  
  <Route path="/login" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
</Route>
</Routes>
  )
}

export default App