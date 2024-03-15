import { PrismaErrorHandle, prismaClient } from '../../config/database'
import { ResponseError } from '../../utils/error-response'
import { UserAddCitizenParam, UserCreateParam, UserLoginParam, UserParam, UserUpdateParam } from '../../utils/params'
import { LoginSchema, RegisterSchema, UpdateUserSchema, UserCitizenSchema } from '../../utils/validations/user/user-validation'
import { Validate } from '../../utils/validations/validate'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserService {
  /***
   * Auth Service
   * @desc Register user
   */
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
    data.password = bcrypt.hashSync(data.password, 10)

    const user = await prismaClient.user
      .create({
        data: {
          email: data.email,
          phone_number: data.phone_number,
          password: data.password,
          role: {
            connectOrCreate: {
              where: {
                name: 'User'
              },
              create: {
                name: 'User'
              }
            }
          },
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
          role_id: true,
          user_detail: {
            select: {
              first_name: true,
              last_name: true,
              user_image_url: true
            }
          }
        }
      })
      .catch((err) => {
        PrismaErrorHandle(err)
      })

    if (!user) {
      throw new ResponseError(400, 'Gagal membuat user')
    }

    return user
  }

  /***
   * Auth Service
   * @desc Login user
   * @param {UserLoginParam} param
   */
  async login(param: UserLoginParam) {
    const loginData: UserLoginParam = await Validate(LoginSchema, param)

    const user = await prismaClient.user.findFirst({
      where: {
        email: loginData.email,
        user_detail: {
          deleted_at: {
            equals: null
          },
          activated_at: {
            not: null
          }
        }
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

  /***
   * User Service
   * @desc Get User Detail
   * @param {UserParam} param
   */
  async getUserDetail(param: UserParam) {
    const userDetail = await prismaClient.user.findFirst({
      where: {
        id: param.id,
        user_detail: {
          deleted_at: {
            equals: null
          },
          activated_at: {
            not: null
          }
        }
      },
      select: {
        email: true,
        phone_number: true,
        role_id: true,
        user_detail: {
          select: {
            first_name: true,
            last_name: true,
            user_image_url: true,
            activated_at: true,
            deleted_at: true,
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

  async update(user: UserParam, data: UserUpdateParam) {
    const updateData: UserUpdateParam = await Validate(UpdateUserSchema, data)
    const userExist = await prismaClient.user.findFirst({
      where: {
        id: user.id
      },
      include: {
        user_detail: true
      }
    })

    if (!userExist) {
      throw new ResponseError(404, 'User not found')
    }

    const updatedUser = await prismaClient.user
      .update({
        where: {
          id: user.id
        },
        data: {
          email: updateData.email ? updateData.email : userExist.email,
          phone_number: updateData.phone_number ? updateData.phone_number : userExist.phone_number,
          password: updateData.password ? bcrypt.hashSync(updateData.password, 10) : userExist.password,
          user_detail: {
            update: {
              first_name: updateData.user_detail.first_name ? updateData.user_detail.first_name : userExist.user_detail?.first_name,
              last_name: updateData.user_detail.last_name ? updateData.user_detail.last_name : userExist.user_detail?.last_name,
              user_image_url: updateData.user_detail.user_image_url ? updateData.user_detail.user_image_url : userExist.user_detail?.user_image_url
            }
          }
        },
        select: {
          email: true,
          phone_number: true,
          role_id: true,
          user_detail: {
            select: {
              first_name: true,
              last_name: true,
              user_image_url: true
            }
          }
        }
      })
      .catch((err) => {
        PrismaErrorHandle(err)
      })

    if (!updatedUser) {
      throw new ResponseError(400, 'Gagal update user')
    }

    return updatedUser
  }

  async addOrEditUserCitizenship(user: UserParam, data: UserAddCitizenParam) {
    const citizenData: UserAddCitizenParam = await Validate(UserCitizenSchema, data)

    const userExist = await prismaClient.user.findFirst({
      where: {
        id: user.id
      }
    })

    if (!userExist) {
      throw new ResponseError(404, 'User not found')
    }

    const citizen = await prismaClient.citizenship
      .upsert({
        where: {
          user_detail_email: userExist.email
        },
        create: {
          user_detail_email: userExist.email,
          nik_number: citizenData.nik_number,
          family_id_number: citizenData.family_id_number,
          gender: citizenData.gender,
          marital_status: citizenData.marital_status,
          address: {
            create: {
              address: citizenData.address?.address ?? '',
              village: citizenData.address?.village,
              district: citizenData.address?.district,
              city: citizenData.address?.city,
              province: citizenData.address?.province,
              postal_code: citizenData.address?.postal_code
            }
          },
          birth_place: citizenData.birth_place,
          birth_date: citizenData.birth_date
        },
        update: {
          user_detail_email: userExist.email,
          nik_number: citizenData.nik_number,
          family_id_number: citizenData.family_id_number,
          gender: citizenData.gender,
          marital_status: citizenData.marital_status,
          address: {
            create: {
              address: citizenData.address?.address ?? '',
              village: citizenData.address?.village,
              district: citizenData.address?.district,
              city: citizenData.address?.city,
              province: citizenData.address?.province,
              postal_code: citizenData.address?.postal_code
            }
          },
          birth_place: citizenData.birth_place,
          birth_date: citizenData.birth_date
        }
      })
      .catch((err) => {
        PrismaErrorHandle(err)
      })

    if (!citizen) {
      throw new ResponseError(400, 'Gagal menambahkan data kewarganegaraan')
    }

    return citizen
  }
}
