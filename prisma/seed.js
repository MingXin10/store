import { PrismaClient } from '@prisma/client'

import products from './products.json' assert { type: 'json' }

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL
    }
  }
})

const createProduct = async () => {
  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }
}

createProduct()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
