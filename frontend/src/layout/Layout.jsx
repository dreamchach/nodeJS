import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='flex flex-col justify-between h-screen'>
        <Navbar/>
        <main className='mb-auto w-10/12 max-w-4xl mx-auto'>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default Layout