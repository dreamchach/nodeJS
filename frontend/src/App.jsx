import { Route, Routes, useLocation } from "react-router-dom"
import Layout from "./layout/Layout"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { authUser } from "./store/thunkFuntions"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Auth from "./pages/Auth"
import NotAuthRoutes from "./components/NotAuthRoutes"

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
    <Route path="/auth" element={<Auth/>}/>
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