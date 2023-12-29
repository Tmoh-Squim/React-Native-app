const express = require('express')
const {createOrder,userOrders} = require('../controllers/order')
const {isAuthenticated} = require('../middlewares/auth')
const router = express.Router()

router.post('/create-order',isAuthenticated,createOrder)
router.get('/user-order/:pid',isAuthenticated,userOrders)


module.exports=router