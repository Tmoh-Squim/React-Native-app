const Order = require("../models/orders");

const createOrder = async (req, res) => {
  try {
    const { cart, shippingAddress, user, paymentInfo, totalPrice } = req.body;

    const order = await Order.create({
      cart: cart,
      shippingAddress,
      user,
      totalPrice,
      paymentInfo,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in create order controller",
    });
    console.log(error);
  }
};
//get all orders for a user
const userOrders = async (req, res) => {
  try {
    const orders =await Order.find({ "user._id": req.params.pid }).sort({
      createdAt: -1,
    });
    res.status(200).send({
      success: true,
      message: "Order created successfully",
      orders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in userOrders controller",
    });
  }
};
module.exports = { createOrder, userOrders };
