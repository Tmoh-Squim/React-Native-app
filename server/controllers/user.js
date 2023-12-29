const User = require('../models/users')
const {hashPassword,comparePassword} = require('../helpers/hashPassword')
const JWT = require('jsonwebtoken')
const textflow = require('textflow.js')

const createUser = async(req,res)=>{
    try {
        const {name,email,phone,password} = req.body

        const check = await User.findOne({email,phone})
        if(check){
            res.status(200).send({
                success:false,
                message:'Email or Phone is already registred'
            })
        }

        const hashed = await hashPassword(password)
        const newUser = {name,email,phone,password:hashed}

        const user = await User.create(newUser)

        res.status(200).send({
            success:true,
            message:'Account created successfully',
            user
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in register controller'
        })
    }
}

const Login = async (req,res) =>{
    try {
        const {phone,password} = req.body;

        const user = await User.findOne({phone})
        const match = await comparePassword(password,user.password)

        if(!match){
            res.status(401).send({
                success:false,
                message:'Wrong credentials'
            })
        }
        const token =await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:'7d'
        })
        res.status(200).send({
            success:true,
            message:'Logged in successfully',
            user,
            token
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in login controller'
        })
    }
}
//verification code

textflow.useKey("cFhZuo71n23TstL7fGpBFPVhWP3dv5a9cUxGm9eVviydEZlYjItfA1EXkudAc6Tz")

 const Verify=async(req,res)=>{
    try {
        console.log(req.body)

        const {phone}= req.body
        var result= await textflow.sendVerificationSMS(phone)

        if(result.ok)
           return res.status(200).send('verification code sent')
           return res.status(400).send('error in sending the code')
    } catch (error) {
        console.log(error)
    }

    
}

//protected route

const Protected = async (req,res)=>{
    res.send('This is protected route')
}
//load User
 const LoadUser=async(req,res,next)=>{
    try {
      const user = await User.findById(req.user._id);
  
      if (!user) {
        res.status(404).send({
          success:false,
          message:"user not registerd"
        })
      }
  
      res.status(200).send({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).send({
        success:false,
        message:"error when loading user"
      })
    }
  }

module.exports = {createUser,Login,Protected,LoadUser,Verify}