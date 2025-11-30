const express = require('express')
const  router= express.Router()
const userController = require('../controler/userController')
const {checkUser} = require('../middleware/authMiddleware')

router.post('/',userController.signUp_post)
router.post('/login', userController.login_post)

router.get('/me',checkUser,userController.login_get )
router.post('/logout', userController.logout_post)
// router.get('/verify', userController.verify_get)
module.exports = router
