-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_email_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "phone_number" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
