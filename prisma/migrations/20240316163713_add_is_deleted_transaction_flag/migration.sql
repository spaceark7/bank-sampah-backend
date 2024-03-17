-- AlterTable
ALTER TABLE "transaction_details" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "transaction_withdraws" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;
