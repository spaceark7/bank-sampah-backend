/*
  Warnings:

  - Added the required column `updated_at` to the `user_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_details" ADD COLUMN     "activated_at" TIMESTAMP(3),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_detail_id" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_details" (
    "id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "transaction_amount" DOUBLE PRECISION NOT NULL,
    "transaction_status" TEXT NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "transaction_note" TEXT,
    "transaction_image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "transaction_type" TEXT NOT NULL DEFAULT 'redeem',

    CONSTRAINT "transaction_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "transaction_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transaction_details_transaction_id_key" ON "transaction_details"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_types_name_key" ON "transaction_types"("name");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_detail_id_fkey" FOREIGN KEY ("user_detail_id") REFERENCES "user_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_details" ADD CONSTRAINT "transaction_details_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_details" ADD CONSTRAINT "transaction_details_transaction_type_fkey" FOREIGN KEY ("transaction_type") REFERENCES "transaction_types"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
