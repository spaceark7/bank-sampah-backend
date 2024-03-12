import { Request, Response, NextFunction } from 'express'
import { HTTP_RESPONSE_STATUS } from '../utils/response-dto'
export const ApiKeyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authrization = req.get('Api-Key')

  if (!authrization) {
    res
      .status(HTTP_RESPONSE_STATUS.UNAUTHORIZED)
      .json({
        status: false,
        message: 'No Api-Key provided'
      })
      .end()
  } else {
    if (authrization === process.env.API_KEY) {
      next()
    } else {
      res
        .status(HTTP_RESPONSE_STATUS.UNAUTHORIZED)
        .json({
          status: 'error',
          message: 'Invalid Api-Key'
        })
        .end()
    }
  }
}
