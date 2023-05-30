const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Product = require('../models/Product')
const multer = require('multer')

const upload = multer({
    storage:multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null, 'uploads/')
        },
        filename:(req, file, cb)=>{
            cb(null, `${Date.now()}.jpg`)
        }
    })
})

router.post('/',auth, async(req, res, next)=>{
    try{
        const product = new Product(req.body)
        await product.save()
        return res.sendStatus(200)
    } catch(error) {
        next(error)
    }
})

router.post('/image',upload.single('file'),(req, res, next)=>{
    try{
        res.json({fileName : req.file.filename})
    }
    catch(error){
        return next(error)
    }
})

/*
router.delete('/upload', async(req, res, next)=>{
    console.log(req)
})
*/

router.get('/', (_, res, next)=>{
    Product.find().populate('writer').then((array)=>{
            return res.status(200).json({
                array
            })
        }).catch((err)=>{next(err)})
})

module.exports = router