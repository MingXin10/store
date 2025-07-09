import { Skeleton } from '../ui/Skeleton'

interface LoadingTableProps {
  rows?: number
}

const LoadingTable = ({ rows = 5 }: LoadingTableProps) => {
  const tableRows = Array.from({ length: rows }, (_, index) => (
    <div key={index} className="mb-4">
      <Skeleton className="w-full h-8 rounded" />
    </div>
  ))

  return <>{tableRows}</>
}

export default LoadingTable
