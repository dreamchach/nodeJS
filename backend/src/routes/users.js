const express = require('express')
const router = express.Router()

app.post('/register', async(req, res)=>{
    try{
        const user = new User(req.body)
        await user.save()
        return res.sendStatus(200)
    } catch(error) {
        next(error)
    }
})

module.exports = router