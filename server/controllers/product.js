const Product = require('../models/products')
const asyncHandler = require('express-async-handler')
const cloudinary = require('../utils/cloudinary')
const sharp = require('sharp')
const createProduct =asyncHandler( async (req,res,next) =>{
    try {
        const files = req.files;
        const imageUrls = [];
    
        for (const file of files) {
          // Resize and optimize image before uploading to Cloudinary
          const resizedImageBuffer = await sharp(file.path)
            .resize({ width: 100, height: 100, fit: 'inside' })
            .jpeg({ quality: 80 }) // Adjust quality as needed
            .toBuffer();
    
            const result = await cloudinary.uploader.upload(resizedImageBuffer, {
                folder: 'Ecommerce',
              });
        
              const imageUrl = result.secure_url;
              imageUrls.push(imageUrl);
            }
    
        const productData = req.body;
        productData.images = imageUrls;
    
        const product = await Product.create(productData);
    
        res.status(201).json({
          success: true,
          message: 'Product created successfully',
          imageUrls,
          product,
        });
      } catch (error) {
        next(res.status(500).send({ message: 'Error in creating product' }));
        console.error(error);
      }
    });
const getAllProducts = asyncHandler(async (req,res,next)=>{
    try {
        const products = await Product.find({})

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
        console.log(req.body)
        const id = req.params.id

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
        console.log(error)
    }
}) 
const deleteProduct = asyncHandler(async(req,res,next)=>{
    try {
        const id = req.params.pid
        const check = await Product.findById(id)
        if(!check){
            next(res.send({message:'product with this id not found'}))
        }else{
            await Product.findByIdAndDelete(id)
            res.status(200).send({
                success:true,
                message:'Product deleted successfully'
            })
        }
    } catch (error) {
        next(res.status(500).send({success:false,message:'internal server error'}))
        console.log(error)
    }
})
module.exports = {getAllProducts,createProduct,updateProduct,deleteProduct}
