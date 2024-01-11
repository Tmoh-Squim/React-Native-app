const mongoose = require('mongoose')

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('mongodb connected successfully')
        
    } catch (error) {
        console.log('error',error)
    }
   
}

module.exports = connectDB