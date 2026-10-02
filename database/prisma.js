// Importa a classe PrismaClient responsável pela comunicação com o banco de dados.
const { PrismaClient } = require('@prisma/client');

//Trecho usado durante o desenvolvimento
//console.log('DATABASE_URL =', process.env.DATABASE_URL);

// Cria uma única instância do Prisma Client para ser reutilizada
// em toda a aplicação durante as operações de banco de dados.
const prisma = new PrismaClient();

// Disponibiliza a instância para utilização nos Models.
module.exports = prisma;

/*
Este arquivo centraliza a configuração do Prisma ORM.

O Prisma Client é utilizado pelos Models para executar operações
como criação, consulta e exclusão de registros no banco de dados.

Centralizar a instância evita múltiplas conexões desnecessárias
e facilita a manutenção da aplicação.
*/