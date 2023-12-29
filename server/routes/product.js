const express = require('express')
const {createProduct,getAllProducts,updateProduct} = require('../controllers/product')
const {isAuthenticated} = require('../middlewares/auth')
const {upload} = require('../utils/multer')
const router = express.Router()

router.post('/create-product',upload.array('images'),createProduct)
router.get('/all-products',getAllProducts)
router.put('/update-product/:pid',updateProduct)

module.exports = router