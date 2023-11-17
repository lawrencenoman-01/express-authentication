const express = require('express')
const router = express.Router()
const { getCourse, getCourseById, postCourse, updateCourse, deleteCourse } = require('../controllers/courseController')
const { authorization } = require('../middlewares/auth')

router.get('/', getCourse)
router.get('/:id', getCourseById)
router.use(authorization(['admin']))
router.post('/', postCourse)
router.put('/:id', updateCourse)
router.delete('/:id', deleteCourse)

module.exports = router