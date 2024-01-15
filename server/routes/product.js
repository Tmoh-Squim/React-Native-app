const express = require('express')
const {createProduct,getAllProducts,updateProduct,deleteProduct} = require('../controllers/product')
const {isAuthenticated,isAdmin} = require('../middlewares/auth')
const {upload} = require('../utils/multer')
const router = express.Router()

router.post('/create-product',upload.array('images'),isAuthenticated,createProduct)
router.get('/products',getAllProducts)
router.put('/update-product/:id',isAuthenticated,updateProduct)
router.delete('/delete-product/:pid',isAuthenticated,deleteProduct)

module.exports = router