// Importa o Model responsável pelas operações relacionadas às publicações
const Publicacao = require('../models/publicacao');

// Controller responsável por criar uma nova publicação
function criarPublicacao(req, res) {

    // Obtém os dados enviados no corpo da requisição
    const { titulo, conteudo, autorId } = req.body;

    // Valida se todos os campos obrigatórios foram informados
    if (!titulo || !conteudo || !autorId) {

        return res.status(400).json({
            erro: 'Título, conteúdo e autorId são obrigatórios.'
        });

    }

    // Solicita ao Model que grave a publicação no banco de dados
    Publicacao.criar(
        titulo,
        conteudo,
        autorId,

        function(err) {

            // Retorna erro caso a inserção falhe
            if (err) {

                return res.status(500).json({
                    erro: err.message
                });

            }

            // Retorna sucesso juntamente com o ID gerado para a publicação
            res.status(201).json({
                mensagem: 'Publicação criada com sucesso.',
                id: this.lastID
            });

        }
    );

}

// Controller responsável por listar todas as publicações cadastradas
function listarPublicacoes(req, res) {

    // Solicita ao Model a consulta das publicações
    Publicacao.listarTodas((err, rows) => {

        // Retorna erro caso a consulta falhe
        if (err) {

            return res.status(500).json({
                erro: err.message
            });

        }

        // Retorna os registros encontrados em formato JSON
        res.json(rows);

    });

}

function buscarPublicacaoPorId(req, res) {

    const { id } = req.params;

    Publicacao.buscarPorId(id, (err, row) => {

        if (err) {

            return res.status(500).json({
                erro: err.message
            });

        }

        if (!row) {

            return res.status(404).json({
                erro: 'Publicação não encontrada.'
            });

        }

        res.json(row);

    });

}

// Exporta as funções para que possam ser utilizadas pelas rotas
module.exports = {
    listarPublicacoes,
    criarPublicacao,
    buscarPublicacaoPorId
};