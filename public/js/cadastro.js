// Obtém referências aos elementos do formulário de cadastro.
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmarSenha');
const btnCadastrar = document.getElementById('btnCadastrar');

// Aguarda o clique no botão de cadastro.
btnCadastrar.addEventListener('click', async () => {

    // Verifica se todos os campos foram preenchidos.
    if (
        !email.value ||
        !senha.value ||
        !confirmarSenha.value
    ) {
        alert('Preencha todos os campos.');
        return;
    }

    // Verifica se a senha informada coincide com a confirmação.
    if (
        senha.value !==
        confirmarSenha.value
    ) {
        alert('As senhas não coincidem.');
        return;
    }

    try {

        // Envia os dados do novo usuário para a API.
        const resposta = await fetch(
            '/usuarios',
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

        // Verifica se a API retornou algum erro.
        if (!resposta.ok) {
            alert(
                dados.erro ||
                'Erro ao realizar cadastro.'
            );
            return;
        }

        // Informa o sucesso da operação ao usuário.
        alert(
            'Cadastro realizado com sucesso!'
        );

        // Redireciona para a tela de login.
        window.location.href =
            'login.html';

    } catch (erro) {

        console.error(erro);

        // Exibido quando a comunicação com o servidor falha.
        alert(
            'Não foi possível conectar ao servidor.'
        );

    }

});

/*
Responsável pelo cadastro de novos usuários.

O script realiza validações básicas no formulário,
envia os dados para a API e redireciona o usuário
para a tela de login após o cadastro bem-sucedido.
*/