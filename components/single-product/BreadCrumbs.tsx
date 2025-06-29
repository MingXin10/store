import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/Breadcrumb'

interface BreadCrumbsProps {
  name: string
}

const BreadCrumbs = ({ name }: BreadCrumbsProps) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink className="capitalize text-lg" href="/">
          首頁
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink className="capitalize text-lg" href="/products">
          商品
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage className="capitalize text-lg">{name}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)

export default BreadCrumbs
