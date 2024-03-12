import express from 'express'
import { UserController } from '../controllers/user-controller'

const publicRouter = express.Router()
const userController = new UserController()

/**
 * @desc  Register a new user
 * @route POST /api/v1/public/register
 * @access Public
 */

publicRouter.post('/register', userController.createUser.bind(userController))

/**
 * @desc  Login a user
 * @route POST /api/v1/public/login
 * @access Public
 */
publicRouter.post('/login', userController.loginUser.bind(userController))

export { publicRouter }
