const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient({
    log: ['query'], // Optionally enable query logging
});

module.exports = prisma;