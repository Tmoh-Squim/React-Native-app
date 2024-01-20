const mongoose = require('mongoose')

const EventShema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    images:[
        {
            type:String
        }
    ],
    description:{
        type:String,
        required:true
    },
    originalPrice:{
        type:String,
    },
    discountPrice:{
        type:String,
        required:true
    },
    ratings:{
        type:Number,
        default:5
    },
    expirationTime:{
        type:Date,
        required:true
    }
},{timestamps:true})

module.exports =new mongoose.model('Events',EventShema)