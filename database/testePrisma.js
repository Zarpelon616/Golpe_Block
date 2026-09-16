const prisma = require('./prisma');

async function testar() {

    try {

        const usuarios =
            await prisma.usuario.findMany();

        console.log('Usuários:', usuarios);

    } catch (erro) {

        console.error('Erro:', erro);

    } finally {

        await prisma.$disconnect();

    }

}

testar();