import { Prisma } from '@prisma/client'

/**
 * Generates pagination metadata based on the provided parameters.
 *
 * @param {number} [page=1] - The current page number.
 * @param {number} [pageSize=10] - The number of items per page.
 * @param {number} count -  resolves to the total number of item records.
 * @returns {Object} A promise that resolves to an object containing pagination metadata.
 */
async function generatePaginationMetadata(page = 1, pageSize = 10, count: Prisma.PrismaPromise<number>) {
  const counter = await count
  const totalPages = Math.ceil(counter / pageSize)
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  return {
    page: currentPage,
    limit: pageSize,
    totalPages,
    totalItems: counter,
    hasNextPage,
    hasPreviousPage
  }
}

export default generatePaginationMetadata
