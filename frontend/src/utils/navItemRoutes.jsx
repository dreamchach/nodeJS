import {AiOutlineShoppingCart} from 'react-icons/ai'

export const routes = [
    {to:'/login', name:'로그인', auth:false},
    {to:'/register', name:'회원가입', auth:false},
    {to:'/product/upload', name:'업로드', auth:true},
    {to:'/user/cart', name:'카트', auth:true, icon:<AiOutlineShoppingCart style={{fontSize:'1.4rem'}}/>},
    {to:'', name:'로그아웃', auth:true},
    {to:'/history', name:'주문목록', auth:true}
]