const { Course, Category } = require('../models')
const Joi = require('joi')
const handleClientError = require('../helpers/clientError')
const handleServerError = require('../helpers/serverError')

// Get All Course
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findAll({
      include: [
        {
          model: Category,
          attributes: ['name']
        }
      ],
    })

    return res.status(200).json({
      data: course,
      message: 'Success Get All Course'
    })

  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}

// Get Course By Id
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params
    const course = await Course.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ['name']
        }
      ],
    })

    if(!course) {
      handleClientError(res, 404, 'Course with the specified ID does not exists')
    }

    return res.status(200).json({
      data: course,
      message: `Success Get Course By id ${id}`
    })

  } catch (err) {
    handleServerError(res)
  }
}

// Create Course
exports.postCourse = async (req, res) => {
  try {
    const newData = req.body
    const title = req.body.title

    const courseScheme = Joi.object({
      title: Joi.string().min(5).required(),
      description: Joi.string().min(5).required(),
      categoryId: Joi.number().required(),
      adminId: Joi.number().required(),
    })

    const { error } = courseScheme.validate(newData)
    if (error) {
      return res.status(400).json({
        status: 'Validation Failed',
        message: error.details[0].message,
      })
    }

    const titleExist = await Course.findOne({
      where: { title },
    })
    if (titleExist) {
      return handleClientError(res, 404, 'Course name does not same')
    }

    const createCourse = await Course.create(newData)

    return res.status(201).json({
      data: createCourse,
      message: 'Successfully Added Course'
    })

  } catch (err) {
    handleServerError(res)
  }
}

// Update Course
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const title = req.body.title

    const findCourse = await Course.findByPk(id)
    if (!findCourse) {
      handleClientError(res, 404, `Course with the specified ID does not exists`)
    }

    const courseUpdateScheme = Joi.object({
      title: Joi.string().min(5).required(),
      description: Joi.string().min(5).required(),
      categoryId: Joi.number().required(),
    })

    const { error } = courseUpdateScheme.validate(newData)
    if (error) {
      return res.status(400).json({
        status: 'Validation Failed',
        message: error.details[0].message,
      })
    }

    const titleExist = await Course.findOne({ where: { title }})
    if (titleExist) {
      return handleClientError(res, 404, 'Course title does not same')
    }

    const updateData = await findCourse.update(newData)

    return res.status(200).json({
      data: updateData,
      message: 'Course updated Successfully'
    })

  } catch (err) {
    handleServerError(res)
  }
}

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params
    const findCourse = await Course.findByPk(id)

    if(!findCourse) {
      handleClientError(res, 404, 'Course with the specified ID does not exists')
    }

    await findCourse.destroy()
    return res.status(200).json({
      message: `Course deleted`
    })

  } catch (err) {
    handleServerError(res)
  }
}