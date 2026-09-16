const { PrismaClient } = require('@prisma/client');

console.log('DATABASE_URL =', process.env.DATABASE_URL);

const prisma = new PrismaClient();

module.exports = prisma;