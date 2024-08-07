import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaErrorHandle, prismaClient } from '../../config/database'
import { ResponseError } from '../../utils/error-response'
import generatePaginationMetadata from '../../utils/pagination'
import { UserAddCitizenParam, UserCreateParam, UserLoginParam, UserParam, UserUpdateParam } from '../../utils/params'
import { LoginSchema, RegisterSchema, UpdateUserSchema, UserCitizenSchema } from '../../utils/validations/user/user-validation'
import { Validate } from '../../utils/validations/validate'
import { FilterParam } from './../../utils/params'
import { ParseQueryFilter } from '../../utils/helper'

export class UserService {
  /***
   * Auth Service
   * @desc Register user
   */
  static async create(param: UserCreateParam) {
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
                name: data.is_admin ? 'Admin' : 'User'
              },
              create: {
                name: data.is_admin ? 'Admin' : 'User'
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
          id: true,
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
  static async login(param: UserLoginParam) {
    const loginData: UserLoginParam = await Validate(LoginSchema, param)

    console.log('loginData', loginData)
    const user = await prismaClient.user
      .findFirst({
        where: {
          email: {
            equals: loginData.email,
            mode: 'insensitive'
          },
          user_detail: {
            deleted_at: {
              equals: null
            },
            activated_at: {
              not: null
            }
          }
        },
        include: {
          user_detail: true
        }
      })
      .catch((err) => {
        PrismaErrorHandle(err)
      })

    console.log('user', user)

    if (!user) {
      throw new ResponseError(404, `${param.email} not found`)
    }

    const passwordMatch = await bcrypt.compare(loginData.password, user.password)

    if (!passwordMatch) {
      console.log('passwordMatch:!user', passwordMatch)

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
  static async getUserDetail(param: UserParam) {
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
            id: true,
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

  /***
   * User Service
   * @desc Update User
   * @param {UserParam} user
   * @param {UserUpdateParam} data
   * @throws {ResponseError}
   * @return {Promise<any>}
   * */
  static async update(user: Pick<UserParam, 'id'>, data: UserUpdateParam): Promise<any> {
    const updateData: UserUpdateParam = await Validate(UpdateUserSchema, data)
    if (updateData.password && updateData.password.length < 8) {
      throw new ResponseError(401, 'Password minimal 8 karakter')
    }

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
          id: true,
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

  /***
   * User Service
   * @desc Edit User
   * @param {UserParam} user
   * @return {Promise<any>}
   * @throws {ResponseError}
   * */
  static async addOrEditUserCitizenship(userId: string, data: UserAddCitizenParam): Promise<any> {
    const citizenData: UserAddCitizenParam = await Validate(UserCitizenSchema, data)

    const userExist = await prismaClient.user.findFirst({
      where: {
        id: userId
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

  /***
   * User Service
   * @desc Deactivate User
   * @group Admin - Operations about user
   * @param {UserParam} user
   * @return {Promise<any>}
   * @throws {ResponseError}
   * */
  static async deactivateUser(user: Partial<UserParam>): Promise<any> {
    const userExist = await prismaClient.user.findFirst({
      where: {
        id: user.id
      }
    })

    if (!userExist) {
      throw new ResponseError(404, 'User not found')
    }

    const deactivatedUser = await prismaClient.userDetail
      .update({
        where: {
          user_email: userExist.email
        },
        data: {
          deleted_at: new Date(),
          activated_at: null
        }
      })
      .catch((err) => {
        PrismaErrorHandle(err)
      })

    if (!deactivatedUser) {
      throw new ResponseError(400, 'Gagal menonaktifkan user')
    }

    return deactivatedUser
  }

  /***
   * User Service
   * @desc Get All User
   * @param {UserParam} user
   * @throws {ResponseError}
   * */
  static async getAllUser(filter: FilterParam = {}, adminOnly: boolean = false) {
    const count = prismaClient.user.count({
      where: {
        role_id: adminOnly ? 'Admin' : 'User',
        user_detail: {
          first_name: filter.search ? { contains: filter.search, mode: 'insensitive' } : undefined,

          deleted_at: {
            equals: null
          },
          citizenship: {
            gender: filter.status ? filter.status : undefined
          },
          activated_at: filter.is_active === '1' ? { not: null } : filter.is_active === '2' ? { equals: null } : undefined
        }
      }
    })
    console.log('getAllUser:count', await count)

    const [metadata, result] = await Promise.all([
      generatePaginationMetadata(Number(filter.page || 1), Number(filter.limit || 10), count),
      prismaClient.user.findMany({
        skip: (Number(filter.page || 1) - 1) * (Number(filter.limit) || 10),
        take: Number(filter.limit) || 10,
        where: {
          role_id: adminOnly ? 'Admin' : 'User',
          user_detail: {
            first_name: filter.search ? { contains: filter.search, mode: 'insensitive' } : undefined,
            deleted_at: {
              equals: null
            },
            citizenship: {
              gender: filter.status ? filter.status : undefined
            },
            activated_at: filter.is_active === '1' ? { not: null } : filter.is_active === '2' ? { equals: null } : undefined
          }
        },
        orderBy: {
          user_detail: {
            first_name: filter.order === 'asc' ? 'asc' : 'desc'
          }
        },
        select: {
          id: true,
          email: true,
          phone_number: true,
          role_id: true,
          user_detail: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              user_image_url: true,
              created_at: true,
              activated_at: true,
              deleted_at: true,
              balance: !adminOnly
            }
          }
        }
      })
    ])

    return {
      metadata,
      result
    }
  }
}
