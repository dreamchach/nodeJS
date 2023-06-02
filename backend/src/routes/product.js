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
            console.log(file)
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

router.get('/', async(req, res, next)=>{
    const order = req.query.order ? req.query.order : 'desc'
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    const limit = req.query.limit ? Number(req.query.limit) : 20
    const skip = req.query.skip ? Number(req.query.skip) : 0
    const term = req.query.searchTerm

    let args={}
    console.log(req.query.filters)
    // { continents: [ '3', '6', '1', '2', '4', '7' ] }

    for(let key in req.query.filters){
        console.log(key)
        // continents

        if(req.query.filters[key].length > 0){
            if(key === 'price'){
                args[key]={
                    $gte:req.query.filters[key][0],
                    $lte:req.query.filters[key][1]
                }
            }else {
                args[key]=req.query.filters[key]
            }
        }
    }
    console.log(args)
    // { continents: [ '3', '6', '1', '2', '4', '7' ] }

    console.log(term)
    
    if(term){
        args['$text']={$search:term}
    }

    try {
        const product = await Product.find(args).populate('writer').sort({[sortBy]:order}).skip(skip).limit(limit)
        const productsTotal = await Product.countDocuments(args)
        const hasMore = skip+limit < productsTotal ? true : false
        
        return res.status(200).json({
            product,
            hasMore
        })
        
    } catch (error) {
        next(error)        
    }
})

module.exports = router