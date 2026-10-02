// Importa o Model responsável pelo acesso e manipulação dos dados de usuários.
const Usuario = require('../models/usuario');

// CRIAR USUÁRIO
/*
Recebe os dados enviados pelo cliente,
realiza as validações necessárias e solicita
ao Model a criação de um novo usuário.
*/
async function criarUsuario(req, res) {

    try {

        const { email, senhaHash } = req.body;

        // Validação dos campos obrigatórios
        if (!email || !senhaHash) {

            return res.status(400).json({
                erro: 'Email e senhaHash são obrigatórios.'
            });

        }

        // Solicita ao Model a criação do usuário no banco de dados.
        const usuario = await Usuario.criar(
            email,
            senhaHash
        );

        // Retorna sucesso juntamente com o ID gerado para o usuário.
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
/*
Busca e retorna todos os usuários
cadastrados no banco de dados.
*/
async function listarUsuarios(req, res) {

    try {

        // Solicita ao Model a lista completa de usuários.
        const usuarios =
            await Usuario.listarTodos();

        // Retorna os dados encontrados em formato JSON.
        res.json(usuarios);

    } catch (err) {

        res.status(500).json({
            erro: err.message
        });

    }

}

// BUSCAR USUÁRIO POR ID
/*
Busca um usuário específico utilizando
o identificador informado na URL.
*/
async function buscarUsuarioPorId(req, res) {

    try {

        // Obtém o ID informado na rota.
        const { id } = req.params;

        // Solicita ao Model a busca do usuário.
        const usuario =
            await Usuario.buscarPorId(id);

        // Caso o usuário não exista, retorna erro 404.
        if (!usuario) {

            return res.status(404).json({
                erro: 'Usuário não encontrado.'
            });

        }

        // Retorna os dados do usuário encontrado.
        res.json(usuario);

    } catch (err) {

        res.status(500).json({
            erro: err.message
        });

    }

}

// LOGIN
/*
Realiza a autenticação de um usuário a partir
do e-mail e senha informados pelo cliente.
*/
async function login(req, res) {
    try {

        // Recebe os dados enviados pelo formulário de login.
        const { email, senhaHash } = req.body;

        // Verifica se os campos obrigatórios foram preenchidos.
        if (!email || !senhaHash) {
            return res.status(400).json({
                erro: 'Email e senha obrigatórios.'
            });
        }

        // Procura no banco de dados um usuário com o e-mail informado.
        const usuario = await Usuario.buscarPorEmail(email);

        // Caso o usuário não exista, retorna erro de autenticação.
        if (!usuario) {
            return res.status(401).json({
                erro: 'Email ou senha inválidos.'
            });
        }

        // Compara a senha recebida com a senha armazenada.
        if (senhaHash !== usuario.senhaHash) {
            return res.status(401).json({
                erro: 'Email ou senha inválidos.'
            });
        }

        // Retorna sucesso juntamente com o ID do usuário autenticado.
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
Controller responsável por receber requisições HTTP relacionadas
a usuários, validar os dados recebidos e encaminhar as operações
para o Model correspondente.

Funções implementadas:

criarUsuario()
- Cria um novo usuário.

listarUsuarios()
- Retorna todos os usuários cadastrados.

buscarUsuarioPorId()
- Busca um usuário específico através do ID informado.

login()
- Realiza a autenticação do usuário utilizando e-mail e senha.

As operações utilizam async/await devido ao uso do Prisma ORM,
que trabalha com Promises para acesso ao banco de dados.
*/
