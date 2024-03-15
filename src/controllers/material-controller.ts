import { MaterialServices } from '../services/materials/material-services'
import { NextFunction, Request, Response } from 'express'
import { HTTP_METHOD, HTTP_RESPONSE_STATUS, ResponseDTO } from '../utils/response-dto'

export class MaterialController {
  private materialServiceInstance: MaterialServices

  constructor() {
    this.materialServiceInstance = new MaterialServices()
  }

  async createMaterial(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.materialServiceInstance.create(req.body)

      res.status(201).json(
        ResponseDTO({
          data: data,
          instanceName: 'Create Material',
          status: HTTP_RESPONSE_STATUS.CREATED,
          method: HTTP_METHOD.POST
        })
      )
    } catch (error) {
      next(error)
    }
  }

  async getAllMaterial(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.materialServiceInstance.getAll()

      res.status(200).json(
        ResponseDTO({
          data: data,
          instanceName: 'Get All Material',
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.GET
        })
      )
    } catch (error) {
      next(error)
    }
  }

  async getMaterialById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.materialServiceInstance.findById(req.params.id)

      res.status(200).json(
        ResponseDTO({
          data: data,
          instanceName: 'Get Material By Id',
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.GET
        })
      )
    } catch (error) {
      next(error)
    }
  }

  async updateMaterial(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    try {
      const data = await this.materialServiceInstance.update(id, req.body)

      res.status(200).json(
        ResponseDTO({
          data: data,
          instanceName: 'Update Material',
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.PUT
        })
      )
    } catch (error) {
      next(error)
    }
  }

  async deleteMaterial(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    try {
      const data = await this.materialServiceInstance.delete(id)

      res.status(200).json(
        ResponseDTO({
          data: data,
          instanceName: 'Delete Material',
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.DELETE
        })
      )
    } catch (error) {
      next(error)
    }
  }
}
