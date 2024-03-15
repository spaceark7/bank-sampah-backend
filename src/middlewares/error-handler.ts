import { ResponseError } from '../utils/error-response'
import { ValidationError } from 'yup'
import express from 'express'
const errorHandlerMiddleware = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!err) {
    next()
    return
  }

  if (err instanceof ResponseError) {
    return res
      .status(err.status)
      .json({
        status: false,
        message: err.message
      })
      .end()
  } else if (err instanceof ValidationError) {
    return res
      .status(400)
      .json({
        errors: {
          status: false,
          message: err.message
        }
      })
      .end()
  } else {
    return res
      .status(500)
      .json({
        errors: {
          status: false,
          message: 'Internal server error'
        }
      })
      .end()
  }
}

export { errorHandlerMiddleware }
