const { Category, Course } = require('../models')
const handleServerError = require('../helpers/serverError')
const handleClientError = require('../helpers/clientError')
const Joi = require('joi')

// Get All Category
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [
        {
          model: Course,
          attributes: ['title'],
        }
      ],
    })

    return res.status(200).json({
      data: category,
      message: 'Success Get All Category'
    })

  } catch (err) {
    handleServerError(res)
  }
}

// Get Category By Id
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findByPk(id, {
      include: [
        {
          model: Course,
          attributes: ['title'],
        }
      ],
    })

    if (!category) {
      handleClientError(res, 404, 'Category with the specified ID does not exists.')
    }

    return res.status(200).json({
      data: category,
      message: `Success Get Category with id ${id}`
    })

  } catch (err) {
    handleServerError(res)
  }
}

// Create Category
exports.postCategory = async (req, res) => {
  try {
    const newData = req.body
    const name = req.body.name
    const { id: userId } = req.loggedUser

    const categoryScheme = Joi.object({
      name: Joi.string().min(5).required(),
    })

    const { error } = categoryScheme.validate(newData)
    if (error) {
      return res.status(400).json({
        status: 'Validation Failed',
        message: error.details[0].message,
      })
    }

    const nameExist = await Category.findOne({
      where: { name },
    })
    if (nameExist) {
      return handleClientError(res, 404, 'Category name does not same.')
    }

    const createCategory = await Category.create({
      ...newData,
      createdBy: userId,
    })

    return res.status(201).json({
      data: createCategory,
      message: 'Successfully Added Category'
    })


  } catch (err) {
    handleServerError(res)
  }
}

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const name = req.body.name
    
    const findCategory = await Category.findByPk(id)
    if (!findCategory) {
      handleClientError(res, 404, `Category with the specified ID does not exists`)
    }

    const categoryUpdateScheme = Joi.object({
      name: Joi.string().min(5).required(),
    })

    const { error } = categoryUpdateScheme.validate(newData)
    if (error) {
      return res.status(400).json({
        status: 'Validation Failed',
        message: error.details[0].message,
      })
    }

    const nameExist = await Category.findOne({ where: { name }})
    if (nameExist) {
      return handleClientError(res, 404, 'Category name does not same.')
    }

    const { id: userId, role } = req.loggedUser
    if(role !== 'admin') {
      return handleClientError(res, 404, 'Forbidden access this route');
    }

    const updateData = await findCategory.update({
      ...newData,
      updatedBy: userId,
    })

    return res.status(200).json({
      data: updateData,
      message: 'Category updated Successfully'
    })

  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params
    const findCategory = await Category.findByPk(id)

    if (!findCategory) {
      handleClientError(res, 404, 'Category with the specified ID does not exists')
    }

    const { role } = req.loggedUser
    if (role !== 'admin') {
      return handleClientError(res, 404, 'Forbidden access this route')
    }

    await findCategory.destroy()
    return res.status(200).json({
      message: `Category deleted`
    })

  } catch (err) {
    handleServerError(res)
  }
}