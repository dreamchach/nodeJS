const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://aaa:asdf1234@node-test.uim33ep.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>console.log('mongoDB is connected')).catch((error)=>console.log(error))

app.get('/', (req, res)=>res.send('hello world'))
app.listen(port, ()=>console.log('port', port))
