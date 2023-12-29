const express = require('express')
const {createUser,Login,Protected,LoadUser,Verify} = require('../controllers/user')
const router = express.Router()
const {isAuthenticated} = require('../middlewares/auth')


router.post('/register',createUser)
router.post('/login',Login)

router.get('/route',(req,res)=>{
    res.send('route working properly')
})
router.get('/pass',isAuthenticated,Protected)
router.get('/user',isAuthenticated,LoadUser)
router.post('/verify',Verify)
module.exports = router