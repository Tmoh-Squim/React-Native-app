const express = require('express')
const {createProduct,getAllProducts,updateProduct,deleteProduct} = require('../controllers/product')
const {isAuthenticated,isAdmin} = require('../middlewares/auth')
const {upload} = require('../utils/multer')
const router = express.Router()

router.post('/create-product',upload.array('images'),isAuthenticated,isAdmin,createProduct)
router.get('/products',getAllProducts)
router.put('/update-product/:id',isAuthenticated,isAdmin,updateProduct)
router.delete('/delete-product/:pid',isAuthenticated,isAdmin,deleteProduct)

module.exports = router