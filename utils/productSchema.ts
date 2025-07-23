import { z } from 'zod'

export const PRODUCT_SCHEMA = z.object({
  name: z
    .string()
    .min(1, {
      message: '最1字'
    })
    .max(200, {
      message: '最多200字'
    }),
  company: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(1, {
    message: '價格必須為正整數'
  }),
  description: z.string().refine(
    (description) => {
      const wordCounts = description.split(' ').length

      return wordCounts >= 1 && wordCounts <= 1000
    },
    {
      message: '商品描述最少一個字最多1000字'
    }
  )
})

const MAX_UPLOAD_SIZE = 1024 * 1024

const ACCEPTED_FILE_TYPE_LIST = ['image/']

const validateImageFile = () =>
  z
    .instanceof(File)
    .refine((file) => !file || file.size <= MAX_UPLOAD_SIZE, `圖檔必須小於 1MB`)
    .refine(
      (file) =>
        !file ||
        ACCEPTED_FILE_TYPE_LIST.some((type) => file.type.startsWith(type)),
      '必須是圖片檔'
    )

export const IMAGE_SCHEMA = z.object({
  image: validateImageFile()
})

export const REVIEW_SCHEMA = z.object({
  productId: z.string().refine((value) => value !== '', {
    message: '商品 ID 為必填'
  }),
  authorName: z.string().refine((value) => value !== '', {
    message: '使用者名稱為必填'
  }),
  authorImageUrl: z.string().refine((value) => value !== '', {
    message: '使用者圖片為必填'
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: '評價最小為1' })
    .max(5, { message: '評價最大為5' }),
  comment: z.string().max(200, { message: '最多200字' })
})
