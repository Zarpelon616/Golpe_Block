// Importa a instância do Prisma responsável pela comunicação com o banco
const prisma = require('../database/prisma');

// LISTAR TODAS AS PUBLICAÇÕES
// Retorna todas as publicações cadastradas ordenadas da mais recente para a mais antiga.
async function listarTodas() {

    return await prisma.publicacao.findMany({
        orderBy: {
            dataCriacao: 'desc'
        }
    });

}

// CRIAR NOVA PUBLICAÇÃO
// Insere uma nova publicação no banco de dados.
async function criar(titulo, conteudo, autorId) {

    return await prisma.publicacao.create({
        data: {
            titulo,
            conteudo,
            autorId
        }
    });

}

// BUSCAR PUBLICAÇÃO POR ID
// Retorna uma publicação específica através do ID informado.
async function buscarPorId(id) {

    return await prisma.publicacao.findUnique({
        where: {
            id: Number(id)
        }
    });

}

// EXCLUIR PUBLICAÇÃO
// Remove uma publicação a partir do ID informado.
async function excluir(id) {

    return await prisma.publicacao.delete({
        where: {
            id: Number(id)
        }
    });

}

// Exporta as funções para utilização pelos Controllers
module.exports = {
    listarTodas,
    criar,
    buscarPorId,
    excluir
};

/*
Model responsável pelas operações da entidade Publicação.

No padrão MVC, o Model é responsável pelo acesso aos dados da aplicação.

Diferentemente da implementação anterior, que utilizava comandos SQL manuais,
esta versão utiliza o Prisma ORM para realizar consultas e alterações no banco.

Principais métodos utilizados:

findMany()
- Retorna vários registros.

findUnique()
- Retorna um único registro através de um campo único.

create()
- Cria um novo registro.

As funções são assíncronas e retornam Promises, por isso utilizam async/await.
*/

