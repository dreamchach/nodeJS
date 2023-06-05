import {AiOutlineShoppingCart} from 'react-icons/ai'

export const routes = [
    {to:'/login', name:'로그인', auth:false},
    {to:'/register', name:'회원가입', auth:false},
    {to:'/product/upload', name:'업로드', auth:true},
    {to:'/user/cart', name:'카트', auth:true, icon:<AiOutlineShoppingCart style={{fontSize:'1.4rem'}}/>},
    {to:'', name:'로그아웃', auth:true},
    {to:'/history', name:'주문목록', auth:true}
]

export const continents = [
    {key:1, value:'Africa'},
    {key:2, value:'Europe'},
    {key:3, value:'Asia'},
    {key:4, value:'North America'},
    {key:5, value:'South America'},
    {key:6, value:'Australia'},
    {key:7, value:'Antarctica'},
]

export const prices = [
    {key:100, name:'모두', array:[]},
    {key:101, name:'0~100원', array:[0, 100]},
    {key:102, name:'101~1000원', array:[101, 1000]},
    {key:103, name:'1001~10000원', array:[1001, 10000]},
    {key:104, name:'10001~100000원', array:[10001, 100000]},
    {key:105, name:'100001원 이상', array:[100001, 1000000000]},
]

export const thead = ['사진', '개수', '가격', '삭제']