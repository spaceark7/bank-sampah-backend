import { InferType } from 'yup'
import { LoginSchema, RegisterSchema } from './validations/user/user-validation'

export interface UserCreateParam extends InferType<typeof RegisterSchema> {}
export interface UserLoginParam extends InferType<typeof LoginSchema> {}

export interface UserParam {
  id: string
  email: string
  role_id?: string
}
