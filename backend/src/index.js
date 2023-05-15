const express = require('express')
const app = express()
const port = 4000
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('hello world')
})

app.post('/', (req, res)=>{
    console.log(req.body)
    res.json(req.body)
})

app.use('/image' ,express.static(path.join(__dirname, '../uploads')))

app.listen(port, ()=>{
    console.log(`${port}번에서 실행이 되었습니다`)
})