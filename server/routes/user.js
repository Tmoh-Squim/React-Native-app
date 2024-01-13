const express = require('express')
const {createUser,Login,Protected,LoadUser,Verify,getUsers,deleteUser,updateUser} = require('../controllers/user')
const router = express.Router()
const {isAuthenticated,isAdmin} = require('../middlewares/auth')


router.post('/register',createUser)
router.post('/login',Login)

router.get('/route',(req,res)=>{
    res.send('route working properly')
})
router.get('/pass',isAuthenticated,isAdmin,Protected)
router.get('/user',isAuthenticated,LoadUser)
router.post('/verify',Verify)
router.get('/all-users',isAuthenticated,isAdmin,getUsers)
router.delete('/delete-user/:pid',isAuthenticated,isAdmin,deleteUser)
router.put('/update-user',updateUser)
module.exports = router