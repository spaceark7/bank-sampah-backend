import { prismaClient } from '../../config/database'

export class DashboardServices {
  static async getAdminDashboard() {
    const userDataCount = prismaClient.user.count({
      where: {
        role_id: 'User'
      }
    })
    const RedeemTransactionDataCount = prismaClient.transaction.count({
      where: {
        transaction_type: 'Redeem'
      }
    })
    const LatestTransactionData = prismaClient.transaction.findMany({
      take: 10,
      orderBy: {
        created_at: 'desc'
      },
      include: {
        user_detail: {
          select: {
            first_name: true,
            last_name: true
          }
        },
        transaction_detail: {
          select: {
            transaction_amount: true
          }
        }
      }
    })

    const LatestUser = prismaClient.user.findMany({
      take: 10,
      where: {
        user_detail: {
          activated_at: {
            not: null
          }
        }
      },
      orderBy: {
        user_detail: {
          created_at: 'desc'
        }
      },
      include: {
        user_detail: {
          select: {
            first_name: true,
            last_name: true,
            user_image_url: true,
            activated_at: true
          }
        }
      }
    })
    const WithdrawTransactionDataCount = prismaClient.transaction.count({
      where: {
        transaction_type: 'Withdraw'
      }
    })
    const PendingWithdrawTransactionDataCount = prismaClient.transaction.count({
      where: {
        transaction_type: 'Withdraw',
        transaction_status: 'Pending'
      }
    })

    const [userData, latestTransaction, latestUser, RedeemTransactionData, WithdrawTransactionData, PendingWithdrawTransactionData] =
      await Promise.all([
        userDataCount,
        LatestTransactionData,
        LatestUser,
        RedeemTransactionDataCount,
        WithdrawTransactionDataCount,
        PendingWithdrawTransactionDataCount
      ])

    return {
      widgets: [
        {
          title: 'Member',
          value: userData,
          icon: 'account-group-outline',
          fill: '#279C6F'
        },
        {
          title: 'Penyetoran',
          value: RedeemTransactionData,
          icon: 'upload-outline',
          fill: '#179E2B'
        },
        {
          title: 'Penarikan',
          value: WithdrawTransactionData,
          icon: 'download-outline',
          fill: '#035DC4'
        },
        {
          title: 'Penarikan Baru',
          value: PendingWithdrawTransactionData,
          icon: 'clock-outline',
          fill: '#035DC4'
        }
      ],
      latestTransaction: latestTransaction,
      latestUser: latestUser
    }
  }
}
