const mongoose = require('mongoose')

exports.connectDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URL,{
        useUnifiedTopology:true)
    .then(console.log('mongodb connected successfully'))
    .catch((err)=>{
        console.log(err)
    })
}

