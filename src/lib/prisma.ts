/**
 * Prisma Client Singleton for KeyNest
 * Ensures only one instance of PrismaClient is used across hot reloads in development
 */
import { PrismaClient } from '@prisma/client';

// Attach PrismaClient to global object to prevent multiple instances in dev
const globalForPrisma = globalThis as { prisma?: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Log all queries for debugging
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
