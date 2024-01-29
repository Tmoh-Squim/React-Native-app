const Product = require('../models/products')
const asyncHandler = require('express-async-handler')
const cloudinary = require('../utils/cloudinary')
const sharp = require('sharp')
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const createProduct =asyncHandler( async (req,res,next) =>{
    try{
        const files = req.files;
        const imageUrls = [];
    
        for (const file of files) {
           // Resize and optimize image before uploading to Cloudinary
      const resizedImageBuffer = await sharp(file.path)
      .resize({ width: 250, height: 250, fit: 'inside' })
      .jpeg({ quality: 100 })
      .toBuffer();
    // Generate a unique filename
    const filename = `${uuidv4()}.jpg`;

    // Save the resized image buffer to a temporary file
    await fs.writeFile(filename, resizedImageBuffer);

    // Upload the temporary file to Cloudinary
    const result = await cloudinary.uploader.upload(filename, {
      folder: 'Ecommerce',
    });

    // Push the secure_url to imageUrls
    imageUrls.push(result.secure_url);

    // Remove the temporary file
    await fs.unlink(filename);
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
const rateProduct = asyncHandler(async(req,res,next)=>{
    try {
        const {rating,productId,user} = req.body
        const product = await Product.findById(productId)
        if(!product){
            res.send({
                message:'Product not found!'
            })
        }
        const rate = product.ratings += rating;
        const newProduct = await Product.findByIdAndUpdate(productId,{ratings:rate},{new:true})

        res.status(200).send({
            success:true,
            message:'product rating created successfully',
            newProduct
        })
    } catch (error) {
        next(res.status(500).send({message:'Error posting the rating'}))
    }
})
module.exports = {getAllProducts,createProduct,updateProduct,deleteProduct,rateProduct}
