const Order = require("../models/orders");
const asyncHandler = require('express-async-handler')
const Product = require("../models/products")
const createOrder = asyncHandler( async (req, res,next) => {
  try {
    const { cart, deliveryDetails, user, paymentInfo, totalPrice } = req.body;

    const order = await Order.create({
      cart: cart,
      deliveryDetails,
      user,
      totalPrice,
      paymentInfo,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    next(  res.status(500).send({
      success: false,
      message: "Error in create order controller",
    }))
    console.log(error);
  }
})
//get all orders for  user
const userOrders = asyncHandler(async (req, res,next) => {
  try {
    
    const orders =await Order.find({ "user._id": req.params.pid }).sort({
      createdAt: -1,
    });
    if(!orders){
      res.send("No orders found for this user")
    }
    res.status(200).send({
      success: true,
      message: "Order fetched successfully",
      orders,
      
    });
  } catch (error) {
    next(res.status(500).send({
      success: false,
      message: "Error in userOrders controller",
    }))
    
  }
})
//admin all orders 
const AllOrders = asyncHandler(async(req,res,next)=>{
  try {
    const orders = await Order.find({}).sort({createdAt:-1})
    res.status(200).send({
      success:true,
      message:"All orders fetched successfully",
      orders
    })
  } catch (error) {
    next(res.status(500).send({
      success:false,
      message:'Error in getting all orders'
    }))
  }
})
//get order details by id
const OrderDetails = asyncHandler(async(req,res,next)=>{
  try {
    const order = await Order.findById(req.params.id)
    if(!order){
      next(res.send({
        success:false,
        message:"Order with this id can't be found"
      }))
    }
    res.status(200).send({
      success:true,
      message:'Order details fetched successfully',
      order
    })
  } catch (error) {
     next(res.status(500).send({
      success:false,
      message:"Error in Order details controller"
     }))
  }
})
const updateOrderStatus = asyncHandler(async(req,res,next)=>{
  try {
    const order = await Order.findById(req.params.pid)
    if(!order){
      next(res.status(400).send({
        success:false,
        message:"Order with this id can't be found"
      }))
    }
    if(req.body.status === "Transferred to Delivery Partner"){
       order.cart.forEach(async(o)=>{
        await updateOrder(o._id,o.cartQuantity)
       })
    }
    order.status = req.body.status
    async function updateOrder(pid,cartQuantity) {
      const product = await Product.findById(pid)
      product.stock -= cartQuantity
      product.sold_out += cartQuantity
      await product.save({validateBeforeSave:false})
    }
  } catch (error) {
    next(res.status(500).send({
      success:false,
      message:"Error in updating order status"
    }))
  }
})
module.exports = { createOrder, userOrders,AllOrders,OrderDetails,updateOrderStatus};
