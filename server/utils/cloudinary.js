const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:'',
    cloud_key:'',
    cloud_secret:''
})

module.exports = cloudinary