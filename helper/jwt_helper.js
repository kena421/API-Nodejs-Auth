const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {
    signAccessToken : (userId)=>{
        return new Promise((resolve, reject)=>{
            const payload = {
               
                
            }
            const secret = "some super secret"
            const options = {
                expiresIn : "1h",
                issuer : "navprayas.in",
                audience : userId
            }
            jwt.sign(payload, secret, options, (err, token)=>{
                if(err)  return reject(err)
                resolve(token)
            })
        })
    }
}