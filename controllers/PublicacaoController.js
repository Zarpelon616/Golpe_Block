// CONTROLLER DE PUBLICAÇÕES

// Importa o Model responsável pelas operações relacionadas às publicações.
const Publicacao = require('../models/publicacao');

// CRIAR PUBLICAÇÃO
// Recebe os dados enviados pelo cliente, valida as informações
// e solicita ao Model que grave a publicação no banco.
async function criarPublicacao(req, res) {

    try {

        // Dados enviados no corpo da requisição
        const { titulo, conteudo, autorId } = req.body;

        // Validação dos campos obrigatórios
        if (!titulo || !conteudo || !autorId) {

            return res.status(400).json({
                erro: 'Título, conteúdo e autorId são obrigatórios.'
            });

        }

        // Cria a publicação utilizando o Prisma
        const publicacao = await Publicacao.criar(
            titulo,
            conteudo,
            autorId
        );

        // Retorna sucesso e o ID gerado
        res.status(201).json({
            mensagem: 'Publicação criada com sucesso.',
            id: publicacao.id
        });

    } catch (err) {

        res.status(500).json({
            erro: err.message
        });

    }

}

// LISTAR TODAS AS PUBLICAÇÕES
// Busca todas as publicações cadastradas no banco de dados.
async function listarPublicacoes(req, res) {

    try {

        // Solicita ao Model a lista completa de publicações.
        const publicacoes =
            await Publicacao.listarTodas();

        // Retorna os dados encontrados em formato JSON.
        res.json(publicacoes);

    } catch (err) {

        res.status(500).json({
            erro: err.message
        });

    }

}

// BUSCAR PUBLICAÇÃO POR ID
// Busca uma publicação específica utilizando o ID informado na URL.
async function buscarPublicacaoPorId(req, res) {

    try {

        // Obtém o parâmetro da rota
        const { id } = req.params;
        
        // Solicita ao Model a busca da publicação pelo ID informado
        const publicacao =
            await Publicacao.buscarPorId(id);

        // Caso não exista publicação com esse ID
        if (!publicacao) {

            return res.status(404).json({
                erro: 'Publicação não encontrada.'
            });

        }

        // Retorna a publicação encontrada
        res.json(publicacao);

    } catch (err) {

        res.status(500).json({
            erro: err.message
        });

    }

}

// EXCLUIR PUBLICAÇÃO
// Remove uma publicação a partir do ID informado.
async function excluirPublicacao(req, res) {

    try {

        const { id } = req.params;

        // Verifica se a publicação existe
        const publicacao =
            await Publicacao.buscarPorId(id);

        if (!publicacao) {

            return res.status(404).json({
                erro: 'Publicação não encontrada.'
            });

        }

        // Exclui a publicação
        await Publicacao.excluir(id);

        res.json({
            mensagem: 'Publicação excluída com sucesso.'
        });

    } catch (err) {

        res.status(500).json({
            erro: err.message
        });

    }

}

// BUSCAR PUBLICAÇÕES POR TÍTULO
/*
Realiza uma pesquisa de publicações utilizando
um termo informado pelo usuário através da query string.
*/
async function buscarPublicacoesPorTitulo(req, res) {

    try {

        const { q } = req.query;

        // Verifica se o usuário informou um termo para pesquisa.
        if (!q) {

            return res.status(400).json({
                erro: 'Informe um termo para pesquisa.'
            });

        }

        // Solicita ao Model a busca das publicações que contenham o termo informado.
        const publicacoes =
            await Publicacao.buscarPorTitulo(q);

        res.json(publicacoes);

    } catch (err) {

        res.status(500).json({
            erro: err.message
        });

    }

}

// EXPORTAÇÃO DAS FUNÇÕES

module.exports = {
    listarPublicacoes,
    criarPublicacao,
    buscarPublicacaoPorId,
    excluirPublicacao,
    buscarPublicacoesPorTitulo
};

/*
Controller responsável por receber requisições HTTP relacionadas
às publicações, validar os dados recebidos e encaminhar as operações
para o Model correspondente.

Funções implementadas:

criarPublicacao()
- Cria uma nova publicação.

listarPublicacoes()
- Retorna todas as publicações cadastradas.

buscarPublicacaoPorId()
- Busca uma publicação específica através do ID informado.

buscarPublicacoesPorTitulo()
- Pesquisa publicações pelo título utilizando um termo informado pelo usuário.

excluirPublicacao()
- Remove uma publicação existente.

As operações utilizam async/await devido ao uso do Prisma ORM,
que trabalha com Promises para acesso ao banco de dados.
*/