const express = require('express')
const app = express()
const port = 5000
const {User}=require('./model/User')
const cookieParser = require('cookie-parser')
const {auth}=require('./middleware/auth')
const mongoose = require('mongoose')

require('dotenv').config()

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.mongoDB_URI, {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>console.log('mongoDB is connected')).catch((error)=>console.log(error))

app.get('/', (req, res)=>{
    res.send('hello world')
})

app.post('/api/user/register', (req, res)=>{
    const user = new User(req.body)

    user.save().then(()=>{
        return res.status(200).json({
            success:true
        })
    }).catch((error)=>{
        console.error(error)
        return res.json({success:false, error})
    })
})

app.post('/api/user/login', (req, res)=>{
    User.findOne({email:req.body.email})
    .then(user=>{
        console.log(user)
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

app.get('/api/user/auth', auth, (req, res)=>{
    res.status(200).json({
        _id:req.user._id,
        isAdmin:req.user.role === 0 ? false : true,
        isAuth:true,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname,
        role:req.user.role,
        image:req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res)=>{
    User.findOneAndUpdate({_id:req.user._id} , {token: ''})
    .then((user)=>{
        return res.status(200).send({
            success:true
        })
    }).catch((err)=>{
        if(err) return res.json({success:false, err})
    })
})


app.listen(port, ()=>console.log('port', port))
