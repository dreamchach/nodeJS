const express = require('express')
const app = express()
const port = 5000
// const bodyParser = require('body-parser')
const {User}=require('./model/User')
const cookieParser = require('cookie-parser')

require('dotenv').config()

// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())
// app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(process.env.mongoDB_URI, {
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

app.post('/login', (req, res)=>{
    User.findOne({email:req.body.email})
    .then(user=>{
        if(!user) {
            return res.json({
                loginSuccess:false,
                message: '제공된 이메일에 해당하는 유저가 없습니다'
            })
        }

        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false, message:'비밀번호가 틀렸습니다'})

            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err)
                res.cookie('x_auth', user.token)
                .status(200)
                .json({
                    loginSuccess:true,
                    userId:user._id
                })
            })
        })
    })
    .catch((err)=>{
        return res.status(400).send(err)
    })
})


app.listen(port, ()=>console.log('port', port))
