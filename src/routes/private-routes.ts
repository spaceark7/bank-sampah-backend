import express from 'express'
import { UserController } from '../controllers/user-controller'
import { authMiddleware } from '../middlewares/auth-jwt-middleware'
import { MaterialController } from '../controllers/material-controller'
import { RBACMiddleware } from '../middlewares/rbac-middleware'
import { TransactionController } from '../controllers/transaction-controller'
import { DashboardController } from '../controllers/dashboard-controller'

const protectedRoute = express.Router()

const materialController = new MaterialController()

/**
 * @desc Middleware
 */
protectedRoute.use(authMiddleware)

/**
 * @desc  Admin Dashboard
 * @route GET /api/v1/dashboard-admin
 * @access Admin
 * @requiredHeaders Authorization
 *
 * @return {Array} - Admin Dashboard Data
 */
protectedRoute.get('/dashboard-admin', RBACMiddleware, DashboardController.getAdminDashboard)

/**
 * @desc  Get User Detail
 * @route GET /api/v1/users
 * @access Private
 * @requiredHeaders Authorization
 */
protectedRoute.get('/users', UserController.getUserDetail)

/**
 * @desc  Get All User
 * @route GET /api/v1/users
 * @access Admin
 * @requiredHeaders Authorization
 */
protectedRoute.get('/users/all', RBACMiddleware, UserController.getAllUsers)

/**
 * @desc  Get User Detail
 * @route GET /api/v1/members/:id
 * @access Admin
 * @requiredHeaders Authorization
 */
protectedRoute.get('/members/:id', RBACMiddleware, UserController.getMemberDetail)
/**
 * @desc  Create Admin User
 * @route GET /api/v1/users-admin'
 * @access Admin
 * @requiredHeaders Authorization
 */
protectedRoute.post('/users-admin', RBACMiddleware, UserController.createUser)

/**
 * @desc  Get All Admin User
 * @route GET /api/v1/users-admin'
 * @access Admin
 * @requiredHeaders Authorization
 */
protectedRoute.get('/users-admin', RBACMiddleware, UserController.getAllAdminUsers)

/**
 * @desc  Update User
 * @route PUT /api/v1/users
 * @access Private
 * @requiredHeaders Authorization
 */
protectedRoute.put('/users', UserController.updateUser)

/**
 * @desc  Update Admin User
 * @route PUT /api/v1/users-admin
 * @access Admin
 * @requiredHeaders Authorization
 */
protectedRoute.put('/members/:id', RBACMiddleware, UserController.updateAdminUser)

/**
 * @desc  Deactivate User
 * @route Delete /api/v1/users
 * @access Admin
 * @requiredHeaders Authorization
 */
protectedRoute.delete('/users/:id', RBACMiddleware, UserController.deactivateUser)

/**
 * @desc  Add User Citizenship Info
 * @route POST /api/v1/users-citizenship
 * @access Private
 * @requiredHeaders Authorization
 */
protectedRoute.post('/users-citizenship', UserController.addOrEditUserCitizenshipInfo)

/**
 * @desc  Edit User Citizenship Info
 * @route POST /api/v1/users/citizen
 * @access Private
 * @requiredHeaders Authorization
 */
protectedRoute.put('/users-citizenship', UserController.addOrEditUserCitizenshipInfo)

/**
 * @desc  Admin Add User Citizenship Info
 * @route POST /api/v1/users-citizenship
 * @access Admin
 * @requiredHeaders Authorization
 */
protectedRoute.post('/members/citizenship/:userId', RBACMiddleware, UserController.adminAddOrEditUserCitizenshipInfo)

/**
 * @desc  Admin Edit User Citizenship Info
 * @route EDIT /api/v1/members/citizen
 * @access Admin
 * @requiredHeaders Authorization
 */
protectedRoute.put('/members/citizenship/:userId', RBACMiddleware, UserController.adminAddOrEditUserCitizenshipInfo)

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

/**
 * @desc  Create Redeem Transaction
 * @route POST /api/v1/transactions/redeem
 * @access Admin
 * @requiredHeaders Authorization
 * @requiredBody transaction_type, user_detail_id, transaction_detail
 */
protectedRoute.post('/transactions/redeem', RBACMiddleware, TransactionController.redeem)

/**
 * @desc  Get All Transaction
 * @route GET /api/v1/transactions
 * @access [Private, Admin]
 * @requiredHeaders Authorization
 */
protectedRoute.get('/transactions', TransactionController.getAllTransaction)

/**
 * @desc  Get Transaction By Id
 * @route GET /api/v1/transactions/:id
 * @access [Private, Admin]
 * @requiredHeaders Authorization
 */
protectedRoute.get('/transactions/:id', TransactionController.getTransactionById)

/**
 * @desc  Update Transaction Detail
 * @route PATCH /api/v1/transactions/:id
 * @access [ Admin]
 * @requiredHeaders Authorization
 */
protectedRoute.patch('/transactions/:id', RBACMiddleware, TransactionController.updateTransactionDetail)
export { protectedRoute }
