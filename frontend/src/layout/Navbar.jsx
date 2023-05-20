import { useState } from "react"
import {Link} from 'react-router-dom'
import NavItem from "../components/NavItem"

const Navbar = () => {
  const [menu, setMenu] = useState(false)

  const handleMenu = () => {
    setMenu(!menu)
  }

  return (
    <nav>
      <div>
        <div>
          <Link to='/'>Logo</Link>
        </div>
        <div>
          <button onClick={handleMenu}>{menu ? '-' : '+'}</button>
        </div>
        <div>
          <NavItem/>
        </div>
      </div>
      <div>
        {menu && <NavItem moblie/>}
      </div>
    </nav>
  )
}

export default Navbar