// Exporta as configurações utilizadas pelo sistema.
// Caso a variável PORT não esteja definida no arquivo .env, o servidor utilizará a porta 3000 como padrão.
module.exports = {

    PORT: process.env.PORT || 3000

};

/*
O module.exports é a forma utilizada no Node.js para disponibilizar funções
objetos ou configurações para outros arquivos do projeto.
300 é um valor padrão
*/