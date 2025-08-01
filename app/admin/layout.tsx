import Sidebar from './Sidebar'

import { Separator } from '@/components/ui/Separator'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <h2 className="text-2xl pl-4">總覽頁</h2>
    <Separator className="mt-2" />
    <section className="grid lg:grid-cols-12 gap-12 mt-12">
      <div className="lg:col-span-2">
        <Sidebar />
      </div>
      <div className="lg:col-span-10 px-4">{children}</div>
    </section>
  </>
)

export default DashboardLayout
