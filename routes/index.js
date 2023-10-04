const router = require('express').Router()
const userRoutes = require('./user')
const lodgingRoutes = require('./lodging')
const typeRoutes = require('./type')
const historyRoutes = require('./history')
const customerRoute = require('./customer')
const authentication = require('../middleware/authentication')


router.use(userRoutes)
router.use(customerRoute)

router.use(authentication)

router.use(lodgingRoutes)
router.use(typeRoutes)
router.use(historyRoutes)


module.exports = router
