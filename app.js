const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helper/init_mongodb.js')

//Importing routes
const authRoute = require('./Routes/auth.route')
 

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', async (req, res, next)=>{
    res.send("hello from express")
})

app.use('/auth', authRoute)

//catching other routes
app.use(async (req,res,next) => {
  
  next(createError.NotFound('Not Found'))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error : {
            status : err.status || 500,
            message : err.message
        }
    })
  
})



const PORT = process.env.PORT || 3000

app.listen(PORT , () => {
  console.log(`Server running at  port ${PORT}`)
} )