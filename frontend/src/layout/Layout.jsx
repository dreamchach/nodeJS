import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

// className='flex flex-col justify-between h-screen'
// className='mb-auto w-10/12 max-w-4xl mx-auto'

const Layout = () => {
  return (
    <div>
        <Navbar/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default Layout