const LodgingController = require('../controllers/lodgingController')
const historyRoute = require('express').Router()

historyRoute.get('/histories', LodgingController.showAllHistory)

module.exports = historyRoute