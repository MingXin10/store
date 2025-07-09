import { z } from 'zod'

export const PRODUCT_SCHEMA = z.object({
  name: z
    .string()
    .min(5, {
      message: 'name must be at least 5 characters.'
    })
    .max(100, {
      message: 'name must be less than 100 characters.'
    }),
  company: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: 'price must be a positive number.'
  }),
  description: z.string().refine(
    (description) => {
      const wordCounts = description.split(' ').length

      return wordCounts >= 10 && wordCounts <= 1000
    },
    {
      message: 'description must be between 10 and 1000 words.'
    }
  )
})

const MAX_UPLOAD_SIZE = 1024 * 1024

const ACCEPTED_FILE_TYPE_LIST = ['image/']

const validateImageFile = () =>
  z
    .instanceof(File)
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE,
      `File size must be less than 1 MB`
    )
    .refine(
      (file) =>
        !file ||
        ACCEPTED_FILE_TYPE_LIST.some((type) => file.type.startsWith(type)),
      'File must be an image'
    )

export const IMAGE_SCHEMA = z.object({
  image: validateImageFile()
})
