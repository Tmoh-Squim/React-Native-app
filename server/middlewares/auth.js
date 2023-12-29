const User = require('../models/users')
const JWT = require('jsonwebtoken')

const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.headers.Authorization;
        if(!token){
            res.status(404).send({
                success:false,
                message:'Please login to continue'
            })
           const decode = JWT.verify(req.headers.Authorization,process.env.JWT_SECRET)
           req.user = decode
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {isAuthenticated}