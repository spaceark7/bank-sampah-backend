import { PrismaErrorHandle, prismaClient } from '../../config/database'
import { ResponseError } from '../../utils/error-response'
import generatePaginationMetadata from '../../utils/pagination'
import { FilterParam, TransactionCreateParam } from '../../utils/params'
import { TransactionCreateRedeemSchema } from '../../utils/validations/transactions/redeem-validations'
import { Validate } from '../../utils/validations/validate'

export class TransactionService {
  /**
   * @description create transaction
   * @param params [transaction_status, user_detail_id, transaction_type, notes, transaction_detail]
   * @access [ admin]
   * @returns transaction
   */
  static async redeem(params: TransactionCreateParam, user?: string) {
    const trans: TransactionCreateParam = await Validate(TransactionCreateRedeemSchema, params)

    console.log('trans', trans)
    const data = await prismaClient.$transaction(async (tx) => {
      const redeemTransaction = await tx.transaction
        .create({
          data: {
            transaction_status: trans.transaction_status,
            user_detail: {
              connect: {
                id: trans.user_detail_id
              }
            },
            transaction_type_id: {
              connectOrCreate: {
                where: {
                  name: trans.transaction_type
                },
                create: {
                  name: trans.transaction_type
                }
              }
            },
            notes: trans.notes ?? null,
            updated_by: user,
            transaction_detail: {
              createMany: {
                data: trans.transaction_detail.map((detail) => {
                  return {
                    transaction_material: detail.transaction_material,
                    transaction_unit: detail.transaction_unit,
                    transaction_date: detail.transaction_date,
                    transaction_weight: detail.transaction_weight,
                    transaction_amount: detail.transaction_amount,
                    transaction_image_url: detail.transaction_image_url
                  }
                }),
                skipDuplicates: true
              }
            }
          },
          include: {
            transaction_detail: true,
            user_detail: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                user_email: true,
                balance: {
                  select: {
                    balance_amount: true
                  }
                }
              }
            }
          }
        })
        .catch((error) => {
          PrismaErrorHandle(error)
        })

      if (!redeemTransaction) {
        throw new ResponseError(500, 'Gagal membuat transaksi')
      }

      if (redeemTransaction.transaction_status === 'Pending' || redeemTransaction.transaction_status === 'Reject') {
        return redeemTransaction
      } else if (redeemTransaction.transaction_status === 'Success') {
        const balance = await tx.userBalance.upsert({
          where: {
            user_detail_id: trans.user_detail_id
          },
          update: {
            balance_amount: {
              increment: redeemTransaction.transaction_detail.reduce((acc, curr) => {
                return acc + curr.transaction_amount
              }, 0)
            }
          },
          create: {
            user_detail_id: trans.user_detail_id,
            balance_amount: redeemTransaction.transaction_detail.reduce((acc, curr) => {
              return acc + curr.transaction_amount
            }, 0)
          }
        })

        if (!balance) {
          throw new ResponseError(500, 'Gagal mengupdate balance')
        }

        return {
          ...redeemTransaction,
          user_detail: {
            ...redeemTransaction.user_detail,
            balance: {
              balance_amount: balance.balance_amount
            }
          }
        }
      }
    })

    return data
  }
  /**
   * @description get all transaction
   * @param param [type, status, user_id, page, limit]
   * @access [private, admin]
   * @returns
   */
  static async listTransaction(param: FilterParam = {}, isAdmin: boolean = false) {
    const count = prismaClient.transaction.count({
      where: {
        AND: [
          {
            transaction_type: param.type ?? undefined
          },
          {
            transaction_status: param.status ?? undefined
          }
        ],
        user_detail_id: param.user_id ?? undefined
      }
    })
    const [metadata, result] = await Promise.all([
      generatePaginationMetadata(Number(param.page || 1), Number(param.limit || 10), count),
      prismaClient.transaction.findMany({
        skip: (Number(param.page || 1) - 1) * (Number(param.limit) || 10),
        take: Number(param.limit) || 10,
        orderBy: {
          created_at: param.order === 'asc' ? 'asc' : 'desc'
        },
        where: {
          AND: [
            {
              transaction_type: param.type ?? undefined
            },
            {
              transaction_status: param.status
            }
          ],
          user_detail_id: param.user_id ?? undefined
        },
        select: {
          id: true,
          transaction_status: true,
          notes: true,
          transaction_type: true,
          created_at: true,
          updated_at: true,
          updated_by: isAdmin ? true : false,
          transaction_detail: true,
          user_detail: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              user_email: true
            }
          }
        }
      })
    ])

    if (!result) {
      throw new ResponseError(404, 'Data transaksi tidak ditemukan')
    }

    return {
      metadata,
      result
    }
  }

  /**
   * @description get transaction by id
   * @param id
   * @access [private, admin]
   * @returns
   */
  static async getTransactionById(id: string) {
    const data = await prismaClient.transaction.findUnique({
      where: {
        id: id
      },
      include: {
        transaction_detail: true,
        user_detail: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            user_email: true
          }
        }
      }
    })

    if (!data) {
      throw new ResponseError(404, 'Data transaksi tidak ditemukan')
    }

    return data
  }
  /**
   * @description update transaction detail
   * @param id, detail
   * @access [admin]
   * @returns transaction
   * */
  // TODO : Fix this function balance recalculation
  static async updateTransactionDetail(id: string, newData: Partial<TransactionCreateParam>, user?: string) {
    const isExist = await prismaClient.transaction.findUnique({
      where: {
        id: id
      },
      include: {
        transaction_detail: true,
        user_detail: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            user_email: true,
            balance: {
              select: {
                balance_amount: true
              }
            }
          }
        }
      }
    })

    console.log('updateTransactionDetail', isExist)

    if (!isExist) {
      throw new ResponseError(404, 'Data transaksi tidak ditemukan')
    }

    const data = await prismaClient.$transaction(async (tx) => {
      // Delete existing transaction details
      await tx.transactionDetail.deleteMany({ where: { transaction_id: id } })

      // Prepare transaction details data
      const transactionDetailsData = (newData.transaction_detail?.length ? newData.transaction_detail : isExist.transaction_detail).map((detail) => ({
        transaction_material: detail.transaction_material,
        transaction_unit: detail.transaction_unit,
        transaction_date: detail.transaction_date,
        transaction_weight: detail.transaction_weight,
        transaction_amount: detail.transaction_amount,
        transaction_image_url: detail.transaction_image_url
      }))

      // Update transaction
      const updated = await tx.transaction.update({
        where: { id: id },
        data: {
          notes: newData.notes || isExist.notes,
          transaction_status: newData.transaction_status || isExist.transaction_status,
          transaction_type: newData.transaction_type || isExist.transaction_type,
          updated_by: user,
          transaction_detail: {
            createMany: {
              data: transactionDetailsData,
              skipDuplicates: false
            }
          }
        },
        include: {
          transaction_detail: true,
          user_detail: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              user_email: true,
              balance: { select: { balance_amount: true } }
            }
          }
        }
      })

      if (!updated) throw new ResponseError(500, 'Gagal mengubah detail transaksi')

      // Calculate balance change
      const balanceChange = updated.transaction_detail.reduce((acc, curr) => acc + curr.transaction_amount, 0)

      // Update user balance
      const balance = await tx.userBalance.upsert({
        where: { user_detail_id: isExist.user_detail_id },
        update: { balance_amount: { [updated.transaction_status === 'Success' ? 'increment' : 'decrement']: balanceChange } },
        create: { user_detail_id: isExist.user_detail_id, balance_amount: balanceChange }
      })

      if (!balance) throw new ResponseError(500, 'Gagal mengubah Nilai Balance')

      // Return updated transaction with updated balance
      return {
        ...updated,
        user_detail: {
          ...updated.user_detail,
          balance: { balance_amount: balance.balance_amount }
        }
      }
    })

    return data
  }

  /**
   * @description update transaction status
   * @param id, status
   * @access [private, admin]
   * @returns
   * */
  static async updateTransactionStatus(id: string, status: string) {
    const data = await prismaClient.transaction.update({
      where: {
        id: id
      },
      data: {
        transaction_status: status
      },
      include: {
        transaction_detail: true,
        user_detail: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            user_email: true,
            balance: {
              select: {
                balance_amount: true
              }
            }
          }
        }
      }
    })

    if (!data) {
      throw new ResponseError(500, 'Gagal mengubah status transaksi')
    }

    return data
  }
}
