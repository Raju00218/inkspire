const express = require('express')
const  router= express.Router()
const userController = require('../controler/userController')
const {checkUser} = require('../middleware/authMiddleware')

router.post('/',userController.signUp_post)
router.post('/login', userController.login_post)

router.get('/me',checkUser,userController.login_get )
router.get('/logout', userController.logout_get)
module.exports = router