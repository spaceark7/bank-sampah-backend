import * as yup from 'yup'

export const MaterialCreateSchema = yup.object({
  name: yup.string().min(3, 'Nama material minimal 3 karakter').required('Nama material tidak boleh kosong'),
  base_price: yup.number().min(200, 'Harga material minimal 200').required('Harga material tidak boleh kosong'),
  unit: yup.string().min(1, 'Satuan tidak valid').required('Satuan material tidak boleh kosong')
})
