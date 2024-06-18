import { InferType } from 'yup'
import { LoginSchema, RegisterSchema, UpdateUserSchema, UserCitizenSchema } from './validations/user/user-validation'
import { Material } from '@prisma/client'
import { TransactionCreateRedeemSchema } from './validations/transactions/redeem-validations'

//* User Related
export interface UserCreateParam extends InferType<typeof RegisterSchema> {}
export interface UserUpdateParam extends InferType<typeof UpdateUserSchema> {}
export interface UserAddCitizenParam extends InferType<typeof UserCitizenSchema> {}
export interface UserLoginParam extends InferType<typeof LoginSchema> {}
export interface UserParam {
  id: string
  email?: string
  role_id?: string
}
//* Material Related
export interface MaterialParam extends Partial<Material> {}

//* Transaction Related
export interface TransactionCreateParam extends InferType<typeof TransactionCreateRedeemSchema> {}

//* Filter

type Filters = {
  value: string
  condition: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains' | 'in' | 'notIn'
  key: string
}
export interface FilterParam {
  skip?: string
  take?: string
  search?: string
  sort?: string
  order?: string
  limit?: string
  page?: string
  status?: string
  type?: string
  filter?: string
  filters?: Filters[]
  user_id?: string
  is_deleted?: boolean
  date?: Date | string | null
  arg_date?: string
  is_active?: string
}

export const FiltersParser = (filters?: Filters[], key?: string) => {
  if (!filters) return undefined
  const filter = filters.find((filter) => filter.key === key)
  console.log('Filter eq', filter)

  if (filter) {
    switch (filter.condition) {
      case 'eq':
        console.log('Filter eq', filter.value)
        return { equals: filter.value }
      case 'gt':
        return { gt: filter.value }
      case 'lt':
        return { lt: filter.value }
      case 'gte':
        return { gte: filter.value }
      case 'lte':
        return { lte: filter.value }
      case 'contains':
        return { contains: filter.value }

      default:
        console.log('Filter no condition', filter.value)
        return filter.value
    }
  }

  // const filterParam: {
  //   [key: string]: any
  // } = {}
  // filters.forEach((filter) => {
  //   if (filter.condition === 'eq') {
  //     filterParam[filter.key] = filter.value
  //   } else if (filter.condition === 'ne') {
  //     filterParam[filter.key] = { not: filter.value }
  //   } else if (filter.condition === 'gt') {
  //     filterParam[filter.key] = { gt: filter.value }
  //   } else if (filter.condition === 'lt') {
  //     filterParam[filter.key] = { lt: filter.value }
  //   } else if (filter.condition === 'gte') {
  //     filterParam[filter.key] = { gte: filter.value }
  //   } else if (filter.condition === 'lte') {
  //     filterParam[filter.key] = { lte: filter.value }
  //   } else if (filter.condition === 'contains') {
  //     filterParam[filter.key] = { contains: filter.value }
  //   } else if (filter.condition === 'in') {
  //     filterParam[filter.key] = { in: filter.value }
  //   } else if (filter.condition === 'notIn') {
  //     filterParam[filter.key] = { notIn: filter.value }
  //   }
  // })
  // return filterParam
}
