import { ResponseError } from '../error-response'

const Validate = async (schema: any, request: any) => {
  const result = await schema
    .validate(request, {
      abortEarly: false
    })
    .catch((err: any) => {
      const { errors } = err
      const message = errors.map((i: any) => i).join(',')
      throw new ResponseError(400, message)
    })
  return result
}

export { Validate }
