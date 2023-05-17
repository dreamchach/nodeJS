const express = require('express')
const app = express()
const port = 4000
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.mongoDB_URI)
.then(()=>{
    console.log('연결 완료')
})
.catch((error)=>{
    console.error(error)
})

/*
app.get('/', (req, res)=>{
    throw new Error('it is an error')
})
*/
/*
app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.send(error.message || '서버에서 에러가 났습니다')
})

app.get('/', (req, res)=>{
    throw new Error('it is an error')
})
*/
app.get('/', ()=>{
    console.log('backend is ready!')
})

app.use('/users', require('./routes/users'))

app.use('/image' ,express.static(path.join(__dirname, '../uploads')))

app.listen(port, ()=>{
    console.log(`${port}번에서 실행이 되었습니다`)
})