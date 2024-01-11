const express = require('express')
const {createOrder,userOrders,AllOrders,OrderDetails,updateOrderStatus} = require('../controllers/order')
const {isAuthenticated,isAdmin} = require('../middlewares/auth')
const router = express.Router()

router.post('/create-order',isAuthenticated,createOrder)
router.get('/user-order/:pid',isAuthenticated,userOrders)
router.get('/orders',isAuthenticated,isAdmin,AllOrders)
router.get('/order-details/:id',isAuthenticated,OrderDetails)
router.put('/order-status/:pid',isAuthenticated,isAdmin,updateOrderStatus)


module.exports=router