import { NextFunction, Request, Response } from 'express'
import { UserService } from '../services/users/user-services'
import { HTTP_METHOD, HTTP_RESPONSE_STATUS, ResponseDTO } from '../utils/response-dto'
import { FilterParam } from '../utils/params'

export class UserController {
  private static instanceName: string = 'User'

  /**
   * @desc Create a new user
   * @group Auth - Operations about user
   * @param req
   * @param res
   * @param next
   */
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.create(req.body)

      res.status(HTTP_RESPONSE_STATUS.OK).json(
        ResponseDTO({
          data: data,
          instanceName: UserController.instanceName,
          status: HTTP_RESPONSE_STATUS.CREATED,
          method: HTTP_METHOD.POST
        })
      )
    } catch (error) {
      next(error)
    }
  }

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.login(req.body)

      res.status(HTTP_RESPONSE_STATUS.OK).json(
        ResponseDTO({
          status: HTTP_RESPONSE_STATUS.OK,
          instanceName: UserController.name,
          data: {
            token: data
          },
          method: HTTP_METHOD.POST
        })
      )
    } catch (error) {
      next(error)
    }
  }

  /**
   * @desc Get User Detail
   * @group User - Operations about user
   */
  static async getUserDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.getUserDetail(req.user)

      res.status(HTTP_RESPONSE_STATUS.OK).json(
        ResponseDTO({
          data: data,
          instanceName: UserController.instanceName,
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.GET
        })
      )
    } catch (error) {
      next(error)
    }
  }

  /**
   * @desc Update User
   * @group User - Operations about user
   * @param req.user - User
   * @param req.body - User
   * @return {Promise<void>}
   * */
  static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await UserService.update(req.user, req.body)

      res.status(HTTP_RESPONSE_STATUS.OK).json(
        ResponseDTO({
          data: data,
          instanceName: UserController.instanceName,
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.PUT
        })
      )
    } catch (error) {
      next(error)
    }
  }

  /**
   * @desc Update Admin User
   * @group Admin - Operations about user
   * @param req.user - User
   * @param req.body - User
   * @return {Promise<void>}
   * */
  static async updateAdminUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    try {
      const data = await UserService.update(
        {
          id: id
        },
        req.body
      )

      res.status(HTTP_RESPONSE_STATUS.OK).json(
        ResponseDTO({
          data: data,
          instanceName: UserController.instanceName,
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.PUT
        })
      )
    } catch (error) {
      next(error)
    }
  }

  static async addOrEditUserCitizenshipInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.addOrEditUserCitizenship(req.user, req.body)

      res.status(HTTP_RESPONSE_STATUS.OK).json(
        ResponseDTO({
          data: data,
          instanceName: UserController.instanceName,
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.POST
        })
      )
    } catch (error) {
      next(error)
    }
  }

  /**
   * @desc Get All Users
   * @group Admin - Operations about user
   */
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.getAllUser()

      res.status(HTTP_RESPONSE_STATUS.OK).json(
        ResponseDTO({
          data: data,
          instanceName: UserController.instanceName,
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.GET
        })
      )
    } catch (error) {
      next(error)
    }
  }

  /**
   * @desc Get All Admin Users
   * @group Admin - Operations about user
   */
  static async getAllAdminUsers(req: Request, res: Response, next: NextFunction) {
    const filter: FilterParam = req.query
    try {
      const data = await UserService.getAllUser(filter, true)

      res.status(HTTP_RESPONSE_STATUS.OK).json(
        ResponseDTO({
          data: data.result,
          instanceName: UserController.instanceName,
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.GET,
          meta: data.metadata
        })
      )
    } catch (error) {
      next(error)
    }
  }

  /**
   * @desc Deactivate User
   * @group Admin - Operations about user
   * @param req.user.id
   * @return {Promise<void>}
   * */
  static async deactivateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    try {
      const data = await UserService.deactivateUser({
        id: id
      })

      res.status(HTTP_RESPONSE_STATUS.OK).json(
        ResponseDTO({
          data: data,
          instanceName: UserController.instanceName,
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.DELETE
        })
      )
    } catch (error) {
      next(error)
    }
  }
}
