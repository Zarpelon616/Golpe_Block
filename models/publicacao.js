// Importa a conexão com o banco de dados SQLite
const db = require('../database/db');

// Model responsável por consultar todas as publicações
function listarTodas(callback) {

    // Consulta SQL que retorna todas as publicações
    // ordenadas da mais recente para a mais antiga
    const sql = `
        SELECT *
        FROM publicacoes
        ORDER BY dataCriacao DESC
    `;

    // Executa a consulta e retorna os resultados através do callback
    db.all(sql, [], callback);

}

// Model responsável por inserir uma nova publicação
function criar(titulo, conteudo, autorId, callback) {

    // Comando SQL para inserir uma nova publicação
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

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM publicacoes
        WHERE id = ?
    `;

    db.get(
        sql,
        [id],
        callback
    );

}

// Exporta as funções para utilização pelos Controllers
module.exports = {
    listarTodas,
    criar,
    buscarPorId
};
