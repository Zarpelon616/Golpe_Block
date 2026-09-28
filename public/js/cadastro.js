const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmarSenha');
const btnCadastrar = document.getElementById('btnCadastrar');

btnCadastrar.addEventListener('click', async () => {

    if (
        !email.value ||
        !senha.value ||
        !confirmarSenha.value
    ) {
        alert('Preencha todos os campos.');
        return;
    }

    if (
        senha.value !==
        confirmarSenha.value
    ) {
        alert('As senhas não coincidem.');
        return;
    }

    try {

        const resposta = await fetch(
            'http://localhost:3000/usuarios',
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

        if (!resposta.ok) {
            alert(
                dados.erro ||
                'Erro ao realizar cadastro.'
            );
            return;
        }

        alert(
            'Cadastro realizado com sucesso!'
        );

        window.location.href =
            'login.html';

    } catch (erro) {

        console.error(erro);

        alert(
            'Não foi possível conectar ao servidor.'
        );

    }

});