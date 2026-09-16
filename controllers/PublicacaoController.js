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

        const publicacoes =
            await Publicacao.listarTodas();

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

// EXPORTAÇÃO DAS FUNÇÕES

module.exports = {
    listarPublicacoes,
    criarPublicacao,
    buscarPublicacaoPorId
};

/*
Controller responsável por receber requisições HTTP,
validar os dados recebidos e retornar respostas ao cliente.

Nesta versão o acesso ao banco é realizado através
do Prisma ORM.

Como o Prisma trabalha com Promises,
as funções utilizam async/await.

try/catch:
- try executa o código principal.
- catch captura erros e impede que o servidor seja encerrado.

await:
- Aguarda a conclusão de operações assíncronas.
- Facilita a leitura em comparação ao uso de callbacks.
*/