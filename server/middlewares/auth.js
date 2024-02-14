const User = require('../models/users')
const JWT = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if(!token){
           next(res.status(404).send({
            success:false,
            message:'Please login to continue'
        })) 
        }
        const decode = JWT.verify(token,process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
    }
}
const isAdmin = asyncHandler(async(req,res,next)=>{
    try {
        const user = await User.findById(req.user._id)
        if(user.role !== 'Admin'){
            next(res.status(404).send({success:false,message:'Unauthorized access!'}))
        }
        else{
            next()
        }
    } catch (error) {
        next(res.status(500).send({success:false,message:'internal server error'}))
    }
})

module.exports = {isAuthenticated,isAdmin}