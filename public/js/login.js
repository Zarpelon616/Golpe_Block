const email = document.getElementById('email');
const senha = document.getElementById('senha');
const btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', async () => {

    if (!email.value || !senha.value) {
        alert('Preencha todos os campos.');
        return;
    }

    try {

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

        if (!resposta.ok) {
            alert(
                dados.erro ||
                'Erro ao realizar login.'
            );
            return;
        }

        localStorage.setItem(
            'usuarioId',
            dados.id
        );

        localStorage.setItem(
            'email',
            email.value
        );

        alert('Login realizado com sucesso!');
        
        window.location.href = 'index.html';

    } catch (erro) {
        console.error(erro);

        alert(
            'Não foi possível conectar ao servidor.'
        );
    }

});