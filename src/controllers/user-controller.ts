import { NextFunction, Request, Response } from 'express'
import { UserService } from '../services/users/user-services'
import { HTTP_METHOD, HTTP_RESPONSE_STATUS, ResponseDTO } from '../utils/response-dto'

export class UserController {
  private UserServiceInstance: UserService
  private static instanceName: string = 'User'

  constructor() {
    this.UserServiceInstance = new UserService()
  }
  /**
   * @desc Create a new user
   * @group Auth - Operations about user
   * @param req
   * @param res
   * @param next
   */
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.UserServiceInstance.create(req.body)

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

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.UserServiceInstance.login(req.body)

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
    } catch (error) {}
  }

  /**
   * @desc Get User Detail
   * @group User - Operations about user
   */
  async getUserDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.UserServiceInstance.getUserDetail(req.user)

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

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.UserServiceInstance.update(req.user, req.body)

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

  async addOrEditUserCitizenshipInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.UserServiceInstance.addOrEditUserCitizenship(req.user, req.body)

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
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.UserServiceInstance.getAllUser()

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
}
