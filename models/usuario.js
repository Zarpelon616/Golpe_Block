    // Importa o Prisma responsável pelo acesso ao banco
    const prisma = require('../database/prisma');

    // LISTAR TODOS OS USUÁRIOS
    async function listarTodos() {

        return await prisma.usuario.findMany();

    }

    // CRIAR USUÁRIO
    async function criar(email, senhaHash) {

        return await prisma.usuario.create({
            data: {
                email,
                senhaHash
            }
        });

    }

    // BUSCAR USUÁRIO POR ID
    async function buscarPorId(id) {

        return await prisma.usuario.findUnique({
            where: {
                id: Number(id)
            }
        });

    }

    module.exports = {
        listarTodos,
        criar,
        buscarPorId
    };