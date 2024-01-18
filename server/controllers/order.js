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

    res.status(201).send({
      success: true,
      message:"Order created successfully",
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
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this id", 400));
    }
    if (req.body.status === "Transferred to delivery partner") {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.cartQuantity);
      });
    }

    order.status = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message:"Status updated successfully",
    });

    async function updateOrder(id, cartQuantity) {
      const product = await Product.findById(id);
      if (!product){
        return next(res.send({message:'Error occured'}))
      }
      else{
        product.stock -= cartQuantity;
        product.sold_out += cartQuantity;
  
        await product.save({ validateBeforeSave: false });
      }

    }

  } catch (error) {
    return next(res.status(500).send({message:"Error updating status"}));
    console.log(error)
  }
})
module.exports = { createOrder, userOrders,AllOrders,OrderDetails,updateOrderStatus};
