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
      "first_name": "johan",
      "last_name": "dan",
      "phone_number": "081234567890",
      "user_image_url": "http://example.com/image.jpg"
    }
    ```
- Response:

  - Success:

    - Status: 200
    - Body:

    ```json
    {
      "status": true,
      "message": "Berhasil mengupdate data user",
      "data": {
        "id": 1,
        "email": "john@example.com",
        "phone_number": "081234567890",
        "role": "user", // user or admin
        "detail": {
          "first_name": "johan",
          "last_name": "dan",
          "user_image_url": "http://example.com/image.jpg"
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
      "transaction_type": "redeem", // redeem or withdraw
      "transaction_status": "pending", // pending, approved, rejected
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
    ```

- Response:

  - Success:

    - Status: 201
    - Body:

    ```json
    {
      "status": true,
      "message": "Berhasil menambahkan transaksi",
      "data": {
        "id": "ci2-2090-29i929",
        "transaction_type": "redeem",
        "transaction_status": "pending",
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
    - transaction_type: redeem // Optional
    - transaction_status: pending // Optional
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

#### 1.3. Get All Transaction (Admin)

- Method: GET
- URL: /api/v1/transaction
- Request:

  - Headers:
    - Authorization: Bearer
  - Query:
    - page: 1
    - limit: 10
    - transaction_type: redeem // Optional
    - transaction_status: pending // Optional
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
      "message": "Berhasil mendapatkan data transaksi",
      "data": {
        "id": "ci2-2090-29i929",
        "transaction_type": "redeem",
        "transaction_status": "pending",
        "note": "Diterima dengan baik", // Catatan dari admin
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
      "message": "Berhasil mendapatkan data transaksi",
      "data": {
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
