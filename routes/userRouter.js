
const express = require('express')
const userController = require('../controller/userController')
const userRouter = new express.Router()

userRouter.get('/',userController.home)
userRouter.post('/register',userController.register)
userRouter.post('/login',userController.login)


module.exports = userRouter