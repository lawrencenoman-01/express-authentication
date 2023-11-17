const express = require('express')
const router = express.Router()
const { getUser, getUserById, forgotPassword } = require('../controllers/userController')
const { authorization } = require('../middlewares/auth')

router.post('/forgot-password', forgotPassword)
router.use(authorization(['admin']))
router.get('/', getUser)
router.get('/:id', getUserById)

module.exports = router