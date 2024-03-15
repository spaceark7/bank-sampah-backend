import express from 'express'
import { UserController } from '../controllers/user-controller'
import { authMiddleware } from '../middlewares/auth-jwt-middleware'
import { MaterialController } from '../controllers/material-controller'
import { RBACMiddleware } from '../middlewares/rbac-middleware'

const protectedRoute = express.Router()
const userController = new UserController()
const materialController = new MaterialController()

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

/**
 * @desc  Get All User
 * @route GET /api/v1/users
 * @access Admin
 * @requiredHeaders Authorization
 */
protectedRoute.get('/users/all', RBACMiddleware, userController.getAllUsers.bind(userController))

/**
 * @desc  Update User
 * @route PUT /api/v1/users
 * @access Private
 * @requiredHeaders Authorization
 */
protectedRoute.put('/users', userController.updateUser.bind(userController))

/**
 * @desc  Add User Citizenship Info
 * @route POST /api/v1/users/citizen
 * @access Private
 * @requiredHeaders Authorization
 */
protectedRoute.post('/users-citizenship', userController.addOrEditUserCitizenshipInfo.bind(userController))

/**
 * @desc  Edit User Citizenship Info
 * @route POST /api/v1/users/citizen
 * @access Private
 * @requiredHeaders Authorization
 */
protectedRoute.put('/users-citizenship', userController.addOrEditUserCitizenshipInfo.bind(userController))

/**
 * @desc  Create Material
 * @route POST /api/v1/materials
 * @access Admin
 * @requiredHeaders Authorization
 */
protectedRoute.post('/materials', RBACMiddleware, materialController.createMaterial.bind(materialController))

/**
 * @desc  Get Material By Id
 * @route GET /api/v1/materials/:id
 * @access Admin
 * @requiredHeaders Authorization
 */
protectedRoute.get('/materials/:id', RBACMiddleware, materialController.getMaterialById.bind(materialController))

/**
 * @desc  Update Material
 * @route PUT /api/v1/materials/:id
 * @access Admin
 * @requiredHeaders Authorization
 */
protectedRoute.put('/materials/:id', RBACMiddleware, materialController.updateMaterial.bind(materialController))

/**
 * @desc  Get All Material
 * @route GET /api/v1/materials
 * @access Admin
 * @requiredHeaders Authorization
 */
protectedRoute.get('/materials', RBACMiddleware, materialController.getAllMaterial.bind(materialController))

/**
 * @desc  Delete Material
 * @route DELETE /api/v1/materials/:id
 * @access Admin
 * @requiredHeaders Authorization
 * @requiredParams id
 */
protectedRoute.delete('/materials/:id', RBACMiddleware, materialController.deleteMaterial.bind(materialController))

export { protectedRoute }
