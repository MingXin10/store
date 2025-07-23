import { SubmitButton } from '@/components/form/Buttons'
import CheckboxInput from '@/components/form/CheckBoxInput'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import ImageInputContainer from '@/components/form/ImageInputContainer'
import PriceInput from '@/components/form/PriceInput'
import TextAreaInput from '@/components/form/TextAreaInput'
import {
  fetchAdminProductDetails,
  updateProduct,
  updateProductImage
} from '@/utils/dbActions'

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

const EditProductPage = async ({ params }: EditProductPageProps) => {
  const { id } = await params

  const product = await fetchAdminProductDetails(id)

  const { name, company, description, featured, price, imageUrl } = product

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8">更新商品</h1>
      <div className="border p-8 rounded-md">
        <ImageInputContainer
          action={updateProductImage}
          imageUrl={imageUrl}
          name={name}
          text="上傳圖片"
        >
          <input name="id" type="hidden" value={id} />
          <input name="url" type="hidden" value={imageUrl} />
        </ImageInputContainer>
        <FormContainer action={updateProduct}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input name="id" type="hidden" value={id} />
            <FormInput
              defaultValue={name}
              label="商品名稱"
              name="name"
              type="text"
            />
            <FormInput
              defaultValue={company}
              label="製造商"
              name="company"
              type="text"
            />
            <PriceInput defaultValue={price} />
          </div>
          <TextAreaInput
            defaultValue={description}
            label="商品描述"
            name="description"
          />
          <div className="mt-6">
            <CheckboxInput
              checked={featured}
              label="精選商品"
              name="featured"
            />
          </div>
          <SubmitButton className="mt-8" text="儲存" />
        </FormContainer>
      </div>
    </section>
  )
}

export default EditProductPage
