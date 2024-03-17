import jwt, { decode } from 'jsonwebtoken'
import { prismaClient } from '../config/database'
import { Request, Response, NextFunction } from 'express'

declare module 'express-serve-static-core' {
  interface Request {
    user?: any
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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
        message: 'Unauthorized'
      })
      .end()
  } else {
    const token = authrization.split(' ')[1]

    jwt.verify(token, _jwt_secret, async (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({
            status: false,
            message: 'Unauthorized'
          })
          .end()
      } else {
        const payload = jwt.decode(token) as Record<any, any>
        if (!payload) {
          res
            .status(401)
            .json({
              status: false,
              message: 'Unauthorized'
            })
            .end()
        } else {
          const user = await prismaClient.user.findUnique({
            where: {
              id: payload.id
            },
            include: {
              user_detail: {
                select: {
                  first_name: true,
                  last_name: true,
                  user_email: true
                }
              }
            }
          })

          if (!user) {
            res
              .status(401)
              .json({
                status: false,
                message: 'User not found'
              })
              .end()
          }

          req.user = user
        }
        next()
      }
    })
  }
}
