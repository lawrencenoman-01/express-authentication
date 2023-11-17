const { User } = require('../models')
const handleServerError = require('../helpers/serverError')
const handleClientError = require('../helpers/clientError')
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/jwt')
const sendForgotPasswordEmail = require('../utils/nodeMailer')

// Register User
exports.register = async (req, res) => {
  try {
    const newData = req.body
    const email = req.body.email

    const registerScheme = Joi.object({
      username: Joi.string().min(5).required(),
      role: Joi.string().valid('user', 'admin'),
      email: Joi.string().required(),
      password: Joi.string().min(6).required(),
    })

    const { error } = registerScheme.validate(newData)
    if (error) {
      return res.status(400).json({
        status: 'Validation Failed',
        message: error.details[0].message,
      })
    }

    const emailExist = await User.findOne({ where: { email }})
    if (emailExist) {
      return handleClientError(res, 404, 'Email does not same.')
    }

    const registerUser = await User.create(newData)
    return res.status(200).json({
      data: registerUser,
      message: 'Successfully Register User Account',
    })

  } catch (err) {
    handleServerError(res)
  }
}

// Login User
exports.login = async (req, res) => {
  try {
    const {newData} = req.body
    const email = req.body.email
    const password = req.body.password

    const loginScheme = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })

    const { error } = loginScheme.validate(newData)
    if (error) {
      return res.status(400).json({
        status: 'Validation Failed',
        message: error.details[0].message,
      })
    }

    const findUser = await User.findOne({ where: { email }})
    if (!findUser) {
      return handleClientError(res, 404, `User with this email ${email} does not exist.`)
    }

    const comparePassword = bcrypt.compareSync(password, findUser.password)
    if (!comparePassword) {
      return handleClientError(res, 404, 'Your Password does not correct.')
    }

    if (comparePassword) {
      const accessToken = generateToken({
        id: findUser.id,
        username: findUser.username,
        role: findUser.role,
        email: findUser.email,
      })

      res.status(200).json({
        token: accessToken,
        role: findUser.role,
        email: findUser.email,
        status: 'Successfully Login'
      })
    }

  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}

// AUTHENTICATED ROUTES
// Get All User
exports.getUser = async (req, res) => {
  try {
    const user = await User.findAll({})
    
    return res.status(200).json({
      data: user,
      message: 'Success Get All Data User',
    })

  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}

// Get User By Id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)

    if (!user) {
      handleClientError(res, 404, `User with id ${id} does not exist.`)
    }

    return res.status(200).json({
      data: user,
      message: `Success Get Data with ID ${id}`,
    })

  } catch (err) {
    handleServerError(res)
  }
}

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const newData = req.body
    const { email } = req.body

    const forgotScheme = Joi.object({
      email: Joi.string().required(),
    })

    const { error } = forgotScheme.validate(newData)
    if (error) {
      return res.status(400).json({
        status: 'Validation Failed',
        message: error.details[0].message,
      })
    }

    const user = await User.findOne({ where: { email }})
    if(!user) {
      return handleClientError(res, 404, 'User with the specified email does not exist.')
    }

    const resetToken = uuidv4()
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(resetToken, salt)

    await User.update({ password: hash }, {
      where: { email },
      returning: true,
    })

    sendForgotPasswordEmail(user.email, resetToken)

    return res.status(200).json({
      message: 'Forgot password process initiated. Check your email for further instructions.'
    })

  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}