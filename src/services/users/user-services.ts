import { prismaClient } from '../../config/database'
import { ResponseError } from '../../utils/error-response'
import { UserCreateParam, UserLoginParam, UserParam } from '../../utils/params'
import { LoginSchema, RegisterSchema } from '../../utils/validations/user/user-validation'
import { Validate } from '../../utils/validations/validate'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserService {
  async create(param: UserCreateParam) {
    console.log('param', param)
    const data: UserCreateParam = await Validate(RegisterSchema, param)
    const alreadyExist = await prismaClient.user.count({
      where: {
        email: data.email
      }
    })

    if (alreadyExist) {
      throw new ResponseError(400, 'Email sudah terdaftar')
    }
    data.password = await bcrypt.hash(data.password, 10)

    const user = await prismaClient.user.create({
      data: {
        email: data.email,
        phone_number: data.phone_number,
        password: data.password,
        user_detail: {
          create: {
            first_name: data.user_detail.first_name,
            last_name: data.user_detail.last_name,
            user_image_url: data.user_detail.user_image_url ?? null,
            balance: {
              create: {
                balance_amount: 0
              }
            },
            activated_at: new Date()
          }
        }
      },
      select: {
        email: true,
        phone_number: true,
        user_detail: {
          select: {
            first_name: true,
            last_name: true,
            user_image_url: true
          }
        }
      }
    })

    if (!user) {
      throw new ResponseError(400, 'Gagal membuat user')
    }

    return user
  }

  async login(param: UserLoginParam) {
    const loginData: UserLoginParam = await Validate(LoginSchema, param)

    const user = await prismaClient.user.findFirst({
      where: {
        email: loginData.email
      }
    })

    if (!user) {
      throw new ResponseError(404, `${param.email} not found`)
    }

    const passwordMatch = await bcrypt.compare(loginData.password, user.password)

    if (!passwordMatch) {
      throw new ResponseError(403, 'Password did not match')
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role_id
      },
      process.env.JWT_SECRET || 'secret121212',
      {
        expiresIn: '7d'
      }
    )

    return token
  }

  async getUserDetail(param: UserParam) {
    const userDetail = await prismaClient.user.findFirst({
      where: {
        id: param.id
      },
      select: {
        email: true,
        phone_number: true,
        user_detail: {
          select: {
            first_name: true,
            last_name: true,
            user_image_url: true,
            balance: {
              select: {
                balance_amount: true
              }
            },
            citizenship: {
              select: {
                nik_number: true,
                family_id_number: true,
                address: true,
                birth_place: true,
                birth_date: true,
                gender: true,
                marital_status: true,
                id_card_image_url: true
              }
            }
          }
        }
      }
    })

    if (!userDetail) {
      throw new ResponseError(404, 'User not found')
    }

    return userDetail
  }

  // async update(id, data) {
  //   const user = await this.userRepository.update(id, data)
  //   return user
  // }

  // async delete(id) {
  //   const user = await this.userRepository.delete(id)
  //   return user
  // }

  // async findById(id) {
  //   const user = await this.userRepository.findById(id)
  //   return user
  // }

  // async findAll() {
  //   const users = await this.userRepository.findAll()
  //   return users
  // }
}
