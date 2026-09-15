// Importa o cliente Prisma responsável pelo acesso ao banco
const prisma = require('../database/prisma');

// LISTAR TODAS AS PUBLICAÇÕES
// Retorna todas as publicações ordenadas da mais recente para a mais antiga.
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
// Retorna uma publicação específica através do ID.
async function buscarPorId(id) {

    return await prisma.publicacao.findUnique({
        where: {
            id: Number(id)
        }
    });

}

// Exporta as funções para utilização pelos Controllers
module.exports = {
    listarTodas,
    criar,
    buscarPorId
};

/*
Model responsável pelas operações da entidade Publicação.

Diferente da versão anterior, este Model utiliza o Prisma ORM
para acessar o banco de dados.

O Prisma permite trabalhar com objetos JavaScript em vez de
escrever comandos SQL manualmente.

Funções utilizadas:

findMany()
- Retorna vários registros.

findUnique()
- Retorna um único registro através de um campo único.

create()
- Cria um novo registro.

As funções são assíncronas e retornam Promises,
por isso utilizam async/await.
*/