// Importa a conexão com o banco de dados SQLite
const db = require('../database/db');

// LISTAR TODAS AS PUBLICAÇÕES
// Responsável por consultar todas as publicações cadastradas no banco de dados.
function listarTodas(callback) {

    // Consulta SQL que retorna todas as publicações ordenadas da mais recente para a mais antiga
    const sql = `
        SELECT *
        FROM publicacoes
        ORDER BY dataCriacao DESC
    `;

    // Executa a consulta e retorna os resultados através da função callback
    db.all(sql, [], callback);

}

// CRIAR NOVA PUBLICAÇÃO
// Responsável por inserir uma nova publicação na tabela publicacoes.
function criar(titulo, conteudo, autorId, callback) {

    // Comando SQL utilizado para inserir
    // uma nova publicação no banco
    const sql = `
        INSERT INTO publicacoes
        (titulo, conteudo, autorId)
        VALUES (?, ?, ?)
    `;

    // Executa a inserção utilizando parâmetros para evitar SQL Injection
    db.run(
        sql,
        [titulo, conteudo, autorId],
        callback
    );

}

// BUSCAR PUBLICAÇÃO POR ID
// Responsável por localizar uma publicação específica utilizando seu identificador.
function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM publicacoes
        WHERE id = ?
    `;

    // Retorna apenas um registro
    // correspondente ao ID informado
    db.get(
        sql,
        [id],
        callback
    );

}

// Exporta as funções para utilização
// pelos Controllers da aplicação
module.exports = {
    listarTodas,
    criar,
    buscarPorId
};

/*
Model responsável pelas operações da entidade Publicação. 
Ele faz a comunicação direta com o banco de dados SQLite, executando consultas SQL para criar publicações, 
listar publicações e buscar publicações pelo ID.

Se encontra no model porque no padrão MVC o Model é responsável pelo acesso aos dados.
O Controller recebe a requisição, mas quem consulta ou grava no banco é o Model.

Callback é uma função passada como parâmetro que será executada quando a operação do banco terminar.
Como o acesso ao banco é assíncrono, o resultado não vem imediatamente.
*/