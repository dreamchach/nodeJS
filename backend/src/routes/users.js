const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const Product = require('../models/Product')
const Payment = require('../models/Payment')
const async = require('async')
const crypto = require('node:crypto').webcrypto;

router.post('/register', async(req, res, next)=>{
    try{
        const user = new User(req.body)
        await user.save()
        return res.sendStatus(200)
    } catch(error) {
        next(error)
    }
})

router.post('/login', async(req, res, next)=>{
    try{
        const user = await User.findOne({email:req.body.email})

        if(!user){
            return res.status(400).send('Auth failed, email not found')
        }

        const isMatch = await user.comparePassword(req.body.password)
        
        if(!isMatch) {
            return res.status(400).send('Wrong password')
        }

        const payload = {
            userId : user._id.toHexString()
        }

        const accessToken = jwt.sign(payload, process.env.Jwt, {expiresIn:'1h'})

        return res.json({user, accessToken})
    } catch(error) {
        next(error)
    }
})

router.get('/auth', auth, (req, res)=>{
    return res.json({
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        role:req.user.role,
        image:req.user.image,
        cart:req.user.cart,
        history:req.user.history
    })
})

router.post('/logout', auth, (_, res, next)=>{
    try{
        return res.sendStatus(200)
    } catch(error) {
        next(error)
    }
})

router.post('/cart', auth, async(req, res, next)=>{
    try{
        const userInfo = await User.findOne({_id:req.user._id})
        console.log(userInfo)

        let duplicate = false
        userInfo.cart.forEach((item) => {
            if(item.id === req.body.id) {
                duplicate = true
            }            
        });

        console.log(duplicate)

        if(duplicate) {
            const user = await User.findOneAndUpdate(
                {_id:req.user._id, 'cart.id':req.body.id},
                {$inc:{'cart.$.qua':1}},
                {new:true}
            )
            return res.status(201).send(user.cart)
        }else {
            const user = await User.findOneAndUpdate(
                {_id:req.user._id},
                {$push:{
                    cart:{
                        id:req.body.id,
                        qua:1,
                        date:Date.now()
                    }
                }},
                {new:true}
            )
            console.log(user)
            return res.status(201).send(user.cart)
        }
    } catch (error){
        next(error)
    }
})

router.delete('/cart', auth, async(req, res, next)=>{
    try{
        const userInfo = await User.findOneAndUpdate(
            {_id:req.user._id},
            {'$pull':{'cart':{'id':req.query.id}}},
            {new:true}
        )

        const cart = userInfo.cart
        const array = cart.map((item)=>{
            return item.id
        })

        const productInfo = await Product.find({_id:{$in:array}}).populate('writer')

        return res.json({
            productInfo,
            cart
        })
    } catch(error){
        next(error)
    }
})

router.post('/payment', auth, async(req, res)=>{
    let history = []
    let data = {}

    req.body.forEach((item)=>{
        history.push({
            dateOfPurchase: new Date().toISOString(),
            name:item.title,
            id:item._id,
            price:item.price,
            qua:item.qua,
            paymentId:crypto.randomUUID()
        })
    })

    data.user = {
        id:req.user._id,
        name:req.user.name,
        email:req.user.email
    }
    data.product = history

    const payment = new Payment(data)
    const payDocs = await payment.save()

    let products = []
    payDocs.product.forEach(item=>{
        products.push({id:item.id, qua:item.qua})
    })

    await User.findOneAndUpdate(
        {_id:req.user._id},
        {$push:{history:{$each:history}}, $set:{cart:[]}}
    )

    async.eachSeries(products, async(item)=>{
        await Product.updateOne(
            {_id:item.id},
            {$inc:{'sold':item.qua}}
        )
    }, (err)=>{
        if(err){
            return res.status(500).send(err)
        }else {
            return res.sendStatus(200)
        }
    })
})

module.exports = router