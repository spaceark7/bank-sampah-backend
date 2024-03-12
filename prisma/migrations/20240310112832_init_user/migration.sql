-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_details" (
    "id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "user_image_url" TEXT,
    "role_id" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "citizenships" (
    "id" TEXT NOT NULL,
    "family_id_number" TEXT,
    "nik_number" TEXT,
    "user_image_url" TEXT,
    "id_card_image_url" TEXT,
    "user_detail_email" TEXT NOT NULL,
    "user_address" TEXT,

    CONSTRAINT "citizenships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "village" TEXT,
    "district" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postal_code" TEXT,
    "citizen_id" TEXT,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "user_details_user_email_key" ON "user_details"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "citizenships_nik_number_key" ON "citizenships"("nik_number");

-- CreateIndex
CREATE UNIQUE INDEX "citizenships_user_detail_email_key" ON "citizenships"("user_detail_email");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_citizen_id_key" ON "addresses"("citizen_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citizenships" ADD CONSTRAINT "citizenships_user_detail_email_fkey" FOREIGN KEY ("user_detail_email") REFERENCES "user_details"("user_email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_citizen_id_fkey" FOREIGN KEY ("citizen_id") REFERENCES "citizenships"("id") ON DELETE SET NULL ON UPDATE CASCADE;
