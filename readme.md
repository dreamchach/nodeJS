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

## mongoDB 연동하기
