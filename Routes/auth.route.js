const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const {authSchema} = require('../validation/validation_schema')
const { signAccessToken } = require('../helper/jwt_helper')

const User = require('../Models/user.model')

router.post('/register', async (req, res, next)=>{
    console.log(req.body)
    try {
        const result = await authSchema.validateAsync(req.body)
       
        const userExist = await User.findOne({email:result.email})
        if(userExist) throw createError.Conflict(`${email} is already been registered`)
        const user = new User({email : result.email,password : result.password})
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id)
        res.send({accessToken}) 

        
    } catch (error) {
        if(error.isJoi === true) error.status = 422
        next(error)
    }

    // res.send('register route')
})

router.post('/login', async (req, res, next)=>{
    res.send('login route')
})

router.post('/refresh-token', async (req, res, next)=>{
    res.send('refresh route')
})

router.post('/logout', async (req, res, next)=>{
    res.send('logout route')
})

module.exports = router