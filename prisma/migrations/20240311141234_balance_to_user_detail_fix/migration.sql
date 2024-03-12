-- DropForeignKey
ALTER TABLE "user_details" DROP CONSTRAINT "user_details_id_fkey";

-- AddForeignKey
ALTER TABLE "user_balances" ADD CONSTRAINT "user_balances_user_detail_id_fkey" FOREIGN KEY ("user_detail_id") REFERENCES "user_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
