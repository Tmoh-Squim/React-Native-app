const express = require('express')
const {createOrder,userOrders,AllOrders,OrderDetails,updateOrderStatus} = require('../controllers/order')
const {isAuthenticated,isAdmin} = require('../middlewares/auth')
const router = express.Router()

router.post('/create-order',isAuthenticated,createOrder)
router.get('/user-order/:pid',isAuthenticated,userOrders)
router.get('/orders',isAuthenticated,AllOrders)
router.get('/order-details/:id',isAuthenticated,OrderDetails)
router.put('/update-order/:id',isAuthenticated,updateOrderStatus)


module.exports=router