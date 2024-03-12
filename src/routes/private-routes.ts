import express from 'express'
import { UserController } from '../controllers/user-controller'
import { authMiddleware } from '../middlewares/auth-jwt-middleware'

const protectedRoute = express.Router()
const userController = new UserController()

/**
 * @desc Middleware
 */
protectedRoute.use(authMiddleware)

/**
 * @desc  Get User Detail
 * @route GET /api/v1/users
 * @access Private
 * @requiredHeaders Authorization
 */
protectedRoute.get('/users', userController.getUserDetail.bind(userController))

export { protectedRoute }
