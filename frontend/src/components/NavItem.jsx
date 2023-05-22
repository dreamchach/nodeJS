import { useDispatch,useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { routes } from '../utils/navItemRoutes'
import { logoutUser } from '../store/thunkFuntions'

const NavItem = (mobile) => {
    console.log(Object.keys(mobile).length !== 0)
    
    const isAuth = useSelector(state=>state.user?.isAuth)
    const cart = 2
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logoutUser())
        .then(()=>{
            navigate('/login')
        })
    }

  return (
    <ul>
        {routes.map(({to, name, auth, icon})=>{
            if(isAuth !== auth) return null

            if(name === '로그아웃') {
                return (
                    <li key={name}>
                        <Link onClick={handleLogout}>
                            {name}
                        </Link>
                    </li>
                )
            } else if(icon) {
                return (
                    <li key={name}>
                        <Link to={to}>
                            {icon}
                            <span>
                                {cart}
                            </span>
                        </Link>
                    </li>
                )
            }
             else {
                return (
                    <li key={name}>
                        <Link to={to}>
                            {name}
                        </Link>
                    </li>
                )
            }
        })}
    </ul>
  )
}

export default NavItem