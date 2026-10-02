// Obtém referências aos elementos do formulário de login.
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const btnLogin = document.getElementById('btnLogin');

// Aguarda o clique no botão de login.
btnLogin.addEventListener('click', async () => {

    // Verifica se todos os campos obrigatórios foram preenchidos.
    if (!email.value || !senha.value) {
        alert('Preencha todos os campos.');
        return;
    }

    try {

        // Envia os dados de autenticação para a API.
        const resposta = await fetch(
            '/usuarios/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    senhaHash: senha.value
                })
            }
        );

        const dados = await resposta.json();

        // Verifica se ocorreu algum erro durante a autenticação.
        if (!resposta.ok) {
            alert(
                dados.erro ||
                'Erro ao realizar login.'
            );
            return;
        }

        // Armazena os dados do usuário autenticado no navegador.
        localStorage.setItem(
            'usuarioId',
            dados.id
        );

        localStorage.setItem(
            'email',
            email.value
        );

        // Informa o sucesso da autenticação.
        alert('Login realizado com sucesso!');
        
        // Redireciona o usuário para a página principal.
        window.location.href = 'index.html';

    } catch (erro) {
        console.error(erro);

        // Exibido quando não é possível estabelecer comunicação com a API.
        alert(
            'Não foi possível conectar ao servidor.'
        );
    }

});

/*
Responsável pelo processo de autenticação dos usuários.

O script valida os campos do formulário, envia os dados
para a API, armazena as informações do usuário autenticado
no localStorage e redireciona para a página principal.
*/