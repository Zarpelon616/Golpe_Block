// CONTROLLER DE COMENTÁRIOS

// Importa o Model responsável pelas operações relacionadas aos comentários.
const Comentario = require('../models/comentario');

// CRIAR COMENTÁRIO
// Recebe os dados enviados pelo cliente, valida as informações
// e solicita ao Model que grave o comentário no banco.
async function criarComentario(req, res) {

    try {

        const {
            conteudo,
            autorId,
            publicacaoId
        } = req.body;

        // Validação dos campos obrigatórios
        if (!conteudo || !autorId || !publicacaoId) {

            return res.status(400).json({
                erro: 'Conteúdo, autorId e publicacaoId são obrigatórios.'
            });

        }

        const comentario =
            await Comentario.criar(
                conteudo,
                autorId,
                publicacaoId
            );

        res.status(201).json({
            mensagem: 'Comentário criado com sucesso.',
            id: comentario.id
        });

    } catch (err) {

        res.status(500).json({
            erro: err.message
        });

    }

}

// LISTAR COMENTÁRIOS DE UMA PUBLICAÇÃO
// Retorna todos os comentários associados a uma publicação.
async function listarComentariosPorPublicacao(req, res) {

    try {

        const { publicacaoId } = req.params;

        const comentarios =
            await Comentario.listarPorPublicacao(
                publicacaoId
            );

        res.json(comentarios);

    } catch (err) {

        res.status(500).json({
            erro: err.message
        });

    }

}

// EXCLUIR COMENTÁRIO
// Remove um comentário a partir do ID informado.
async function excluirComentario(req, res) {

    try {

        const { id } = req.params;

        await Comentario.excluir(id);

        res.json({
            mensagem: 'Comentário excluído com sucesso.'
        });

    } catch (err) {

        res.status(500).json({
            erro: err.message
        });

    }

}

// EXPORTAÇÃO DAS FUNÇÕES

module.exports = {
    criarComentario,
    listarComentariosPorPublicacao,
    excluirComentario
};

/*
Controller responsável por receber requisições HTTP,
validar os dados recebidos e retornar respostas ao cliente.

Funções implementadas:

criarComentario()
- Cria um novo comentário.

listarComentariosPorPublicacao()
- Lista todos os comentários de uma publicação.

Como o Prisma utiliza Promises,
as funções utilizam async/await.
*/