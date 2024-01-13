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
      type:String,
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
   },
   deliveryDetails:[
      {
      county:{
         type:String
      },
      district:{
         type:String
      },
      location:{
         type:String
      }
   }
   ]
},{timestamps:true})

module.exports = mongoose.model('users',userSchema)