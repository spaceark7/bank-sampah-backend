import jwt from 'jsonwebtoken'
import { prismaClient } from '../config/database'
import { Request, Response, NextFunction } from 'express'

declare module 'express-serve-static-core' {
  interface Request {
    user?: any
  }
}

export const RBACMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const _jwt_secret = process.env.JWT_SECRET
  if (!_jwt_secret) {
    throw new Error('JWT_SECRET is not defined')
  }
  const authrization = req.get('Authorization')

  if (!authrization) {
    res
      .status(401)
      .json({
        status: false,
        message: 'Unauthorized No Authorization Header provided'
      })
      .end()
  } else {
    const token = authrization.split(' ')[1]

    jwt.verify(token, _jwt_secret, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({
            status: false,
            message: 'Unauthorized. Invalid Token'
          })
          .end()
      } else {
        const payload = jwt.decode(token) as Record<any, any>

        if (!payload) {
          res
            .status(401)
            .json({
              status: false,
              message: 'Unauthorized. Invalid Token'
            })
            .end()
        } else {
          const user = await prismaClient.user.findUnique({
            where: {
              id: payload.id
            }
          })

          if (!user) {
            return res
              .status(401)
              .json({
                status: false,
                message: 'User not found'
              })
              .end()
          }

          if (user?.role_id !== 'Admin') {
            return res
              .status(401)
              .json({
                status: false,
                message: 'Access Denied. User not allowed to access this resource'
              })
              .end()
          }
        }
        next()
      }
    })
  }
}
