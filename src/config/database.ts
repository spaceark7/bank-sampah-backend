import { PrismaClient, Prisma } from '@prisma/client'
import { logger } from '../utils/logger'
import { ResponseError } from '../utils/error-response'

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    },
    {
      emit: 'event',
      level: 'info'
    },
    {
      emit: 'event',
      level: 'warn'
    },
    {
      emit: 'event',
      level: 'error'
    }
  ]
})

prismaClient.$on('query', (e) => {
  logger.info('Query: ' + e.query)
})

prismaClient.$on('error', (e) => {
  logger.error('Error: ' + e.message)
})

prismaClient.$on('warn', (e) => {
  logger.warn('Warn: ' + e.message)
})

prismaClient.$on('info', (e) => {
  logger.info('Info: ' + e.message)
})

export const PrismaErrorHandle = (error: Prisma.PrismaClientKnownRequestError) => {
  if (error.code === 'P2002') {
    let errorMessage = 'Error occurred'
    if (Array.isArray(error.meta?.target)) {
      errorMessage = `${error.meta.target.join(',')} sudah terdaftar`
    }
    throw new ResponseError(400, errorMessage)
  }
}
