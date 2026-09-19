// Importa o Model responsável pelas operações relacionadas aos usuários
const Usuario = require('../models/usuario');

// CRIAR USUÁRIO
// Recebe os dados enviados pelo cliente e solicita ao Model a criação do usuário.
async function criarUsuario(req, res) {

    try {

        const { email, senhaHash } = req.body;

        // Validação dos campos obrigatórios
        if (!email || !senhaHash) {

            return res.status(400).json({
                erro: 'Email e senhaHash são obrigatórios.'
            });

        }

        const usuario = await Usuario.criar(
            email,
            senhaHash
        );

        res.status(201).json({
            mensagem: 'Usuário criado com sucesso.',
            id: usuario.id
        });

    } catch (err) {

        res.status(500).json({
            erro: err.message
        });

    }

}

// LISTAR USUÁRIOS
// Retorna todos os usuários cadastrados.
async function listarUsuarios(req, res) {

    try {

        const usuarios =
            await Usuario.listarTodos();

        res.json(usuarios);

    } catch (err) {

        res.status(500).json({
            erro: err.message
        });

    }

}

// BUSCAR USUÁRIO POR ID
// Retorna um usuário específico através do ID informado.
async function buscarUsuarioPorId(req, res) {

    try {

        const { id } = req.params;

        const usuario =
            await Usuario.buscarPorId(id);

        if (!usuario) {

            return res.status(404).json({
                erro: 'Usuário não encontrado.'
            });

        }

        res.json(usuario);

    } catch (err) {

        res.status(500).json({
            erro: err.message
        });

    }

}

async function login(req, res) {
    try {
        // Passo 1 — Receber os dados
        const { email, senhaHash } = req.body;

        // Validação dos campos obrigatórios
        if (!email || !senhaHash) {
            return res.status(400).json({
                erro: 'Email e senha obrigatórios.'
            });
        }

        // Passo 2 — Procurar o usuário
        const usuario = await Usuario.buscarPorEmail(email);

        // Passo 3 — Verificar se encontrou
        if (!usuario) {
            return res.status(401).json({
                erro: 'Email ou senha inválidos.'
            });
        }

        // Passo 4 — Comparar as senhas
        if (senhaHash !== usuario.senhaHash) {
            return res.status(401).json({
                erro: 'Email ou senha inválidos.'
            });
        }

        // Login realizado com sucesso
        res.status(200).json({
            mensagem: 'Login realizado com sucesso.',
            id: usuario.id
        });

    } catch (err) {
        res.status(500).json({
            erro: err.message
        });
    }
}


// Exportação das funções
module.exports = {
    criarUsuario,
    listarUsuarios,
    buscarUsuarioPorId,
    login
};

/*
Controller responsável por receber requisições HTTP relacionadas aos usuários.

Ele realiza validações básicas, chama o Model para acessar o banco de dados
e retorna respostas para o cliente.

Utiliza async/await porque o Prisma trabalha com operações assíncronas.
*/
