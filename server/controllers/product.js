const Product = require('../models/products')


const createProduct = async (req,res) =>{
    const {name,description,discountPrice,originalPrice,stock,category} = req.body

   const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
    //    const imageUrls = [];
    //    for (const file of files) {
          // Upload each image file to Cloudinary
      //    const result = await cloudinary.uploader.upload(file.path);
      //    const urls = result.secure_url
      //    imageUrls.push(urls);
      //  }

        const productData = req.body;
      productData.images = imageUrls;

        const product = await Product.create(productData); 

        res.status(201).json({
          success: true,
          imageUrls,
          product,
        });
}
const getAllProducts = async (req,res)=>{
    try {
        const products = await Product.find({}).sort({createdAt:-1})

        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in getAllProducts controller"
        })
        console.log(error)
    }
}
const updateProduct = async (req,res)=>{
    try {

        const {name,description,stock,discountPrice,originalPrice,category} = req.body
        const id = req.params.pid

        const product = await Product.findByIdAndUpdate(id,{name,description,stock,discountPrice,originalPrice,category},{new:true})
        await product.save()
        res.status(200).send({
            success:true,
            message:'Product updated successfully',
            product
        })
    } catch (error) {
        res.status(400).send({
            message:'Error in update product controller'
        })
        console.log(error)
    }
}
module.exports = {getAllProducts,createProduct,updateProduct}