const LodgingController = require('../controllers/lodgingController')
const lodgingRoute = require('express').Router()
const { authorizeDeleteLodging, authorizeAdmin, authorizeCustomer } = require('../middleware/authorization')


lodgingRoute.post('/lodgings', LodgingController.addLodging)
lodgingRoute.get('/lodgings', LodgingController.showAllLodging)

lodgingRoute.get('/customers/bookmarks', authorizeCustomer, LodgingController.bookmarkList)
lodgingRoute.post('/customers/bookmarks/:lodgingId', authorizeCustomer, LodgingController.addBookMark)
lodgingRoute.delete('/customers/bookmarks/:lodgingId', authorizeCustomer, LodgingController.deleteBookmark)

lodgingRoute.delete('/lodgings/:id', authorizeDeleteLodging, LodgingController.deleteLodging)
lodgingRoute.put('/lodgings/:id', authorizeDeleteLodging, LodgingController.updateLodging)
lodgingRoute.patch('/lodgings/:id', authorizeAdmin, LodgingController.updateLodgingStatus)


module.exports = lodgingRoute