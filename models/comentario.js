// Importa o Prisma responsável pelo acesso ao banco
const prisma = require('../database/prisma');

// LISTAR COMENTÁRIOS DE UMA PUBLICAÇÃO
async function listarPorPublicacao(publicacaoId) {

    return await prisma.comentario.findMany({
        where: {
            publicacaoId: Number(publicacaoId)
        },
        orderBy: {
            dataCriacao: 'asc'
        }
    });

}

// CRIAR COMENTÁRIO
async function criar(conteudo, autorId, publicacaoId) {

    return await prisma.comentario.create({
        data: {
            conteudo,
            autorId,
            publicacaoId
        }
    });

}

// EXCLUIR COMENTÁRIO
async function excluir(id) {

    return await prisma.comentario.delete({
        where: {
            id: Number(id)
        }
    });

}

// Exporta as funções para utilização pelos Controllers
module.exports = {
    listarPorPublicacao,
    criar,
    excluir
};

/*
Model responsável pelas operações da entidade Comentário.

Utiliza o Prisma ORM para acessar o banco de dados.

Funções disponíveis:

listarPorPublicacao()
- Retorna todos os comentários de uma publicação.

criar()
- Cria um novo comentário.

As funções são assíncronas e utilizam async/await.

a função de exclusão recebe um ID:

await Comentario.excluir(5);

e executa:

DELETE FROM comentarios
WHERE id = 5;

indiretamente através do Prisma.
*/