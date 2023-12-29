const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    cart:{
        type:Array,
        required:true
    },
    user:{
        type:Object,
        required:true
    },
    shippingAddress:{
        type:Object,
        required:true
    },
    totalPrice:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        default: "Processing",
    },
    paymentInfo:{
        id:{
            type: String,
        },
        status: {
            type: String,
        },
        type:{
            type: String,
        },
    },
    paidAt:{
        type: Date,
        default: Date.now(),
    },
    deliveredAt: {
        type: Date,
    },
},{timestamps:true})

module.exports = mongoose.model('Orders',orderSchema)