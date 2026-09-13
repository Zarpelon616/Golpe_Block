// CONTROLLER DE PUBLICAÇÕES

// Importa o Model responsável pelas operações, de acesso ao banco de dados relacionadas às publicações.
const Publicacao = require('../models/publicacao');

// CRIAR PUBLICAÇÃO

// Recebe os dados enviados pelo cliente, valida as informações e solicita ao Model que grave a publicação no banco.
function criarPublicacao(req, res) {

    // Dados enviados no corpo da requisição
    const { titulo, conteudo, autorId } = req.body;

    // Validação dos campos obrigatórios
    if (!titulo || !conteudo || !autorId) {

        return res.status(400).json({
            erro: 'Título, conteúdo e autorId são obrigatórios.'
        });

    }

    // Solicita ao Model a criação da publicação
    Publicacao.criar(
        titulo,
        conteudo,
        autorId,

        function(err) {

            // Tratamento de erro durante a inserção
            if (err) {

                return res.status(500).json({
                    erro: err.message
                });

            }

            // Retorna sucesso e o ID gerado
            res.status(201).json({
                mensagem: 'Publicação criada com sucesso.',
                id: this.lastID
            });

        }
    );

}

// LISTAR TODAS AS PUBLICAÇÕES

// Busca todas as publicações cadastradas no banco de dados.
function listarPublicacoes(req, res) {

    Publicacao.listarTodas((err, rows) => {

        // Erro durante a consulta
        if (err) {

            return res.status(500).json({
                erro: err.message
            });

        }

        // Retorna os registros encontrados
        res.json(rows);

    });

}

// BUSCAR PUBLICAÇÃO POR ID

// Busca uma publicação específica utilizando o ID informado na URL.
function buscarPublicacaoPorId(req, res) {

    // Obtém o parâmetro da rota
    const { id } = req.params;

    Publicacao.buscarPorId(id, (err, row) => {

        // Erro na consulta
        if (err) {

            return res.status(500).json({
                erro: err.message
            });

        }

        // Caso não exista publicação com esse ID
        if (!row) {

            return res.status(404).json({
                erro: 'Publicação não encontrada.'
            });

        }

        // Retorna a publicação encontrada
        res.json(row);

    });

}

// EXPORTAÇÃO DAS FUNÇÕES

// Disponibiliza as funções para utilização nas rotas da aplicação.
module.exports = {
    listarPublicacoes,
    criarPublicacao,
    buscarPublicacaoPorId
};

/*
O Controller recebe as requisições do cliente, valida os dados, chama o Model quando precisa acessar o banco e devolve uma resposta para o usuário.

req.body é o corpo da requisição HTTP. Contém os dados enviados pelo cliente em formato JSON.

req.params são os parâmetros da URL.

res.status(400) retorna um código HTTP indicando erro do cliente, normalmente porque faltam dados obrigatórios.

res.status(404) indica que o recurso solicitado não foi encontrado.

res.status(500) indica erro interno do servidor ou do banco de dados.

res.status(201) indica que um novo recurso foi criado com sucesso.

this.lastID O SQLite retorna automaticamente o ID gerado no último INSERT. Esse valor pode ser acessado através de this.lastID
*/