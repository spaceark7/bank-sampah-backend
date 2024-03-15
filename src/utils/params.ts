import { InferType } from 'yup'
import { LoginSchema, RegisterSchema, UpdateUserSchema, UserCitizenSchema } from './validations/user/user-validation'
import { Material } from '@prisma/client'

export interface UserCreateParam extends InferType<typeof RegisterSchema> {}
export interface UserUpdateParam extends InferType<typeof UpdateUserSchema> {}
export interface UserAddCitizenParam extends InferType<typeof UserCitizenSchema> {}
export interface UserLoginParam extends InferType<typeof LoginSchema> {}

//* Material Related
export interface MaterialParam extends Partial<Material> {}

export interface UserParam {
  id: string
  email: string
  role_id?: string
}
