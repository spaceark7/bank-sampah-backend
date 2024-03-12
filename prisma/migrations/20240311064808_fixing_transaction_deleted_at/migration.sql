/*
  Warnings:

  - You are about to drop the column `transaction_note` on the `transaction_details` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_date` on the `transaction_withdraws` table. All the data in the column will be lost.
  - Added the required column `transaction_withdraw_date` to the `transaction_withdraws` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction_details" DROP COLUMN "transaction_note",
ADD COLUMN     "transaction_material" TEXT;

-- AlterTable
ALTER TABLE "transaction_withdraws" DROP COLUMN "transaction_date",
ADD COLUMN     "transaction_withdraw_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT;
