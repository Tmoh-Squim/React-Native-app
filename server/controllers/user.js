const User = require('../models/users')
const {hashPassword,comparePassword} = require('../helpers/hashPassword')
const JWT = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const textflow = require('textflow.js')
const twilio = require('twilio')
const createUser = asyncHandler(async(req,res,next)=>{
    try {
        const {name,email,phone,password} = req.body

        const check = await User.findOne({phone})
        if(check){
            next(res.status(403).send({
                success:false,
                message:"Phone already registerd!"
            }))
        }else{
        const hashed = await hashPassword(password)
        const newUser = {name,email,phone,password:hashed}

        const user = await User.create(newUser)

        res.status(200).send({
            success:true,
            message:'Account created successfully',
            user
        })
    }
    } catch (error) {
        next(  res.status(500).send({
            success:false,
            message:'Error in register controller'
        }))
console.log(error)
    }
}
) 
const Login = asyncHandler(async (req,res,next) =>{
    try {
        const {phone,password} = req.body;

        const user = await User.findOne({phone})
        const match = await comparePassword(password,user.password)

        if(!match){
            next(res.status(401).send({
                success:false,
                message:'Wrong credentials'
            }))
        }else if(!user){
        next(res.status(401).send({
            success:false,
            message:'Phone number not registerd!'
        }))
    }
        else{
        const token =await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:'7d'
        })
        res.status(200).send({
            success:true,
            message:'Logged in successfully',
            user,
            token
        })
        }
    } catch (error) {
        next(res.status(500).send({
            success:false,
            message:'Error in login controller'
        }))

    }
}) 
//verification code

textflow.useKey("cFhZuo71n23TstL7fGpBFPVhWP3dv5a9cUxGm9eVviydEZlYjItfA1EXkudAc6Tz")
const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN
const twilioPhone = process.env.TWILIO_PHONE

const client = twilio(accountSid,authToken)

 const Verify=async(req,res)=>{
    try {
        const {phone} = req.body
        const resetCode = Math.floor(1000 + Math.random() * 9000).toString()

        const message = await client.messages.create({
            body: `Your reset code is: ${resetCode}`,
            from: twilioPhone,
            to: phone,
          });
      
          console.log(`Message SID: ${message.sid}`);
      
        res.status(200).send({
            success:true,
            message:`Reset code sent successfully: ${phone} : ${resetCode}`
        })
    } catch (error) {
        res.status(500).send('Error sending the code')
        console.log(error)
    }

    
}

//protected route

const Protected = async (req,res)=>{
    res.send('This is protected route')
}
//load User
 const LoadUser= asyncHandler(async(req,res,next)=>{
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
        next(  res.status(500).send({
            success:false,
            message:"error when loading user"
          }))
    
    }
  }) 
  //update user details
  const updateUser =  asyncHandler(async(req,res,next)=>{
    try {
        const {user,email,phone,deliveryDetails} = req.body
        
        const check = await User.findById(user._id)
        if(!check){
            next(res.status(403).send({
                success:false,
                message:"User not found!"
            }))
        }
            const newUser = await User.findByIdAndUpdate(user._id,{email,phone,deliveryDetails},{new:true} )

            res.status(200).send({
                success:true,
                message:"Details updated successfully",
                newUser
            })
    } catch (error) {
        next(res.status(500).send({
            message:"Error in updating details"
        }))
        console.log(error)
    }
  })
//admin get all-users
const getUsers = asyncHandler(async(req,res,next)=>{
    try {
        const users = await User.find({}).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:'All users fetched sucessfully',
            users,
        })
    } catch (error) {
        next(res.status(500).send({message:'internal server error'}))
    }
})
//admin delete-user
const deleteUser = asyncHandler(async(req,res,next)=>{
    try {
        const id = req.params.pid
        const check = await User.findById(id)
        if(!check){
            next(res.send({message:'user with this id not found'}))
        }else{
            await User.findByIdAndDelete(id)
            res.status(200).send({
                success:true,
                message:'User deleted successfully'
            })
        }
    } catch (error) {
        next(res.status(500).send({message:'internal server error'}))
        console.log(error)
    }
})
module.exports = {createUser,Login,Protected,LoadUser,Verify,getUsers,deleteUser,updateUser}