const express = require('express')
const auth = require('./auth')
const userRoute = require('./userRoutes')
const categoryRoute = require('./categoryRoutes')
const courseRoute = require('./courseRoutes')
const { authentication, authorization } = require('../middlewares/auth')
const router  = express.Router()

router.use('/auth', auth)
router.use(authentication)
router.use('/user', userRoute)
router.use('/category', categoryRoute)
router.use('/course', courseRoute)

module.exports = router