const express = require('express')
const router = express.Router()
const { getCategory, getCategoryById, postCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { authorization } = require('../middlewares/auth')

router.use(authorization(['admin']))
router.get('/', getCategory)
router.get('/:id', getCategoryById)
router.post('/', postCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router