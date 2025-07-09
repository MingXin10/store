import { faker } from '@faker-js/faker'

import { SubmitButton } from '@/components/form/Buttons'
import CheckboxInput from '@/components/form/CheckBoxInput'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import ImageInput from '@/components/form/ImageInput'
import PriceInput from '@/components/form/PriceInput'
import TextAreaInput from '@/components/form/TextAreaInput'
import { createProduct } from '@/utils/dbActions'

const CreateProductPage = () => {
  const name = faker.commerce.productName()

  const company = faker.company.name()

  const description = faker.lorem.paragraph({ min: 10, max: 12 })

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProduct}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
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
            <PriceInput />
            <ImageInput />
          </div>
          <TextAreaInput
            defaultValue={description}
            labelText="product description"
            name="description"
          />
          <div className="mt-6">
            <CheckboxInput label="featured" name="featured" />
          </div>
          <SubmitButton className="mt-8" text="Create Product" />
        </FormContainer>
      </div>
    </section>
  )
}

export default CreateProductPage
