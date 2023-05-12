import { Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {

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