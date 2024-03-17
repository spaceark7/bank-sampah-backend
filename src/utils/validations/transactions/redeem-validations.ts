import * as yup from 'yup'

export const TransactionRedeemDetailSchema = yup.object({
  transaction_material: yup.string().required('Material harus diisi'),
  transaction_unit: yup.string().required('Unit harus diisi'),
  transaction_date: yup.date().required('Tanggal transaksi harus diisi'),
  transaction_weight: yup.number().required('Berat Material harus diisi').min(0, 'Berat Material tidak boleh kurang dari 0'),
  transaction_amount: yup.number().required('Jumlah total harus diisi').min(0, 'Jumlah total tidak boleh kurang dari 0'),
  transaction_image_url: yup.string().url('URL gambar tidak valid').nullable()
})
export const TransactionCreateRedeemSchema = yup.object({
  user_detail_id: yup.string().required('User detail id harus diisi'),
  transaction_type: yup
    .string()
    .oneOf(['Redeem', 'Withdraw'], 'Jenis transaksi harus diisi sesuai (Redeem/Withdraw)')
    .required('Jenis transaksi harus diisi'),
  transaction_status: yup
    .string()
    .oneOf(['Pending', 'Success', 'Reject'], 'Status transaksi harus diisi sesuai (Pending/Success/Reject)')
    .required('Status transaksi harus diisi'),
  notes: yup.string().max(255, 'Catatan tidak boleh lebih dari 255 karakter'),
  transaction_detail: yup
    .array()
    .of(TransactionRedeemDetailSchema)
    .min(1, 'Detail transaksi harus diisi minimal 1')
    .required('Detail transaksi tidak boleh kosong')
})
