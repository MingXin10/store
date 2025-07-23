import { Separator } from '@/components/ui/Separator'

interface SectionTitleProps {
  text: string
}

const SectionTitle = ({ text }: SectionTitleProps) => (
  <div>
    <h2 className="text-3xl font-medium tracking-wider mb-8">{text}</h2>
    <Separator />
  </div>
)

export default SectionTitle
