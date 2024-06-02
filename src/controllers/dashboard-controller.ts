import { NextFunction, Request, Response } from 'express'
import { HTTP_METHOD, HTTP_RESPONSE_STATUS, ResponseDTO } from '../utils/response-dto'
import { DashboardServices } from '../services/dashboard/dashboard-services'

export class DashboardController {
  static async getAdminDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DashboardServices.getAdminDashboard()
      res.status(200).json(
        ResponseDTO({
          data: data,
          instanceName: 'Get All Transaction',
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.GET
        })
      )
    } catch (error) {
      next(error)
    }
  }
}
