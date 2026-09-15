// testePrisma.js

const prisma = require('./database/prisma');

async function testar() {
    const publicacoes = await prisma.publicacao.findMany();
    console.log(publicacoes);
}

testar()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });