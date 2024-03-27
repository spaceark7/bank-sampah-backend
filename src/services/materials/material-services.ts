import { PrismaErrorHandle, prismaClient } from '../../config/database'
import { ResponseError } from '../../utils/error-response'
import generatePaginationMetadata from '../../utils/pagination'
import { FilterParam, MaterialParam } from '../../utils/params'
import { MaterialCreateSchema } from '../../utils/validations/material/material-validation'
import { Validate } from '../../utils/validations/validate'

export class MaterialServices {
  /***
   * Material Service
   * @desc Create Material
   * @param {MaterialParam} param
   * @return {Promise<any>}
   * @throws {ResponseError}
   * */
  async create(param: MaterialParam): Promise<any> {
    const data: MaterialParam = await Validate(MaterialCreateSchema, param)

    const alreadyExist = await prismaClient.material.count({
      where: {
        name: data.name
      }
    })

    console.log('alreadyExist', alreadyExist)

    if (alreadyExist > 0) {
      throw new ResponseError(400, 'Material already exist')
    }

    const material = await prismaClient.material
      .create({
        data: {
          name: data.name ?? '',
          base_price: data.base_price,
          unit: data.unit ?? ''
        }
      })
      .catch((error) => {
        PrismaErrorHandle(error)
      })

    return material
  }

  /***
   * Material Service
   * @desc Get All Material
   * @return {Promise<any>}
   * */
  async getAll(param: FilterParam = {}): Promise<{
    metadata: any
    result: any[]
  }> {
    const count = prismaClient.material.count({
      where: {
        is_deleted: false,
        is_active: param.is_active ?? true,
        deleted_at: null
      }
    })
    const [metadata, result] = await Promise.all([
      generatePaginationMetadata(Number(param.page || 1), Number(param.limit || 10), count),
      prismaClient.material.findMany({
        where: {
          is_deleted: false,
          is_active: param.is_active ?? true,
          deleted_at: null
        }
      })
    ])

    if (!result || result.length < 1) {
      throw new ResponseError(400, 'Material not found')
    }

    return {
      metadata,
      result
    }
  }

  /***
   * Material Service
   * @desc Get Material By Id
   * @param {string} id
   * @return {Promise<any>}
   * */

  async findById(id: string): Promise<any> {
    if (!id || id === '' || id === undefined || id === null) {
      throw new ResponseError(400, 'Material Id is required')
    }

    console.log('findById:material', id)
    const data = await prismaClient.material.findUnique({
      where: {
        id: id,
        is_deleted: false
      }
    })

    if (!data) {
      throw new ResponseError(400, 'Material not found')
    }
    return data
  }

  /***
   * Material Service
   * @desc Update Material
   * @param {MaterialParam} param
   * @return {Promise<any>}
   * @throws {ResponseError}
   * */
  async update(id: any, param: MaterialParam): Promise<any> {
    if (!id || id === '' || id === undefined || id === null) {
      throw new ResponseError(400, 'Material Id is required')
    }
    const data: MaterialParam = await Validate(MaterialCreateSchema, param)
    const material = await prismaClient.material
      .update({
        where: {
          id: id
        },
        data: {
          name: data.name ?? '',
          base_price: data.base_price,
          unit: data.unit ?? ''
        }
      })
      .catch((error) => {
        PrismaErrorHandle(error)
      })

    return material
  }

  /***
   * Material Service
   * @desc Delete Material
   * @param {string} id
   * @return {Promise<any>}
   * @throws {ResponseError}
   *
   * */
  async delete(id: any): Promise<any> {
    if (!id || id === '' || id === undefined || id === null) {
      throw new ResponseError(400, 'Material Id is required')
    }

    const isExist = await prismaClient.material.count({
      where: {
        id: id
      }
    })

    if (isExist < 1) {
      throw new ResponseError(400, 'Material not found')
    }

    const alreadyDeleted = await prismaClient.material.count({
      where: {
        id: id,
        is_deleted: true
      }
    })

    if (alreadyDeleted > 0) {
      throw new ResponseError(400, 'Material already deleted')
    }
    const material = await prismaClient.material
      .update({
        where: {
          id: id
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
          is_active: false
        }
      })
      .catch((error) => {
        PrismaErrorHandle(error)
      })

    return material
  }
}
