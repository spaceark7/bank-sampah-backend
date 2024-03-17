#API Specs Bank Sampah

### Auth Api

#### 1.1. Register

- Method: POST
- URL: /api/v1/register
- Request:
  - Body:
    `json
    {
    "email": "Alfreda.Stiedemann45@yahoo.com",
    "password": "password",
    "confirm_password": "password",
    "phone_number": "15675241118",
    "user_detail": {
        "first_name": "Jazmin",
        "last_name": "Gislason"
    }
}
    `
- Response:
  - Success:
    - Status: 201
    - Body:
      ```json
      {
        "status": true,
        "message": "Berhasil mendaftar"
      }
      ```
  - Error:
    - Status: 400
    - Body:
      ```json
      {
        "status": false,
        "message": "Email sudah terdaftar"
      }
      ```

#### 1.2. Login

- Method: POST
- URL: /api/v1/login
- Request:
  - Body:
    ```json
    {
      "email": "john@example.com",
      "password": "secret"
    }
    ```
- Response:
  - Success:
    - Status: 200
    - Body:
      ```json
      {
        "status": true,
        "message": "Berhasil login",
        "data": {
          "token": "jwt-token-here"
        }
      }
      ```
  - Error:
    - Status: 400
    - Body:
      ```json
      {
        "status": false,
        "message": "Email atau password salah",
        "data": null
      }
      ```

### User Detail Api

#### 1.1. Get User Detail

- Method: GET
- URL: /api/v1/user
- Request:
  - Headers:
    - Authorization: Bearer
- Response:

  - Success:

    - Status: 200
    - Body:

      ```json
      {
        "status": true,
        "message": "GET User successfully retrieved",
        "data": {
          "email": "Roxane.Wolff54@yahoo.com",
          "phone_number": "08676767676",
          "user_detail": {
            "first_name": "Craig",
            "last_name": "Batz",
            "user_image_url": null,
            "balance": {
              "balance_amount": 0
            },
            "citizenship": null
          }
        }
      }
      ```

  - Error:
    - Status: 401
    - Body:
      ```json
      {
        "status": false,
        "message": "Unauthorized",
        "data": null
      }
      ```

#### 1.2. Update User Detail

- Method: PUT
- URL: /api/v1/user
- Request:
  - Headers:
    - Authorization: Bearer
  - Body:
    ```json
    {
      "email": "Elias35@hotmail.com",
      "password": "password",
      "confirm_password": "password",
      "phone_number": "08565656565",
      "user_detail": {
        "first_name": "Mariano",
        "last_name": "Walsh"
      }
    }
    ```
- Response:

  - Success:

    - Status: 200
    - Body:

    ```json
    {
      "status": true,
      "message": "PUT User successfully retrieved",
      "data": {
        "email": "Elias35@hotmail.com",
        "phone_number": "08565656565",
        "role_id": "User",
        "user_detail": {
          "first_name": "Mariano",
          "last_name": "Walsh",
          "user_image_url": null
        }
      }
    }
    ```

    - Error:
      - Status: 400
      - Body:
      ```json
      {
        "status": false,
        "message": "Data sudah ada",
        "data": null
      }
      ```

#### 1.3. Add User Citizenship

- Method: POST
- URL: /api/v1/user-citizenship
- Request:
  - Headers:
    - Authorization: Bearer
  - Body:
    ```json
    {
      "nik_number": "1234567890",
      "family_id_number": "1234567890",
      "id_card_image_url": "http://example.com/image.jpg",
      // Optional
      "gender": "Pria",
      "birth_place": "Cianjur",
      "birth_date": "1990-01-01",
      "marital_status": "Belum Menikah",
      "address": {
        "address": "Jl. Hanjawar",
        "village": "Palasari",
        "district": "Cipanas",
        "city": "Cianjur",
        "province": "Jawa Barat",
        "postal_code": "43253"
      },
      "user_image_url": "http://example.com/image.jpg" // Optional
    }
    ```
- Response:
  - Success:
    - Status: 201
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil menambahakan identitas kependudukan"
    }
    ```
  - Error:
    - Status: 400
    - Body:
    ```json
    {
      "status": false,
      "message": "Data sudah ada"
    }
    ```

#### 1.4. Get User Citizenship

- Method: GET
- URL: /api/v1/user-citizenship
- Request:
  - Headers:
    - Authorization: Bearer
- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil mendapatkan data identitas kependudukan",
      "data": {
        "nik_number": "1234567890",
        "family_id_number": "1234567890",
        "id_card_image_url": "http://example.com/image.jpg",
        "gender": "Pria",
        "birth_place": "Cianjur",
        "birth_date": "1990-01-01",
        "marital_status": "Belum Menikah",
        "address": {
          "address": "Jl. Hanjawar",
          "village": "Palasari",
          "district": "Cipanas",
          "city": "Cianjur",
          "province": "Jawa Barat",
          "postal_code": "43253"
        },
        "user_image_url": "http://example.com/image.jpg"
      }
    }
    ```
  - Error:
    - Status: 404
    - Body:
    ```json
    {
      "status": false,
      "message": "Data tidak ditemukan",
      "data": null
    }
    ```

#### 1.5. Update User Citizenship

- Method: PUT
- URL: /api/v1/user-citizenship
- Request:
  - Headers:
    - Authorization: Bearer
  - Body:
    ```json
    {
      "nik_number": "1111111111",
      "family_id_number": "222222222",
      "id_card_image_url": "http://example.com/image.jpg", // Optional
      "gender": "Pria",
      "birth_place": "Cianjur",
      "birth_date": "1990-01-01",
      "marital_status": "Belum Menikah",
      "address": {
        "address": "Jl. Hanjawar",
        "village": "Palasari",
        "district": "Cipanas",
        "city": "Cianjur",
        "province": "Jawa Barat",
        "postal_code": "43253"
      },
      "user_image_url": "http://example.com/image.jpg" // Optional
    }
    ```
- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil mengupdate data identitas kependudukan",
      "data": {
        "nik_number": "1111111111",
        "family_id_number": "222222222",
        "id_card_image_url": "http://example.com/image.jpg",
        "address": {
          "address": "Jl. Hanjawar",
          "village": "Palasari",
          "district": "Cipanas",
          "city": "Cianjur",
          "province": "Jawa Barat",
          "postal_code": "43253"
        },
        "user_image_url": "http://example.com/image.jpg"
      }
    }
    ```
  - Error:
    - Status: 400
    - Body:
    ```json
    {
      "status": false,
      "message": "Data sudah ada"
    }
    ```

### Material Api

#### 1.1. Create Material (Admin Only)

- Method: POST
- URL: /api/v1/materials
- Request:
  - Headers:
    - Authorization: Bearer
  - Body:
    ```json
    {
      "name": "Fresh",
      "base_price": 754,
      "unit": "Kg"
    }
    ```
- Response:
  - Success:
    - Status: 201
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil menambahkan material",
      "data": {
        "id": "09f5d874-4028-46f7-87b1-48f4173a7541",
        "name": "Rubber",
        "base_price": 774,
        "unit": "Kg",
        "created_at": "2024-03-15T06:14:25.164Z",
        "updated_at": "2024-03-15T06:14:25.164Z",
        "is_active": true,
        "is_deleted": false,
        "deleted_at": null
      }
    }
    ```
  - Error:
    - Status: 400
    - Body:
    ```json
    {
      "status": false,
      "message": "Data sudah ada"
    }
    ```

#### 1.2. Get All Material

- Method: GET
- URL: /api/v1/materials
- Request:
  - Headers:
    - Authorization: Bearer
- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil mendapatkan data material",
      "data": [
        {
          "id": "09f5d874-4028-46f7-87b1-48f4173a7541",
          "name": "Rubber",
          "base_price": 774,
          "unit": "Kg",
          "created_at": "2024-03-15T06:14:25.164Z",
          "updated_at": "2024-03-15T06:14:25.164Z",
          "is_active": true,
          "is_deleted": false,
          "deleted_at": null
        }
      ]
    }
    ```
  - Error:
    - Status: 404
    - Body:
    ```json
    {
      "status": false,
      "message": "Data tidak ditemukan",
      "data": null
    }
    ```

#### 1.3. Get Material By Id

- Method: GET
- URL: /api/v1/materials/:id
- Request:
  - Headers:
    - Authorization: Bearer
- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil mendapatkan data material",
      "data": {
        "id": "09f5d874-4028-46f7-87b1-48f4173a7541",
        "name": "Rubber",
        "base_price": 774,
        "unit": "Kg",
        "created_at": "2024-03-15T06:14:25.164Z",
        "updated_at": "2024-03-15T06:14:25.164Z",
        "is_active": true,
        "is_deleted": false,
        "deleted_at": null
      }
    }
    ```
  - Error:
    - Status: 404
    - Body:
    ```json
    {
      "status": false,
      "message": "Data tidak ditemukan",
      "data": null
    }
    ```

#### 1.4. Update Material (Admin Only)

- Method: PUT
- URL: /api/v1/materials/:id
- Request:
  - Headers:
    - Authorization: Bearer
  - Body:
    ```json
    {
      "name": "Fresh",
      "base_price": 754,
      "unit": "Kg"
    }
    ```
- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil mengupdate material",
      "data": {
        "id": "09f5d874-4028-46f7-87b1-48f4173a7541",
        "name": "Fresh",
        "base_price": 754,
        "unit": "Kg",
        "created_at": "2024-03-15T06:14:25.164Z",
        "updated_at": "2024-03-15T06:14:25.164Z",
        "is_active": true,
        "is_deleted": false,
        "deleted_at": null
      }
    }
    ```
  - Error:
    - Status: 400
    - Body:
    ```json
    {
      "status": false,
      "message": "Data sudah ada"
    }
    ```

#### 1.5. Delete Material (Admin Only)

- Method: DELETE
- URL: /api/v1/materials/:id
- Request:
  - Headers:
    - Authorization: Bearer
- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil menghapus material"
    }
    ```
  - Error:
    - Status: 400
    - Body:
    ```json
    {
      "status": false,
      "message": "Data tidak ditemukan"
    }
    ```

### Transaction Api

#### 1.1. Create Redemption Transaction (Admin Only)

- Method: POST
- URL: /api/v1/transaction/redeem
- Request:

  - Headers:
    - Authorization: Bearer
  - Body:
    ```json
    {
      "user_detail_id": "5fb8a67d-c3fb-4ecc-87a3-f45f7da9bd68",
      "transaction_type": "Redeem",
      "transaction_status": "Pending",
      "notes": "Catatan Transaksi 2 User Lain",
      "transaction_detail": [
        {
          "transaction_weight": 10,
          "transaction_amount": 200,
          "transaction_material": "Bronze",
          "transaction_image_url": null,
          "transaction_unit": "Kg",
          "transaction_date": "2024-03-15T21:57:42.169Z"
        },
        {
          "transaction_amount": 200,
          "transaction_date": "2024-03-15T22:46:24.653Z",
          "transaction_material": "Concrete",
          "transaction_image_url": null,
          "transaction_weight": 10,
          "transaction_unit": "Kg"
        },
        {
          "transaction_date": "2024-03-15T18:29:59.066Z",
          "transaction_weight": 10,
          "transaction_unit": "Kg",
          "transaction_amount": 200,
          "transaction_image_url": null,
          "transaction_material": "Frozen"
        },
        {
          "transaction_date": "2024-03-16T02:08:44.852Z",
          "transaction_amount": 200,
          "transaction_weight": 10,
          "transaction_material": "Metal",
          "transaction_image_url": null,
          "transaction_unit": "Kg"
        }
      ]
    }
    ```

- Response:

  - Success:

    - Status: 201
    - Body:

    ```json
    {
      "status": true,
      "message": "Create Transaction created successfully",
      "data": {
        "id": "87cca7ed-924e-4603-9fe9-b5149ccc0ddb",
        "transaction_status": "Pending",
        "user_detail_id": "5fb8a67d-c3fb-4ecc-87a3-f45f7da9bd68",
        "notes": "Catatan Transaksi 2 User Lain",
        "deleted_at": null,
        "created_at": "2024-03-16T16:08:31.409Z",
        "updated_at": "2024-03-16T16:08:31.409Z",
        "transaction_type": "Redeem",
        "transaction_detail": [
          {
            "id": "d972652e-9638-4cf4-ae9a-6e5e4e1b7dd8",
            "transaction_amount": 200,
            "transaction_weight": 10,
            "transaction_date": "2024-03-15T21:57:42.169Z",
            "transaction_unit": "Kg",
            "transaction_material": "Bronze",
            "transaction_image_url": null,
            "created_at": "2024-03-16T16:08:31.409Z",
            "updated_at": "2024-03-16T16:08:31.409Z",
            "transaction_id": "87cca7ed-924e-4603-9fe9-b5149ccc0ddb"
          },
          {
            "id": "eaa23361-7d30-4418-bb01-5fe5d1d6df55",
            "transaction_amount": 200,
            "transaction_weight": 10,
            "transaction_date": "2024-03-15T22:46:24.653Z",
            "transaction_unit": "Kg",
            "transaction_material": "Concrete",
            "transaction_image_url": null,
            "created_at": "2024-03-16T16:08:31.409Z",
            "updated_at": "2024-03-16T16:08:31.409Z",
            "transaction_id": "87cca7ed-924e-4603-9fe9-b5149ccc0ddb"
          },
          {
            "id": "2e91ba4e-836a-4b2e-b16c-5e886d46cd87",
            "transaction_amount": 200,
            "transaction_weight": 10,
            "transaction_date": "2024-03-15T18:29:59.066Z",
            "transaction_unit": "Kg",
            "transaction_material": "Frozen",
            "transaction_image_url": null,
            "created_at": "2024-03-16T16:08:31.409Z",
            "updated_at": "2024-03-16T16:08:31.409Z",
            "transaction_id": "87cca7ed-924e-4603-9fe9-b5149ccc0ddb"
          },
          {
            "id": "d33dfd93-67bc-44d5-8f84-2b3facf6db9c",
            "transaction_amount": 200,
            "transaction_weight": 10,
            "transaction_date": "2024-03-16T02:08:44.852Z",
            "transaction_unit": "Kg",
            "transaction_material": "Metal",
            "transaction_image_url": null,
            "created_at": "2024-03-16T16:08:31.409Z",
            "updated_at": "2024-03-16T16:08:31.409Z",
            "transaction_id": "87cca7ed-924e-4603-9fe9-b5149ccc0ddb"
          }
        ],
        "user_detail": {
          "id": "5fb8a67d-c3fb-4ecc-87a3-f45f7da9bd68",
          "first_name": "Amina",
          "last_name": "Gorczany",
          "user_email": "Amos_Davis77@hotmail.com",
          "balance": {
            "balance_amount": 0
          }
        }
      }
    }
    ```

  - Error:
    - Status: 400
    - Body:
    ```json
    {
      "status": false,
      "message": "Data sudah ada"
    }
    ```

#### 1.2. Get All Transaction (User)

- Method: GET
- URL: /api/v1/transaction
- Request:
  - Headers:
    - Authorization: Bearer
  - Query:
    - page: 1
    - limit: 10
    - type: redeem // Optional
    - status: pending // Optional
- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "GET Get All Transaction successfully retrieved",
      "data": [
        {
          "id": "0506b0e6-71dd-4fc2-88e6-2f9ff45591f0",
          "transaction_status": "Pending",
          "user_detail_id": "7b4ada85-5fda-46eb-b253-5bdf0c56a70c",
          "notes": "Catatan Transaksi 2",
          "deleted_at": null,
          "created_at": "2024-03-16T13:19:32.321Z",
          "updated_at": "2024-03-16T13:19:32.321Z",
          "transaction_type": "Redeem",
          "transaction_detail": [
            {
              "id": "61e50e9c-b957-4d42-bc2e-c7cfc0c1fc0b",
              "transaction_amount": 200,
              "transaction_weight": 10,
              "transaction_date": "2024-03-16T08:53:44.824Z",
              "transaction_unit": "Kg",
              "transaction_material": "Frozen",
              "transaction_image_url": null,
              "created_at": "2024-03-16T13:19:32.321Z",
              "updated_at": "2024-03-16T13:19:32.321Z",
              "transaction_id": "0506b0e6-71dd-4fc2-88e6-2f9ff45591f0"
            },
            {
              "id": "1ace22af-661b-4280-9522-3c978c2ad86e",
              "transaction_amount": 200,
              "transaction_weight": 10,
              "transaction_date": "2024-03-15T20:01:19.083Z",
              "transaction_unit": "Kg",
              "transaction_material": "Wooden",
              "transaction_image_url": null,
              "created_at": "2024-03-16T13:19:32.321Z",
              "updated_at": "2024-03-16T13:19:32.321Z",
              "transaction_id": "0506b0e6-71dd-4fc2-88e6-2f9ff45591f0"
            }
          ],
          "user_detail": {
            "id": "7b4ada85-5fda-46eb-b253-5bdf0c56a70c",
            "first_name": "Elmer",
            "last_name": "Kovacek",
            "user_email": "Hannah_Corwin@yahoo.com"
          }
        },
        {
          "id": "6a01f29a-bbe5-4ba3-99d1-a11a800b2e21",
          "transaction_status": "Success",
          "user_detail_id": "7b4ada85-5fda-46eb-b253-5bdf0c56a70c",
          "notes": "Catatan Transaksi 1",
          "deleted_at": null,
          "created_at": "2024-03-16T13:18:41.408Z",
          "updated_at": "2024-03-16T13:18:41.408Z",
          "transaction_type": "Redeem",
          "transaction_detail": [
            {
              "id": "c71e1d2d-9544-41f8-b6d2-19492fd66882",
              "transaction_amount": 200,
              "transaction_weight": 10,
              "transaction_date": "2024-03-16T08:53:44.824Z",
              "transaction_unit": "Kg",
              "transaction_material": "Frozen",
              "transaction_image_url": null,
              "created_at": "2024-03-16T13:18:41.408Z",
              "updated_at": "2024-03-16T13:18:41.408Z",
              "transaction_id": "6a01f29a-bbe5-4ba3-99d1-a11a800b2e21"
            },
            {
              "id": "1b0532fc-ed03-43bd-9d13-730ec150d7e4",
              "transaction_amount": 200,
              "transaction_weight": 10,
              "transaction_date": "2024-03-15T20:01:19.083Z",
              "transaction_unit": "Kg",
              "transaction_material": "Wooden",
              "transaction_image_url": null,
              "created_at": "2024-03-16T13:18:41.408Z",
              "updated_at": "2024-03-16T13:18:41.408Z",
              "transaction_id": "6a01f29a-bbe5-4ba3-99d1-a11a800b2e21"
            }
          ],
          "user_detail": {
            "id": "7b4ada85-5fda-46eb-b253-5bdf0c56a70c",
            "first_name": "Elmer",
            "last_name": "Kovacek",
            "user_email": "Hannah_Corwin@yahoo.com"
          }
        },
        {
          "id": "704b0fd6-f152-4ea9-ae03-7c3aa25f4ed0",
          "transaction_status": "Pending",
          "user_detail_id": "5fb8a67d-c3fb-4ecc-87a3-f45f7da9bd68",
          "notes": "Catatan Transaksi 1 User Lain",
          "deleted_at": null,
          "created_at": "2024-03-16T15:02:59.768Z",
          "updated_at": "2024-03-16T15:02:59.768Z",
          "transaction_type": "Redeem",
          "transaction_detail": [
            {
              "id": "e2f75b5c-e67b-4c54-a536-569768f0686b",
              "transaction_amount": 200,
              "transaction_weight": 10,
              "transaction_date": "2024-03-16T08:53:44.824Z",
              "transaction_unit": "Kg",
              "transaction_material": "Frozen",
              "transaction_image_url": null,
              "created_at": "2024-03-16T15:02:59.768Z",
              "updated_at": "2024-03-16T15:02:59.768Z",
              "transaction_id": "704b0fd6-f152-4ea9-ae03-7c3aa25f4ed0"
            },
            {
              "id": "8fa74270-b4d3-44bd-a0b2-418d1f263fc6",
              "transaction_amount": 200,
              "transaction_weight": 10,
              "transaction_date": "2024-03-15T20:01:19.083Z",
              "transaction_unit": "Kg",
              "transaction_material": "Wooden",
              "transaction_image_url": null,
              "created_at": "2024-03-16T15:02:59.768Z",
              "updated_at": "2024-03-16T15:02:59.768Z",
              "transaction_id": "704b0fd6-f152-4ea9-ae03-7c3aa25f4ed0"
            }
          ],
          "user_detail": {
            "id": "5fb8a67d-c3fb-4ecc-87a3-f45f7da9bd68",
            "first_name": "Amina",
            "last_name": "Gorczany",
            "user_email": "Amos_Davis77@hotmail.com"
          }
        },
        {
          "id": "87cca7ed-924e-4603-9fe9-b5149ccc0ddb",
          "transaction_status": "Pending",
          "user_detail_id": "5fb8a67d-c3fb-4ecc-87a3-f45f7da9bd68",
          "notes": "Catatan Transaksi 2 User Lain",
          "deleted_at": null,
          "created_at": "2024-03-16T16:08:31.409Z",
          "updated_at": "2024-03-16T16:08:31.409Z",
          "transaction_type": "Redeem",
          "transaction_detail": [
            {
              "id": "d972652e-9638-4cf4-ae9a-6e5e4e1b7dd8",
              "transaction_amount": 200,
              "transaction_weight": 10,
              "transaction_date": "2024-03-15T21:57:42.169Z",
              "transaction_unit": "Kg",
              "transaction_material": "Bronze",
              "transaction_image_url": null,
              "created_at": "2024-03-16T16:08:31.409Z",
              "updated_at": "2024-03-16T16:08:31.409Z",
              "transaction_id": "87cca7ed-924e-4603-9fe9-b5149ccc0ddb"
            },
            {
              "id": "eaa23361-7d30-4418-bb01-5fe5d1d6df55",
              "transaction_amount": 200,
              "transaction_weight": 10,
              "transaction_date": "2024-03-15T22:46:24.653Z",
              "transaction_unit": "Kg",
              "transaction_material": "Concrete",
              "transaction_image_url": null,
              "created_at": "2024-03-16T16:08:31.409Z",
              "updated_at": "2024-03-16T16:08:31.409Z",
              "transaction_id": "87cca7ed-924e-4603-9fe9-b5149ccc0ddb"
            },
            {
              "id": "2e91ba4e-836a-4b2e-b16c-5e886d46cd87",
              "transaction_amount": 200,
              "transaction_weight": 10,
              "transaction_date": "2024-03-15T18:29:59.066Z",
              "transaction_unit": "Kg",
              "transaction_material": "Frozen",
              "transaction_image_url": null,
              "created_at": "2024-03-16T16:08:31.409Z",
              "updated_at": "2024-03-16T16:08:31.409Z",
              "transaction_id": "87cca7ed-924e-4603-9fe9-b5149ccc0ddb"
            },
            {
              "id": "d33dfd93-67bc-44d5-8f84-2b3facf6db9c",
              "transaction_amount": 200,
              "transaction_weight": 10,
              "transaction_date": "2024-03-16T02:08:44.852Z",
              "transaction_unit": "Kg",
              "transaction_material": "Metal",
              "transaction_image_url": null,
              "created_at": "2024-03-16T16:08:31.409Z",
              "updated_at": "2024-03-16T16:08:31.409Z",
              "transaction_id": "87cca7ed-924e-4603-9fe9-b5149ccc0ddb"
            }
          ],
          "user_detail": {
            "id": "5fb8a67d-c3fb-4ecc-87a3-f45f7da9bd68",
            "first_name": "Amina",
            "last_name": "Gorczany",
            "user_email": "Amos_Davis77@hotmail.com"
          }
        },
        {
          "id": "e7cf828c-4e61-45ed-8b1f-1f8aab82f452",
          "transaction_status": "Pending",
          "user_detail_id": "5fb8a67d-c3fb-4ecc-87a3-f45f7da9bd68",
          "notes": "Catatan Transaksi 2 User Lain",
          "deleted_at": null,
          "created_at": "2024-03-16T15:03:19.723Z",
          "updated_at": "2024-03-16T15:03:19.723Z",
          "transaction_type": "Redeem",
          "transaction_detail": [
            {
              "id": "70b7bbce-528e-4eb8-a014-1b16c6b6470e",
              "transaction_amount": 200,
              "transaction_weight": 10,
              "transaction_date": "2024-03-15T21:57:42.169Z",
              "transaction_unit": "Kg",
              "transaction_material": "Bronze",
              "transaction_image_url": null,
              "created_at": "2024-03-16T15:03:19.723Z",
              "updated_at": "2024-03-16T15:03:19.723Z",
              "transaction_id": "e7cf828c-4e61-45ed-8b1f-1f8aab82f452"
            },
            {
              "id": "68c5b50a-86c0-40ce-9045-82c727d85151",
              "transaction_amount": 200,
              "transaction_weight": 10,
              "transaction_date": "2024-03-15T22:46:24.653Z",
              "transaction_unit": "Kg",
              "transaction_material": "Concrete",
              "transaction_image_url": null,
              "created_at": "2024-03-16T15:03:19.723Z",
              "updated_at": "2024-03-16T15:03:19.723Z",
              "transaction_id": "e7cf828c-4e61-45ed-8b1f-1f8aab82f452"
            },
            {
              "id": "e0aaa2f7-dff7-4bed-bab2-81ded5590441",
              "transaction_amount": 200,
              "transaction_weight": 10,
              "transaction_date": "2024-03-15T18:29:59.066Z",
              "transaction_unit": "Kg",
              "transaction_material": "Frozen",
              "transaction_image_url": null,
              "created_at": "2024-03-16T15:03:19.723Z",
              "updated_at": "2024-03-16T15:03:19.723Z",
              "transaction_id": "e7cf828c-4e61-45ed-8b1f-1f8aab82f452"
            },
            {
              "id": "653da50b-d5c4-4d20-9b39-10a8ad10e367",
              "transaction_amount": 200,
              "transaction_weight": 10,
              "transaction_date": "2024-03-16T02:08:44.852Z",
              "transaction_unit": "Kg",
              "transaction_material": "Metal",
              "transaction_image_url": null,
              "created_at": "2024-03-16T15:03:19.723Z",
              "updated_at": "2024-03-16T15:03:19.723Z",
              "transaction_id": "e7cf828c-4e61-45ed-8b1f-1f8aab82f452"
            }
          ],
          "user_detail": {
            "id": "5fb8a67d-c3fb-4ecc-87a3-f45f7da9bd68",
            "first_name": "Amina",
            "last_name": "Gorczany",
            "user_email": "Amos_Davis77@hotmail.com"
          }
        }
      ],
      "meta": {
        "page": 1,
        "limit": 10,
        "totalPages": 1,
        "totalItems": 5,
        "hasNextPage": false,
        "hasPreviousPage": false
      }
    }
    ```
  - Error:
    - Status: 404
    - Body:
    ```json
    {
      "status": false,
      "message": "Data tidak ditemukan",
      "data": null
    }
    ```

#### 1.3. Get All Transaction (Admin)

- Method: GET
- URL: /api/v1/transaction
- Request:

  - Headers:
    - Authorization: Bearer
  - Query:
    - page: 1
    - limit: 10
    - type: redeem // Optional
    - status: pending // Optional
    - user_id: ci2-2090-asdasd // Optional

- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil mendapatkan data transaksi",
      "data": [
        {
          "id": "ci2-2090-29i929",
          "transaction_type": "redeem",
          "transaction_status": "pending",
          "note": "Diterima dengan baik", // Catatan dari admin
          "user": {
            "id": "ci2-2090-asdasd",
            "phone_number": "081234567890",
            "email": "john@example.com",
            "detail": {
              "first_name": "john",
              "last_name": "doe",
              "user_image_url": "http://example.com/image.jpg"
            }
          },
          "detail": [
            {
              "transaction_material": "Kardus", // Fill with material name
              "transaction_weight": 10, // In kg
              "transaction_amount": 100000, // In rupiah
              "transaction_date": "2024-04-24",
              "transaction_image_url": "http://example.com/image.jpg" // Optional
            }
          ]
        }
      ],
      "meta": {
        "page": 1,
        "limit": 10,
        "total_data": 1,
        "next_page": null,
        "prev_page": null
      }
    }
    ```
  - Error:
    - Status: 404
    - Body:
    ```json
    {
      "status": false,
      "message": "Data tidak ditemukan",
      "data": null
    }
    ```

#### 1.4. Get Transaction By Id (User)

- Method: GET
- URL: /api/v1/transaction/:id
- Request:
  - Headers:
    - Authorization: Bearer
- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "GET Get Transaction By Id successfully retrieved",
      "data": {
        "id": "0506b0e6-71dd-4fc2-88e6-2f9ff45591f0",
        "transaction_status": "Pending",
        "user_detail_id": "7b4ada85-5fda-46eb-b253-5bdf0c56a70c",
        "notes": "Catatan Transaksi 2",
        "deleted_at": null,
        "created_at": "2024-03-16T13:19:32.321Z",
        "updated_at": "2024-03-16T13:19:32.321Z",
        "transaction_type": "Redeem",
        "transaction_detail": [
          {
            "id": "61e50e9c-b957-4d42-bc2e-c7cfc0c1fc0b",
            "transaction_amount": 200,
            "transaction_weight": 10,
            "transaction_date": "2024-03-16T08:53:44.824Z",
            "transaction_unit": "Kg",
            "transaction_material": "Frozen",
            "transaction_image_url": null,
            "created_at": "2024-03-16T13:19:32.321Z",
            "updated_at": "2024-03-16T13:19:32.321Z",
            "transaction_id": "0506b0e6-71dd-4fc2-88e6-2f9ff45591f0"
          },
          {
            "id": "1ace22af-661b-4280-9522-3c978c2ad86e",
            "transaction_amount": 200,
            "transaction_weight": 10,
            "transaction_date": "2024-03-15T20:01:19.083Z",
            "transaction_unit": "Kg",
            "transaction_material": "Wooden",
            "transaction_image_url": null,
            "created_at": "2024-03-16T13:19:32.321Z",
            "updated_at": "2024-03-16T13:19:32.321Z",
            "transaction_id": "0506b0e6-71dd-4fc2-88e6-2f9ff45591f0"
          }
        ],
        "user_detail": {
          "id": "7b4ada85-5fda-46eb-b253-5bdf0c56a70c",
          "first_name": "Elmer",
          "last_name": "Kovacek",
          "user_email": "Hannah_Corwin@yahoo.com"
        }
      }
    }
    ```
  - Error:
    - Status: 404
    - Body:
    ```json
    {
      "status": false,
      "message": "Data tidak ditemukan",
      "data": null
    }
    ```

#### 1.5. Get Transaction By Id (Admin)

- Method: GET
- URL: /api/v1/transaction/:id
- Request:
  - Headers:
    - Authorization: Bearer
- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "GET Get Transaction By Id successfully retrieved",
      "data": {
        "id": "0506b0e6-71dd-4fc2-88e6-2f9ff45591f0",
        "transaction_status": "Pending",
        "user_detail_id": "7b4ada85-5fda-46eb-b253-5bdf0c56a70c",
        "notes": "Catatan Transaksi 2",
        "deleted_at": null,
        "created_at": "2024-03-16T13:19:32.321Z",
        "updated_at": "2024-03-16T13:19:32.321Z",
        "transaction_type": "Redeem",
        "transaction_detail": [
          {
            "id": "61e50e9c-b957-4d42-bc2e-c7cfc0c1fc0b",
            "transaction_amount": 200,
            "transaction_weight": 10,
            "transaction_date": "2024-03-16T08:53:44.824Z",
            "transaction_unit": "Kg",
            "transaction_material": "Frozen",
            "transaction_image_url": null,
            "created_at": "2024-03-16T13:19:32.321Z",
            "updated_at": "2024-03-16T13:19:32.321Z",
            "transaction_id": "0506b0e6-71dd-4fc2-88e6-2f9ff45591f0"
          },
          {
            "id": "1ace22af-661b-4280-9522-3c978c2ad86e",
            "transaction_amount": 200,
            "transaction_weight": 10,
            "transaction_date": "2024-03-15T20:01:19.083Z",
            "transaction_unit": "Kg",
            "transaction_material": "Wooden",
            "transaction_image_url": null,
            "created_at": "2024-03-16T13:19:32.321Z",
            "updated_at": "2024-03-16T13:19:32.321Z",
            "transaction_id": "0506b0e6-71dd-4fc2-88e6-2f9ff45591f0"
          }
        ],
        "user_detail": {
          "id": "7b4ada85-5fda-46eb-b253-5bdf0c56a70c",
          "first_name": "Elmer",
          "last_name": "Kovacek",
          "user_email": "Hannah_Corwin@yahoo.com"
        }
      }
    }
    ```
  - Error:
    - Status: 404
    - Body:
    ```json
    {
      "status": false,
      "message": "Data tidak ditemukan",
      "data": null
    }
    ```

#### 1.6. Update Transaction Status (Admin Only)

- Method: PUT
- URL: /api/v1/transaction/redeem/:id
- Request:
  - Headers:
    - Authorization: Bearer
  - Body:
    ```json
    {
      "id": "ci2-2090-29i929",
      "transaction_status": "pending",
      "user": {
        "id": "ci2-2090-asdasd",
        "phone_number": "081234567890",
        "email": "john@example.com",
        "detail": {
          "first_name": "john",
          "last_name": "doe",
          "user_image_url": "http://example.com/image.jpg"
        }
      },
      "detail": [
        {
          "transaction_material": "Plastik", // From Kardus to Plastik
          "transaction_weight": 2, // In kg
          "transaction_amount": 2000, // In rupiah
          "transaction_date": "2024-04-24",
          "transaction_image_url": "http://example.com/image.jpg" // Optional
        }
      ]
    }
    ```
- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil mengupdate status transaksi",
      "data": {
        "id": "ci2-2090-29i929",
        "transaction_status": "pending",
        "user": {
          "id": "ci2-2090-asdasd",
          "phone_number": "081234567890",
          "email": "john@example.com",
          "detail": {
            "first_name": "john",
            "last_name": "doe",
            "user_image_url": "http://example.com/image.jpg"
          }
        },
        "detail": [
          {
            "transaction_material": "Plastik", // From Kardus to Plastik
            "transaction_weight": 2, // In kg
            "transaction_amount": 2000, // In rupiah
            "transaction_date": "2024-04-24",
            "transaction_image_url": "http://example.com/image.jpg" // Optional
          }
        ]
      }
    }
    ```
  - Error:
    - Status: 400
    - Body:
    ```json
    {
      "status": false,
      "message": "Data sudah ada"
    }
    ```

#### 1.7. Delete Transaction (Admin Only)

- Method: DELETE
- URL: /api/v1/transaction/redeem/:id
- Request:
  - Headers:
    - Authorization: Bearer
- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil menghapus transaksi"
    }
    ```
  - Error:
    - Status: 400
    - Body:
    ```json
    {
      "status": false,
      "message": "Data tidak ditemukan"
    }
    ```

#### 1.8. Create Withdraw Transaction Submission (User Only)

- Method: POST
- URL: /api/v1/transaction/withdraw
- Request:
  - Headers:
    - Authorization: Bearer
  - Body:
    ```json
    {
      "transaction_type": "withdraw", // redeem or withdraw
      "withdraw_amount": 100000 // In rupiah
    }
    ```
- Response:
  - Success:
    - Status: 201
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil membuat pengajuan penarikan",
      "data": {
        "id": "ci2-2090-29i929",
        "transaction_type": "withdraw",
        "withdraw_amount": 100000, // In rupiah
        "transaction_status": "pending"
      }
    }
    ```
  - Error:
    - Status: 400
    - Body:
    ```json
    {
      "status": false,
      "message": "Saldo tidak cukup"
    }
    ```

#### 1.9. Update Withdraw Transaction Status (User Only)

- Method: PUT
- URL: /api/v1/transaction/withdraw/:id
- Request:
  - Headers:
    - Authorization: Bearer
  - Body:
    ```json
    {
      "id": "ci2-2090-29i929",
      "transaction_status": "pending",
      "withdraw_amount": 200000 // In rupiah
    }
    ```
- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil mengupdate status transaksi",
      "data": {
        "id": "ci2-2090-29i929",
        "transaction_type": "withdraw",
        "withdraw_amount": 200000, // In rupiah
        "transaction_status": "pending"
      }
    }
    ```
  - Error:
    - Status: 400
    - Body:
    ```json
    {
      "status": false,
      "message": "Data sudah ada"
    }
    ```

#### 1.10. Cancel Withdraw Transaction (User Only)

- Method: DELETE
- URL: /api/v1/transaction/withdraw
- Request:
  - Headers:
    - Authorization: Bearer
- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil membatalkan transaksi"
    }
    ```
  - Error:
    - Status: 400
    - Body:
    ```json
    {
      "status": false,
      "message": "Data tidak ditemukan"
    }
    ```

### User Balance Api

#### 1.1. Get User Balance (User)

- Method: GET
- URL: /api/v1/balance
- Request:
  - Headers:
    - Authorization: Bearer
- Response:
  - Success:
    - Status: 200
    - Body:
    ```json
    {
      "status": true,
      "message": "Berhasil mendapatkan saldo",
      "data": {
        "balance": 1000000 // In rupiah
      }
    }
    ```
  - Error:
    - Status: 404
    - Body:
    ```json
    {
      "status": false,
      "message": "Data tidak ditemukan",
      "data": null
    }
    ```

#### 1.2. Get User Balance (Admin)

- Method: GET
- URL: /api/v1/balance
- Request:
  - Headers:
    - Authorization: Bearer
  - Query:
    - user_id: ci2-2090-asdasd // Optional
- Response:

  - Success:

    - Status: 200
    - Body:

    ```json
    {
      "status": true,
      "message": "Berhasil mendapatkan saldo",
      "data": {
        "id": "ci2-2090-asdasd",
        "phone_number": "081234567890",
        "email": "john@example.com",
        "detail": {
          "first_name": "john",
          "last_name": "doe"
        },
        "balance": 1000000 // In rupiah
      }
    }
    ```

    - Error:
      - Status: 404
      - Body:
      ```json
      {
        "status": false,
        "message": "Data tidak ditemukan",
        "data": null
      }
      ```

### Approval Api

#### 1.1 Approve Withdraw Submission (Admin Only)
