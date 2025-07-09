import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

const NAME = 'image'

const ImageInput = () => (
  <div className="mb-2">
    <Label className="capitalize" htmlFor={NAME}>
      Image
    </Label>
    <Input accept="image/*" id={NAME} name={NAME} required type="file" />
  </div>
)

export default ImageInput
