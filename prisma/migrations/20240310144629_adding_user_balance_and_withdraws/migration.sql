/*
  Warnings:

  - You are about to drop the column `user_address` on the `citizenships` table. All the data in the column will be lost.
  - You are about to drop the column `user_image_url` on the `citizenships` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_status` on the `transaction_details` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_type` on the `transaction_details` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transaction_details" DROP CONSTRAINT "transaction_details_transaction_type_fkey";

-- DropForeignKey
ALTER TABLE "user_details" DROP CONSTRAINT "user_details_user_email_fkey";

-- AlterTable
ALTER TABLE "citizenships" DROP COLUMN "user_address",
DROP COLUMN "user_image_url",
ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "birth_place" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "marital_status" TEXT;

-- AlterTable
ALTER TABLE "transaction_details" DROP COLUMN "transaction_status",
DROP COLUMN "transaction_type",
ADD COLUMN     "transaction_weight" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "transaction_amount" SET DEFAULT 0,
ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "transaction_status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "transaction_type" TEXT NOT NULL DEFAULT 'redeem';

-- CreateTable
CREATE TABLE "user_balances" (
    "id" TEXT NOT NULL,
    "user_detail_id" TEXT NOT NULL,
    "balance_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_withdraws" (
    "id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "transaction_withdraw_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_withdraws_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_balances_user_detail_id_key" ON "user_balances"("user_detail_id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_withdraws_transaction_id_key" ON "transaction_withdraws"("transaction_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_email_fkey" FOREIGN KEY ("email") REFERENCES "user_details"("user_email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_id_fkey" FOREIGN KEY ("id") REFERENCES "user_balances"("user_detail_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_transaction_type_fkey" FOREIGN KEY ("transaction_type") REFERENCES "transaction_types"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_withdraws" ADD CONSTRAINT "transaction_withdraws_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
