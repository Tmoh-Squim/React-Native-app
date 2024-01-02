const Product = require('../models/products')
const asyncHandler = require('express-async-handler')

const createProduct =asyncHandler( async (req,res,next) =>{
    try {
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
        //updated
     
             const productData = req.body;
           productData.images = imageUrls;
     
             const product = await Product.create(productData); 
     
             res.status(201).json({
               success: true,
               imageUrls,
               product,
             });
    } catch (error) {
        next(res.status(500).send({message:'Error in create product'}))
    }
})
const getAllProducts = asyncHandler(async (req,res,next)=>{
    try {
        const products = await Product.find({}).sort({createdAt:-1})

        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        next( res.status(500).send({
            success:false,
            message:"Error in getAllProducts controller"
        })
        )  
    }
}) 
const updateProduct = asyncHandler(async (req,res,next)=>{
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
        next( res.status(400).send({
            message:'Error in update product controller'
        }))
       
    }
}) 
const deleteProduct = asyncHandler(async(req,res,next)=>{
    try {
        const id = req.params.pid
        const check = await Product.findById(id)
        if(!check){
            next(res.send({message:'product with this id not found'}))
        }else{
            await User.findByIdAndDelete(id)
            res.status(200).send({
                success:true,
                message:'Product deleted successfully'
            })
        }
    } catch (error) {
        next(res.status(500).send({success:false,message:'internal server error'}))
    }
})
module.exports = {getAllProducts,createProduct,updateProduct,deleteProduct}
