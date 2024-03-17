import express from 'express'
import { UserController } from '../controllers/user-controller'

const publicRouter = express.Router()

/**
 * @desc  Register a new user
 * @route POST /api/v1/public/register
 * @access Public
 */

publicRouter.post('/register', UserController.createUser)

/**
 * @desc  Login a user
 * @route POST /api/v1/public/login
 * @access Public
 */
publicRouter.post('/login', UserController.loginUser)

export { publicRouter }
