import db from '@/utils/db'

export const fetchAllProducts = ({ search = '' }: { search: string }) =>
  db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } }
      ]
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
