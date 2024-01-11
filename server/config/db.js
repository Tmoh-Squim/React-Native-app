const mongoose = require('mongoose')

exports.connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        .then(console.log('mongodb connected successfully'))
        .catch((err)=>{
            console.log(err)
        })
    } catch (error) {
        console.log('error',error)
    }
   
}
