# 1-1. node.js 와 express.js 설치

## package.json 설치
1. 터미널에 `npm init -y` 입력
2. package.json 파일 확인

## express.js 패키지 설치
1. 터미널에 `npm i express`입력
2. package.json 파일에서 express 설치 확인

> express.js가 왜 필요한가?
express.js는 next.js, vue.js와 같은 프레임워크의 일종으로 node환경에서 돌아간다.
express를 사용하지 않으면 if문으로 method를 구분해야하고, if문이 많아지면 코드의 가독성이 떨어진다.

>express.js vs vanilla node.js(http)
vanilla node.js(http)
```javascript
const http = require("http")
const server = http.createServer((req, res)=>{
    if(req.method === 'GET') {
        if(req.url === '/about'){
            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            })
            return res.end('hello express')
        }
    }
})
```

express
```javascript
const express = require('express')
const app = express()
app.get('/about', (req, res)=>{
    res.setHeader('Content-Type', 'text/html')
    res.send('hello express')
})
```

## index.js파일 생성
javascript 내용을 작성한다.

## package.json파일 수정
```javascript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
에서
```javascript
  "scripts": {
    "start" : "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
로 수정한다.

>참고 
json파일에서 key, value값은 `""`만 사용가능하다.
객체의 마지막에 사용되는 `,`도 사용불가능하다

## index.js 실행
터미널에 `npm run start`를 입력해 실행한다.

# 1-2. mongoDB 연동하기
참고 : Mongo DB 사용법.pdf

## mongoose 설치하기
터미널에 `npm i mongoose` 입력해서 mongoose 설치하기

## mongoose 연결하기
index.js에서 mongoose 연결하기
`mongodb+srv://aaa:<password>@node-test.uim33ep.mongodb.net/?retryWrites=true&w=majority`
에서 `<password>`부분에 비밀번호 적어넣기

>useNewUrlParser : Flag for using new URL string parser instead of current (deprecated) one.
useCreateIndex : If true, this connection will use createIndex() instead of ensureIndex() for automatic index builds via Model.init().

>error
참고 링크: https://velog.io/@jsy7517/Error-listen-EADDRINUSE-address-already-in-use-5000

# 1-3.api 설정하기

## body-parser 설치
터미널에 `npm i body-parser`을 설치한다.

### body-parser를 설치하는 이유
```javascript
app.post('/register', (req, res)=>{
    console.log(req.body)
})
```
`req.body`는 body-parser를 사용하기 전에는 디폴트 값으로 `undefined`가 설정된다.
따라서 undefined error를 방지하려면 body-parcer를 설치해야 한다.

단, express.js v4.16.0 이상에서는 body-parcer를 설치하지 않아도 사용가능하다.
```javascript
const express = require('express')
const app = express()
app.use(express.json())

app.post('/register', (req, res)=>{
    console.log(req.body)
})
```

## postman 사용
`http://localhost:(포트번호)/(하위주소)`로 메서드를 바르게 입력하여(post, get, put, delete가 존재한다) 정보값을 받는다. post의 경우, 보내는 정보는 model/User에 있는 객체값이다.(필수 값이 없으므로 아무거나 보내봐도 괜찮다. 'name'만 보내도 괜찮고, 'name'과 'email'을 함께 보내도 된다)

mongoDB에서 중복에러가 발생할 수 있다.
하위 문서 참조 : https://dubaiyu.tistory.com/281

# 1-4. 비밀정보 숨기기
참조 문서 : https://www.daleseo.com/js-dotenv/

# 1-5. 비밀번호 암호화 설정

## bcrypt 설치
터미널에 `npm i bcrypt`를 입력한다.
bcrypt는 문자정보(string)을 암호화하는 기능이 존재한다.

```javascript
// index.js
const user = new User(req.body)
user.save()
```
에서 `save()` 되기 전에 bcrypt가 작동해야 한다

```javascript
// model.User.js
const bcrypt = require('bcrypt')
const saltRounds = 10

userSchema.pre('save',  function (next) {})
```
로 'save' 되기 전 함수를 작동시키게 만든다.
pre메서드의 함수는 반드시 `function () {}`으로 생성한다.
화살표 함수를 생성하면 `TypeError: user.isModified is not a function`와 같은 타입에러가 발생한다.

>git push error
git pull을 하고 git push를 했는데 에러가 났다면 https://www.githubstatus.com/ 로 접속해보는 것이 좋다. 
github의 업데이트 일정과 `current status`의 `git operations`에서 git push 상태 여부를 알 수 있다.
참조 문서 : https://eloquence-developers.tistory.com/175

# 1-6. 로그인 기능과 토큰 생성

## jsonwebtoken 라이브러리 설치
터미널에 `npm i jsonwebtoken`입력

## cookie-parser 라이브러리 설치
터미널에 `npm i cookie-parser`입력
쿠키에 token을 저장하는 라이브러리

발생한 에러들 참조문서 
https://www.inflearn.com/questions/814735/model-findone-no-longer-accepts-a-callback-%EC%98%A4%EB%A5%98

https://www.inflearn.com/questions/42533/postman%EC%97%90%EC%84%9C-sending-request-%EB%AC%B8%EA%B5%AC%EA%B0%80-%EB%9C%A8%EB%A9%B4%EC%84%9C-%ED%97%9B%EB%8F%8C%EA%B3%A0-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4


# 1-7. 메서드 분석

```javascript
const express = require('express')
const app = express()

express.json()

app.use()

app.get()
app.post()
app.put()
app.patch()
app.delete()

app.listen()
```

```javascript
const {User} = require('./model/User')

User.findOne({}).then((user)=>{
  user.comparePassword()
  user.generateToken()
  user.isModified()
  user.save()
})
User.findOneAndUpdate()
User.findByToken()
```

```javascript
const mongoose = require('mongoose')

mongoose.connect()
mongoose.model()
const UserSchema = mongoose.Schema({})

UserSchema.pre()
userSchema.methods.comparePassword = ()=>{}
userSchema.methods.generateToken = ()=>{}
userSchema.statics.findByToken = ()=>{}
```

```javascript
res.send()
res.status()
res.json()

req.body()
```

```javascript
const bcrypt = require('bcrypt')

bcrypt.genSalt()
bcrypt.hash()
bcrypt.compare()
```

```javascript
const jwt = require('jsonwebtoken')

jwt.sign()
jwt.verify()
```

# 심화 1-1. vite로 react 시작
react snippet을 사용하려면 vs코드 확장프로그램에서 `es7`을 검색한 후, `VS Code ES7+ React/Redux/React-Native/JS snippets`를 설치해준다.

# 심화 1-2. eslint 설정
typescript는 에러를 잡아주지만, javascript는 불가능하기 때문에 eslint를 설정해주는 것이 좋다.

`npm i -D vite-plugin-eslint`
`npm i -D eslint`
`npm i -D eslint-config-react-app`
을 설치한다.

`vite.config.js` 파일에서 
```javascript
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins:[react(), eslint()]
})
```
를 설정한다.

`.eslintrc` 파일을 생성한 후, 
```javascript
{
  "extends":[
    "react-app"
  ]
}
```
으로 설정해준다.

심화 1-3. tailwindCss 설치
vite-react에서 tailwindCss 설치 시 참고자료
https://tailwindcss.com/docs/guides/vite(공식 문서)

심화 1-4. router과 layout
`npm i react-router-dom`을 설치해준다

main.jsx 파일에서
```javascript
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```
와 같이 `<BrowserRouter>`로 `<App>`을 감싸준다.(react-router-dom을 사용하기 위한 준비과정)

App.js파일에서 
```javascript
import { Route, Routes } from "react-router-dom"

<Routes>
<Route path="/" element={<Layout/>}>
  <Route index element={<Landing/>}/>
  <Route path="/login" element={<Login/>}/>
</Route>
</Routes>
```
와 같이 `<Routes>`로 `<Route>`를 감싸준다.
`<Route>`의 `path` 속성에 경로를 입력하고, `index`속성은 `/`경로로 layout이 지정되었을 경우 들어갈 수 있는 시작페이지이다.
`element`속성으로 경로의 페이지를 지정한다.

layout/Layout.jsx 파일에서
```javascript
import { Outlet } from 'react-router-dom'

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
```
에서 `Outlet`해당 경로에 따른 페이지를 불러올 수 있다.

심화1-5. css와 react-icons
`npm i react-icons`로 react-icons를 설치하고, react-icons 웹페이지에서 원하는 icon을 찾아 사용한다. 

사용법을 아래를 참조하면 된다.
`import {{폴더명}OutlineCheckCircle} from 'react-icons/(폴더명)`
이기 때문에 반드시 폴더명들은 일치해야한다.

```javascript
import {AiOutlineCheckCircle} from 'react-icons/ai'

const Footer = () => {
  return (
    <div>
      <AiOutlineCheckCircle/>
    </div>
  )
}
```

심화1-6. redux

>참고자료
https://kyounghwan01.github.io/blog/React/redux/redux-basic/
https://kyounghwan01.github.io/blog/React/redux/redux-toolkit/

`npm i react-redux`
`npm i @reduxjs/toolkit`
으로 redux-toolkit을 설치한다.

store/userSlice.js파일에서
초기값은 initialState를 설정한다.
```javascript
const initialState = {
  userData: {
    name:''
  }
}
```

store/userSlice.js파일에서
redux-toolkit으로 createSlice를 생성한다.
```javascript
import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{}
})
```

store/index.js파일에서 store를 생성한다.
```javascript
import { configureStore } from "@reduxjs/toolkit";
import userReducer  from './userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer
    }
})
```
여기서 `./userSlice`에서 나온 명칭은 정확하게는 `(리듀서명).reducer`가 되므로 새로 명명을 해도 좋다.

그리고, main.jsx에서 `Provider`로 `App`을 감싸준다.
```javascript
import { Provider } from 'react-redux'
import { store } from './store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
)
```

심화1-7. redux-persist
`redux-persist`는 새로고침을 했을 시, local storage에 redux의 정보가 남아있을 수 있게 해주는 라이브러리이다.

>redux-persist 참고자료
https://kyounghwan01.github.io/blog/React/redux/redux-persist/#%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2-%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%B2

`npm i redux-persist`로 라이브러리를 설치한다.

store/index.js파일에서
`combineReducers`로 reducer들을 합친다.
```javascript
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    user:userReducer,
})
```

local storage에 저장될 key값을 설정한다.
```javascript
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:'root',
    storage
}
```

persistReducer를 설정한다.
```javascript
import { persistReducer } from "redux-persist";

const persistedReducer = persistReducer(persistConfig, rootReducer)
```

configureStore의 middleware를 설정한다.
```javascript
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

export const store = configureStore({
    reducer: persistedReducer,
    middleware:getDefaultMiddleware=>getDefaultMiddleware({
        serializableCheck: {
            ignoredActions:[FLUSH, REHYDRATE,PAUSE,PERSIST, PURGE,REGISTER]
        }
    })
})
```

>`getDefaultMiddleware`에서 취소선이 생긴다.
참고자료: https://stackoverflow.com/questions/68479631/getting-warning-message-getdefaultmiddleware-is-deprecated

persistStore를 export한다.
```javascript
import { persistStore } from "redux-persist";

export const persistor = persistStore(store)
```

`PersistGate`로 `App`을 감싼다.
```javascript
import { persistor } from './store/index.js'
import { PersistGate } from 'redux-persist/integration/react'

<PersistGate loading={null} persistor={persistor}>
  <App />
</PersistGate>
```

>실수로 생긴 에러
https://gwpaeng.tistory.com/346

심화1-8. 백엔드 기본구조 생성
>bcrypt vs bcryptjs
https://github.com/kelektiv/node.bcrypt.js/issues/705#issuecomment-463492202
https://www.inflearn.com/questions/409596/bcrypt%EC%99%80-bcryptjs
https://lahuman.github.io/bcrypt_bcryptjs/

심화1-9. express.static
`express.static()`은 정적 파일을 옮기기 위한 메서드이다.

```javascript
//기본형
app.use(express.static('정적파일이 있는 폴더명'))

// 검색 시
// http://localhost:4000/파일명.파일확장자

// 상세경로 지정 시
app.use('/image' ,express.static('정적파일이 있는 폴더명'))

// 검색 시
// http://localhost:4000/image/파일명.파일확장자

// 버그 방지를 위한 정적파일 상세경로 지정
const path = require('path')

app.use(express.static(path.join(__dirname, '../정적 파일이 있는 폴더명')))

// 검색 시
// http://localhost:4000/image/파일명.파일확장자
```

# 심화1-10. cors설정
`npm i cors`로 cors 라이브러리 설치
```javascript
const cors = require('cors')

app.use(cors())
```
로 설정

# 심화1-11. express.json()
```javascript
const express = require('express')
const app = express()

app.post('/', (req, res)=>{
  console.log(req.body)
  res.json(req.body)
})
```
단순히 이렇게 해버리면 `req.body`는 `undefined`가 뜬다. 
왜냐하면 `req.body`의 `parsing`과정이 없기 때문이다.
현재 `express` 라이브러리에는 `body-parser`라이브러리가 포함되어있기 때문에 고치는 방법은 간단하다(위에도 나와있다.)

```javascript
const express = require('express')
const app = express()

app.use(express.json())

app.post('/', (req, res)=>{
  console.log(req.body)
  res.json(req.body)
})
```
이렇게 하면 내가 보낸 값들을 객체로 다시 받을 수가 있다.

# 심화1-12 mongoDB 연동
위에 글 참조

# 심화1-13. model과 schema 생성하기
위에 글 참조

# 심화1-14. express에서 에러 처리하기
1. 방법 1
```javascript
app.get('/', (req, res)=>{
    throw new Error('it is an error')
})
```

2. 방법 2
```javascript
app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.send(error.message || '서버에서 에러가 났습니다')
})

app.get('/', (req, res)=>{
    throw new Error('it is an error')
})
```

3. 방법 3
```javascript
app.get('/', (req, res, next)=>{
    setImmediate(()=>{
        next(new Error('it is an error'))
    })
})
```

>만약 방법 3에서 `next`를 추가하지 않으면 서버가 충돌하는 현상으로 인해 서버가 닫힘

# 심화1-15 회원가입 ui 생성(react-router-dom)
react에서는 `<a>` 대신 `react-router-dom`을 이용해서 이동하는 것이 일반적이다.
>참고자료
https://iridescent-zeal.tistory.com/214

# 에러(E325-ATTENTION-해결하기)
참고자료: https://itisyo.tistory.com/entry/Linux-VI-%EC%97%90%EB%94%94%ED%84%B0-E325-ATTENTION-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0

# 심화 1-16. react-hook-form 사용
공식문서 참조: https://react-hook-form.com/form-builder

# 심화 1-17. axios instance와 import.meta.env
`import.meta.env`의 참고문서
https://vitejs-kr.github.io/guide/env-and-mode.html

`axios instance` 참고문서
https://yamoo9.github.io/axios/guide/api.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1

# 심화 1-18. redux
추가공부 필요...
여전히 redux는 헷갈린다...

# 심화 1-19. react-toastify
1. `npm i react-toastify`로 react-toastify 설치
2. react-toastify 박스를 띄울 장소에 `ToastContainer` 설치
3. `react-toastify/dist/ReactToastify.css`를 import

```javascript
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = () => {
  return (
    <div>
        <ToastContainer 
        position='bottom-right' 
        theme='light' 
        pauseOnHover 
        autoClose={1500}
        />
        <Navbar/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}
```

4. 성공인지 실패인지에 따라 container 박스를 다르게 띄울 것.
이번 경우에는 redux로 제어

```javascript
import { toast } from "react-toastify"

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending, (state)=>{
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state)=>{
            state.isLoading = false
            toast.info('회원가입을 성공했습니다')
        }).addCase(registerUser.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
            toast.error(action.payload|| '회원가입에 실패했습니다')
        })
    }
})
```

>참고자료
https://defineall.tistory.com/1021

# 심화 1-20. express.Router()
backend에서 index.js에서
```javascript
const express = require('express')
const app - express()

app.use('/users', require('./routes/users'))
```
`app.use()`의 첫번째 인지가 상위 `route path`이다.
`require()`에 있던 폴더로 들어가면,
```javascript
const express = require('express')
const router = express.Router()

app.post('/register', async(req, res)=>{
    try{
        const user = new User(req.body)
        await user.save()
        return res.sendStatus(200)
    } catch(error) {
        next(error)
    }
})

module.exports = router
```
로 작성하면, 예를 들어 위의 api주소는 `/users/register`로 이동된다.

# 심화 1-21. 비밀번호 암호화(bcrypt 라이브러리)
위에 글 참조

# 심화 1-22. 로그인페이지 생성(localstorage 사용법)
>localstorage 참고자료
https://www.daleseo.com/js-web-storage/

# 심화 1-23. 로그인 라우터
회원가입 라우터 참조

# 심화 1-24. 인증 확인

# 심화 1-25. ProtectedRoutes, NotAuthRoutes

# 심화 1-26. NavItems
참고자료 https://developer-talk.tistory.com/269

# 심화 1-27. 만료된 token 처리하기(refreshToken 없을 시)

# 심화 2-1. shop app을 위한 소스코드 추가하기
`backend/src/models/User.js`
```javascript
const userSchema= mongoose.Schema({
  ...,
  cart : {
    type:Array,
    default:[]
  },
  history: {
    type:Array,
    default:[]
  }
})
```

`backend/src/routes/users.js`
```javascript
router.get('/auth', auth, async(req, res)=>{
  return res.json({
    ...,
    cart:req.user.cart,
    history:req.user.history
  })
})
```

`frontend/src/App.jsx`
```javascript
<Route element={< ProtectedRoutes isAuth={isAuth}/>}>
  <Route path="/product/upload" element={<Upload/>}/>
  <Route path="/product/:productId" element={<ProductId/>}/>
  <Route path="/user/cart" element={<Cart/>}/>
  <Route path="/history" element={<History/>}/>
</Route>
```

`frontend/src/components/NavItem.jsx`
```javascript
const cart = 2

return (
  <ul>
    {routes.map(({to, name, auth, icon})=>{
      ...
      else if(icon) {
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
    })}
  </ul>
)
```

`backend/src/models/Payment.js`
```javascript
const paymentSchema= mongoose.Schema({
  user: {
    type:Object
  },
  data: {
    type:Array,
    default:[]
  },
  product: {
    type:Array,
    default: []
  }
}, {timestamps:true})
```

`backend/src/models/Product.js`
```javascript
const productSchema= mongoose.Schema({
  writer: {
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  ...
})
```

`frontend/src/utils/navItemRoutes.jsx`
여기서 `<AiOutlineShoppingCart/>`로 인한 에러발생
파일을 .js에서 .jsx로 변경
```javascript
import {AiOutlineShoppingCart} from 'react-icons/ai'

export const routes = [
  ...,
  {to:'/user/cart', name:'카트', auth:true, icon:<AiOutlineShoppingCart style={{fontSize:'1.4rem'}}/>},
  ...
]
```

frontend 
`npm i react-dropzone`
`npm i react-image-gallery`
`npm i react-responsive-carousel`

>참고자료 react-dropzone https://ock-nomad.tistory.com/195
참고자료 react-image-gallery https://www.npmjs.com/package/react-image-gallery
참고자료 react-responsive-carousel https://www.npmjs.com/package/react-responsive-carousel

backend
`npm i async`
`npm i multer`

>참고자료 async https://www.npmjs.com/package/async
참고자료 multer https://github.com/expressjs/multer/blob/master/doc/README-ko.md

# 심화 2-2. 상품 upload페이지 UI 생성

# 심화 2-3. 상품 upload페이지 기능 생성
`backend/src/index.js`
```javascript
app.use('/products', require('./routes/product'))
```

`event.preventDefault()`
>참고자료
https://velog.io/@hang_kem_0531/JS-event.preventDefault-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0

# 심화 2-4. 파일 업로드 컴포넌트 생성 (react-dropzone 라이브러리 사용)
`frontend/.env`
```javascript
VITE_URL='http://localhost:4000'
// 4000는 백엔드 port 번호
```

# 심화 2-5. multer을 이용해서 파일 업로드하기
가장 고생을 많이했다.
어렵다. 
문제 해결하는데 이틀이나 걸렸다...ㅠ

>callback함수, promise 참고자료
https://velog.io/@ko1586/Callback%ED%95%A8%EC%88%98%EB%9E%80-%EB%AD%94%EB%8D%B0
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise
https://samsamgoo.tistory.com/158

>FormData() 참고자료
https://developer.mozilla.org/ko/docs/Web/API/FormData

>eslint 참고자료
https://velog.io/@253eosam/ESLint-%EB%94%94%ED%85%8C%EC%9D%BC%ED%95%98%EA%B2%8C-%ED%83%90%EA%B5%AC%ED%95%98%EA%B8%B0
https://eslint.org/docs/latest/use/getting-started
https://backend-intro.vlpt.us/1/01.html

>에러
`missing in props validation` 에러 참고자료
https://haerim95.tistory.com/41
https://velog.io/@fenjo/React-eslint-error-missing-in-props-validation-%ED%95%B4%EA%B2%B0%EB%B0%A9%EB%B2%95
https://www.tutorialspoint.com/reactjs/reactjs_props_validation.htm
`TypeError: Converting circular structure to JSON`에러 참고자료
https://ohgyun.com/399

>multer 참고자료
https://gngsn.tistory.com/37#:~:text=Multer%EB%8A%94%20%ED%8C%8C%EC%9D%BC%20%EC%97%85%EB%A1%9C%EB%93%9C%EB%A5%BC,%EB%A5%BC%20%EC%B6%94%EA%B0%80%ED%95%98%EC%97%AC%20%EB%84%98%EA%B2%A8%EC%A4%8D%EB%8B%88%EB%8B%A4.
https://github.com/expressjs/multer/blob/master/doc/README-ko.md
https://www.zerocho.com/category/NodeJS/post/5950a6c4f7934c001894ea83

>vite 환경변수 사용 참고자료
https://vitejs-kr.github.io/guide/env-and-mode.html

# 심화 2-6. landing page UI 생성

# 심화 2-7. 상품 데이터 가져오는 route 생성하기

# 심화 2-8. 더 보기 기능 생성하기
>http 메서드 참고자료
https://velog.io/@yh20studio/CS-Http-Method-%EB%9E%80-GET-POST-PUT-DELETE

>axios query 참고자료
https://kkh0977.tistory.com/1913

>몽구스DB 메서드 참고자료
.populate()
https://www.zerocho.com/category/MongoDB/post/59a66f8372262500184b5363
https://fierycoding.tistory.com/35
몽구스DB 쿼리빌더
https://www.zerocho.com/category/MongoDB/post/59bd148b1474c800194b695a

>object key 변수처리 참고자료
https://koonsland.tistory.com/146

>event.preventDefault() 참고자료
https://programming119.tistory.com/100

# 심화 2-9. checkbox filter기능 생성하기

# 심화 2-10. radiobox filter기능 생성하기
>에러 참조자료
https://www.inflearn.com/questions/13378/%EA%B2%8C%EC%8B%9C%EA%B8%80-%EC%B6%94%EA%B0%80%ED%95%98%EB%A9%B4-key-%EC%97%90%EB%9F%AC%EA%B0%80-%EB%B0%9C%EC%83%9D%ED%95%B4%EC%84%9C%EC%97%AC

>mongoDB query조정
https://www.mongodb.com/docs/manual/reference/operator/query-comparison/
http://solarisailab.com/archives/1908

>javascript for...in구문
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...in
https://jsdev.kr/t/for-in-vs-for-of/2938

# 심화 2-11. 검색기능 생성하기
>mongoDB 검색기능
https://www.mongodb.com/docs/atlas/atlas-search/tutorial/partial-match/
https://sy34.net/mongodb-full-text-search/

>mongoDB의 index란?
https://ryu-e.tistory.com/1

# 심화 3-1. 상품 디테일페이지 생성하기
>즉시실행함수
https://jongminfire.dev/java-script-%EC%A6%89%EC%8B%9C%EC%8B%A4%ED%96%89%ED%95%A8%EC%88%98-iife

>mongoDB query조정
https://www.mongodb.com/docs/manual/reference/operator/query/in/

# 심화 3-2. product info 컴포넌트 생성하기

만약 백엔드에서 이상하게 원하는 데이터가 들어가지 않는 경우, `console.log()`를 찍어서
```javascript
Query {
  _mongooseOptions: {},
  _transforms: [],
  _hooks: Kareem { _pres: Map(0) {}, _posts: Map(0) {} },
  _executionStack: null,
  mongooseCollection: Collection {
    collection: Collection { s: [Object] },
    Promise: [Function: Promise],
    modelName: 'User',
    _closed: false,
    opts: {
      autoIndex: true,
      autoCreate: true,
      schemaUserProvidedOptions: {},
      capped: false,
      Promise: undefined,
      '$wasForceClosed': undefined
    },
    name: 'users',
    collectionName: 'users',
    conn: NativeConnection {
      base: [Mongoose],
      collections: [Object],
      models: [Object],
      config: {},
      replica: false,
      options: null,
      otherDbs: [],
      relatedDbs: {},
      states: [Object: null prototype],
      _readyState: 1,
      _closeCalled: undefined,
      _hasOpened: true,
      plugins: [],
      id: 0,
      _queue: [],
      _listening: false,
      _connectionOptions: [Object],
      _connectionString: 'mongodb+srv://aaa:asdf1234@node-test.uim33ep.mongodb.net/?retryWrites=true&w=majority',
      client: [MongoClient],
      '$initialConnection': [Promise],
      db: [Db],
      host: 'ac-vnczdeb-shard-00-02.uim33ep.mongodb.net',
      port: 27017,
      name: 'test'
    },
    queue: [],
    buffer: false,
    emitter: EventEmitter {
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      [Symbol(kCapture)]: false
    }
  },
  model: Model { User },
  schema: Schema {
    obj: {
      name: [Object],
      email: [Object],
      password: [Object],
      role: [Object],
      image: [Function: String],
      cart: [Object],
      history: [Object]
    },
    paths: {
      name: [SchemaString],
      email: [SchemaString],
      password: [SchemaString],
      role: [SchemaNumber],
      image: [SchemaString],
      cart: [SchemaArray],
      history: [SchemaArray],
      _id: [ObjectId],
      __v: [SchemaNumber]
    },
    aliases: {},
    subpaths: { 'cart.$': [Mixed], 'history.$': [Mixed] },
    virtuals: { id: [VirtualType] },
    singleNestedPaths: {},
    nested: {},
    inherits: {},
    callQueue: [],
    _indexes: [],
    methods: { comparePassword: [AsyncFunction (anonymous)] },
    methodOptions: {},
    statics: {},
    tree: {
      name: [Object],
      email: [Object],
      password: [Object],
      role: [Object],
      image: [Function: String],
      cart: [Object],
      history: [Object],
      _id: [Object],
      __v: [Function: Number],
      id: [VirtualType]
    },
    query: {},
    childSchemas: [],
    plugins: [ [Object], [Object], [Object], [Object], [Object] ],
    '$id': 1,
    mapPaths: [],
    s: { hooks: [Kareem] },
    _userProvidedOptions: {},
    options: {
      typeKey: 'type',
      id: true,
      _id: true,
      validateBeforeSave: true,
      read: null,
      shardKey: null,
      discriminatorKey: '__t',
      autoIndex: null,
      minimize: true,
      optimisticConcurrency: false,
      versionKey: '__v',
      capped: false,
      bufferCommands: true,
      strictQuery: false,
      strict: true,
      pluralization: true
    },
    '$globalPluginsApplied': true,
    _requiredpaths: [],
    _indexedpaths: [ [Array] ]
  },
  op: 'findOneAndUpdate',
  options: { new: true },
  _conditions: { _id: new ObjectId("6465f3b8971f7ea52c1b456f") },
  _fields: undefined,
  _updateDoc: undefined,
  _path: undefined,
  _distinctDoc: undefined,
  _collection: NodeCollection {
    collection: Collection {
      collection: [Collection],
      Promise: [Function: Promise],
      modelName: 'User',
      _closed: false,
      opts: [Object],
      name: 'users',
      collectionName: 'users',
      conn: [NativeConnection],
      queue: [],
      buffer: false,
      emitter: [EventEmitter]
    },
    collectionName: 'users'
  },
  _traceFunction: undefined,
  '$useProjection': true,
  _update: { '$push': { cart: [Object] } }
}
```
같은 형식이 발생하면 먼저 자신이 `try...catch`구문을 사용했는지 확인하고, 사용했을 경우,
`async...await`를 사용하면 해결할 수 있음.

> mongoDB 필드 업데이트 연산자 참고자료(`$inc`)
https://www.mongodb.com/docs/manual/reference/operator/update-field/

>mongoDB `findOneAndUpdate` 참고자료
https://velog.io/@yejin20/mongoose-findOneAndUpdate
https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate/

>http 상태코드 참고자료
https://morphys.tistory.com/entry/HTTP-%EC%83%81%ED%83%9C%EC%BD%94%EB%93%9C-200-201-301-303-400-401-404-500-503
https://sanghaklee.tistory.com/61

# 심화 3-3. 쇼핑카트 페이지 데이터 가져오기

# 심화 3-4. cart table 컴포넌트 생성하기
```javascript
  const renderImage=(images)=>{
    let image = images[0]
    return `${import.meta.env.VITE_URL}/${image}`
  }

  <img alt={item} src={renderImage(item.images)}/>
```
위와 같이 작성된 이유는 만약 src를 `백틱`으로 감싸면 
```bash
ERROR: Expected "{" but found "`"`
```
이런 에러가 발생된다.

# 심화 3-5. cart item 삭제기능 생성하기

# 심화 3-6. 결제기능 생성하기
>Date.prototype.toISOString() 참고자료
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date

>crypto.randomUUID() 참고자료
https://velog.io/@dishate/uuid%EB%A5%BC-%EB%8C%80%EC%8B%A0%ED%95%A0-crypto.randomUUID
https://nodejs.dev/en/api/v18/webcrypto/
https://defineall.tistory.com/701

>Symbol 참고자료
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol

>async 라이브러리 참고자료
https://sub0709.tistory.com/3

# 심화 3-7. history페이지 생성하기
> dayjs 라이브러리 참고자료
https://github.com/iamkun/dayjs/blob/HEAD/docs/ko/README-ko.md