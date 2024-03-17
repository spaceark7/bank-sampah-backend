import { NextFunction, Request, Response } from 'express'
import { TransactionService } from '../services/transactions/transaction-services'
import { HTTP_METHOD, HTTP_RESPONSE_STATUS, ResponseDTO } from '../utils/response-dto'
import { FilterParam } from '../utils/params'
import { UserDetail } from '@prisma/client'
import { StringConcate } from '../utils/helper'
export class TransactionController {
  static async redeem(req: Request, res: Response, next: NextFunction) {
    const user: UserDetail = req.user.user_detail
    console.log('redeem', user)
    try {
      const data = await TransactionService.redeem(req.body, StringConcate(user.first_name, user.last_name || ''))
      res.status(201).json(
        ResponseDTO({
          data: data,
          instanceName: 'Create Transaction',
          status: HTTP_RESPONSE_STATUS.CREATED,
          method: HTTP_METHOD.POST
        })
      )
    } catch (error) {
      next(error)
    }
  }

  static async getAllTransaction(req: Request, res: Response, next: NextFunction) {
    const filter: FilterParam = req.query
    const isAdmin = req.user.role_id === 'Admin'

    try {
      const data = await TransactionService.listTransaction(filter, isAdmin)
      res.status(200).json(
        ResponseDTO({
          data: data.result,
          instanceName: 'Get All Transaction',
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.GET,
          meta: data.metadata
        })
      )
    } catch (error) {
      next(error)
    }
  }

  static async getTransactionById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await TransactionService.getTransactionById(req.params.id)
      res.status(200).json(
        ResponseDTO({
          data: data,
          instanceName: 'Get Transaction By Id',
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.GET
        })
      )
    } catch (error) {
      next(error)
    }
  }

  static async updateTransactionDetail(req: Request, res: Response, next: NextFunction) {
    const user: UserDetail = req.user.user_detail

    try {
      const data = await TransactionService.updateTransactionDetail(req.params.id, req.body, StringConcate(user.first_name, user.last_name || ''))
      res.status(200).json(
        ResponseDTO({
          data: data,
          instanceName: 'Update Transaction Detail',
          status: HTTP_RESPONSE_STATUS.OK,
          method: HTTP_METHOD.PUT
        })
      )
    } catch (error) {
      next(error)
    }
  }
}
