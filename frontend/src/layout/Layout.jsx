import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = () => {
  return (
    <div className='flex flex-col justify-between h-screen'>
        <ToastContainer position='bottom-right' theme='light' pauseOnHover autoClose={1500}/>
        <Navbar/>
        <main className='mb-auto w-10/12 max-w-4xl mx-auto'>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default Layout