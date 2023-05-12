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
 

