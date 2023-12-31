const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
   name:{
      type:String,
      required:true
   },
   email:{
      type:String,
      unique:true,
      required:true
   },
   phone:{
      type:Number,
      unique:true,
      required:true
   },
   password:{
      type:String,
      required:true
   },
   role:{
      type:String,
      default:'user'
   }
},{timestamps:true})

module.exports = mongoose.model('users',userSchema)