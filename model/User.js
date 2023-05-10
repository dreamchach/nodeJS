const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength: 50
    },
    email: {
        type:String,
        trim:true,
        unique:1
    },
    password: {
        type:String,
        minlength:5
    },
    lastname: {
        type:String,
        maxlength:50
    },
    role: {
        type:Number,
        default:1
    },
    image:String,
    token: {
        type:String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save',  function (next) {
    const user = this
    // this =  내가 보낸 정보

    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds,  (err, salt) => {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, (err, isMatch)=>{
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    const user = this
    const token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save().then((user)=>cb(null, user)).catch((err)=>cb(err))
    /*user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
    */
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this
    jwt.verify(token, 'secretToken', function (err, decoded){
        user.findOne({"_id" : decoded, "token":token})
        .then((user)=>cb(null, user))
        .catch((err)=>{if(err) return cb(err)})
    })
}


const User = mongoose.model('User', userSchema)
module.exports = {User}