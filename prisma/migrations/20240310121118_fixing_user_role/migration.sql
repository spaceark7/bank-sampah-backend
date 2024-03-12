/*
  Warnings:

  - You are about to drop the column `role_id` on the `user_details` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_details" DROP CONSTRAINT "user_details_role_id_fkey";

-- AlterTable
ALTER TABLE "user_details" DROP COLUMN "role_id";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role_id" TEXT NOT NULL DEFAULT 'user';

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
