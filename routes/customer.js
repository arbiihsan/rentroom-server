const LodgingController = require('../controllers/lodgingController')
const typeController = require('../controllers/typeController')
const customerRoute = require('express').Router()

customerRoute.get('/customers/lodgings', LodgingController.showAllLodgingCustomer)
customerRoute.get('/customers/types', typeController.showAllTypes)
customerRoute.post('/customers/generate-qr', LodgingController.generateQr)
customerRoute.get('/customers/lodgings/:id', LodgingController.showLodgingById)


module.exports = customerRoute