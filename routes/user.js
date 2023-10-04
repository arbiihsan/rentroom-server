const UserController = require('../controllers/userController')
const userRoute = require('express').Router()


userRoute.post('/login', UserController.login)
userRoute.post('/register', UserController.register)
userRoute.post('/glogin', UserController.googleLogin)

userRoute.post('/customers/register', UserController.registerCostumer)
userRoute.post('/customers/login', UserController.login)
userRoute.post('/customers/glogin', UserController.googleLoginCustomer)

module.exports = userRoute
