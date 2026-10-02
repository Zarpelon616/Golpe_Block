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

        // Verifica se os identificadores recebidos podem ser convertidos para números.
        if (
            !conteudo ||
            isNaN(Number(autorId)) ||
            isNaN(Number(publicacaoId))
        ) {

            return res.status(400).json({
                erro: 'Dados inválidos.'
            });

        }

        // Solicita ao Model a criação do comentário.
        const comentario =
            await Comentario.criar(
                conteudo,
                Number(autorId),
                Number(publicacaoId)
            );

        // Retorna sucesso juntamente com o ID do comentário criado.
        res.status(201).json({
            mensagem: 'Comentário criado com sucesso.',
            id: comentario.id
        });

    } catch (err) {

        // Retorna erro interno caso ocorra alguma exceção durante o processamento.
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

        // Solicita ao Model a lista de comentários da publicação.
        const comentarios =
            await Comentario.listarPorPublicacao(
                publicacaoId
            );

        // Retorna os comentários encontrados.
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

        // Solicita ao Model a exclusão do comentário.
        await Comentario.excluir(id);

        // Retorna confirmação da exclusão.
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
Controller responsável por receber requisições HTTP relacionadas
a comentários, validar os dados recebidos e encaminhar as operações
para o Model correspondente.

Funções implementadas:

criarComentario()
- Cria um novo comentário associado a uma publicação.

listarComentariosPorPublicacao()
- Retorna todos os comentários vinculados a uma publicação.

excluirComentario()
- Remove um comentário existente.

As operações utilizam async/await devido ao uso do Prisma ORM,
que trabalha com Promises para acesso ao banco de dados.
*/