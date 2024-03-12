export interface IResponseBody<T> {
  status?: boolean
  message?: string
  data: T
  meta?: any
}

interface IParams<T> {
  status?: HTTP_RESPONSE_STATUS
  method?: HTTP_METHOD
  data: T
  instanceName?: string
  meta?: any
}

enum HTTP_RESPONSE_STATUS {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export const ResponseDTO = <T>({ instanceName, data, method, status, meta }: IParams<T>): IResponseBody<T> => {
  switch (status) {
    case HTTP_RESPONSE_STATUS.OK:
      return {
        status: true,
        message: `${method} ${instanceName} successfully retrieved`,
        data,
        meta
      }
    case HTTP_RESPONSE_STATUS.CREATED:
      return {
        status: true,
        message: `${instanceName} created successfully`,
        data,
        meta
      }
    case HTTP_RESPONSE_STATUS.BAD_REQUEST:
      return {
        status: false,
        message: `${instanceName} bad request`,
        data,
        meta
      }
    case HTTP_RESPONSE_STATUS.UNAUTHORIZED:
      return {
        status: false,
        message: `${instanceName} not authorized`,
        data,
        meta
      }
    case HTTP_RESPONSE_STATUS.NOT_FOUND:
      return {
        status: false,
        message: `${instanceName} not found`,
        data,
        meta
      }
    case HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR:
      return {
        status: false,
        message: `${instanceName} internal server error`,
        data,
        meta
      }
    default:
      return {
        status: true,
        message: `${method} ${instanceName} successfully retrieved`,
        data,
        meta
      }
  }
}

export { HTTP_RESPONSE_STATUS, HTTP_METHOD }
