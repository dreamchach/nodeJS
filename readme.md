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




