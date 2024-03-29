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
  email: string
  role_id?: string
}
//* Material Related
export interface MaterialParam extends Partial<Material> {}

//* Transaction Related
export interface TransactionCreateParam extends InferType<typeof TransactionCreateRedeemSchema> {}

//* Filter

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
  user_id?: string
  is_deleted?: boolean
  date?: Date | string | null
  arg_date?: string
  is_active?: string
}
