const express = require('express')
const app = express()
const port = 5000
// const bodyParser = require('body-parser')
const {User}=require('./model/User')

// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())
// app.use(express.urlencoded({extended:true}))
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://aaa:asdf1234@node-test.uim33ep.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>console.log('mongoDB is connected')).catch((error)=>console.log(error))

app.get('/', (req, res)=>res.send('hello world'))

app.post('/register', (req, res)=>{
    const user = new User(req.body)
    
//    user.save((error, userInfo)=>{
//        if(error) return res.json({success:false, err})
//        return res.status(200).json({
//            success:true
//        })
//    })
    user.save().then(()=>{
        return res.status(200).json({
            success:true
        })
    }).catch((error)=>{
        console.error(error)
        return res.json({success:false, error})
    })
})

app.listen(port, ()=>console.log('port', port))
