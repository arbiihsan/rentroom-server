
const typeController = require('../controllers/typeController')
const typeRoute = require('express').Router()


typeRoute.get('/types', typeController.showAllTypes)
typeRoute.post('/types', typeController.addType)


module.exports = typeRoute

