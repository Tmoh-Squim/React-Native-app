const mongoose = require('mongoose')

exports.connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://timoohwilliams885:htzEXFhsVO6LNJXe@cluster0.pstemoz.mongodb.net/')
    .then(console.log('mongodb connected successfully'))
    .catch((err)=>{
        console.log(err)
    })
}

