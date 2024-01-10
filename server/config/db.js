const mongoose = require('mongoose')

exports.connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://timoohwilliams885:y4ly6aqd9zmikfHd@cluster1.3uhu857.mongodb.net/')
    .then(console.log('mongodb connected successfully'))
    .catch((err)=>{
        console.log(err)
    })
}

