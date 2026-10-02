// Importa a instância do Prisma configurada para acesso ao banco de dados.
const prisma = require('./prisma');

/*
Executa um teste simples de comunicação com o banco,
realizando uma consulta na tabela de usuários.
*/
async function testar() {

    try {

        // Busca todos os usuários cadastrados no banco.
        const usuarios =
            await prisma.usuario.findMany();

        // Exibe os registros encontrados no terminal.
        console.log('Usuários:', usuarios);

    } catch (erro) {

        // Exibe possíveis erros ocorridos durante a consulta.
        console.error('Erro:', erro);

    } finally {

        // Encerra a conexão com o banco ao final da execução.
        await prisma.$disconnect();

    }

}

// Inicia a execução do teste.
testar();

/*
Arquivo utilizado durante o desenvolvimento para verificar
se a conexão com o banco de dados e o Prisma ORM estão funcionando corretamente.

Não é utilizado pela aplicação principal.
*/