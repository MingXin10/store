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

  const { name, company, description, featured, price, image } = product

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>
      <div className="border p-8 rounded-md">
        <ImageInputContainer
          action={updateProductImage}
          image={image}
          name={name}
          text="update image"
        >
          <input name="id" type="hidden" value={id} />
          <input name="url" type="hidden" value={image} />
        </ImageInputContainer>
        <FormContainer action={updateProduct}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input name="id" type="hidden" value={id} />
            <FormInput
              defaultValue={name}
              label="product name"
              name="name"
              type="text"
            />
            <FormInput
              defaultValue={company}
              label="company"
              name="company"
              type="text"
            />

            <PriceInput defaultValue={price} />
          </div>
          <TextAreaInput
            defaultValue={description}
            labelText="product description"
            name="description"
          />
          <div className="mt-6">
            <CheckboxInput
              defaultChecked={featured}
              label="featured"
              name="featured"
            />
          </div>
          <SubmitButton className="mt-8" text="update product" />
        </FormContainer>
      </div>
    </section>
  )
}

export default EditProductPage
