import { Separator } from '@/components/ui/Separator1'

interface SectionTitleProps {
  text: string
}

const SectionTitle = ({ text }: SectionTitleProps) => (
  <div>
    <h2 className="text-3xl font-medium tracking-wider capitalize mb-8">
      {text}
    </h2>
    <Separator />
  </div>
)

export default SectionTitle
