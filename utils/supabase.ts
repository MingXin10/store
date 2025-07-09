import { createClient } from '@supabase/supabase-js'

const BUCKET_NAME = 'main-bucket'

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
)

export const uploadImage = async (image: File) => {
  const timestamp = Date.now()

  const newImageName = `${timestamp}-${image.name}`

  const { data } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(newImageName, image, {
      cacheControl: '3600'
    })

  if (!data) throw new Error('Image upload failed')

  return supabase.storage.from(BUCKET_NAME).getPublicUrl(newImageName).data
    .publicUrl
}
