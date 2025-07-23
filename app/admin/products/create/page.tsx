import { SubmitButton } from '@/components/form/Buttons'
import CheckboxInput from '@/components/form/CheckBoxInput'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import ImageInput from '@/components/form/ImageInput'
import PriceInput from '@/components/form/PriceInput'
import TextAreaInput from '@/components/form/TextAreaInput'
import { createProduct } from '@/utils/dbActions'

const CreateProductPage = () => (
  <section>
    <h1 className="text-2xl font-semibold mb-8">新增商品</h1>
    <div className="border p-8 rounded-md">
      <FormContainer action={createProduct}>
        <div className="grid gap-4 md:grid-cols-2 my-4">
          <FormInput label="產品名稱" name="name" type="text" />
          <FormInput label="製造商" name="company" type="text" />
          <PriceInput />
          <ImageInput />
        </div>
        <TextAreaInput label="商品描述" name="description" />
        <div className="mt-6">
          <CheckboxInput label="精選商品" name="featured" />
        </div>
        <SubmitButton className="mt-8" text="儲存" />
      </FormContainer>
    </div>
  </section>
)

export default CreateProductPage
