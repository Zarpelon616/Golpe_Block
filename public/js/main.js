// Referências aos principais elementos da interface.
const btnMenu = document.getElementById('btnMenu');
const menuLateral = document.getElementById('menuLateral');

const emailUsuario = document.getElementById('emailUsuario');

const btnLogout = document.getElementById('btnLogout');

const listaPublicacoes =
    document.getElementById('listaPublicacoes');

const btnNovaPublicacao =
    document.getElementById('btnNovaPublicacao');

const modalNovaPublicacao =
    document.getElementById('modalNovaPublicacao');

const btnFecharModal =
    document.getElementById('btnFecharModal');

const formNovaPublicacao =
    document.getElementById('formNovaPublicacao');

const campoPesquisa =
    document.getElementById('campoPesquisa');

const btnPesquisar =
    document.getElementById('btnPesquisar');


// Recupera o identificador do usuário armazenado após o login.
const usuarioId =
    localStorage.getItem('usuarioId');


//usados para verificação durante teste
//alert(usuarioId);
//alert(typeof usuarioId);

// Impede o acesso à página caso o usuário não esteja autenticado.
if (!usuarioId) {
    window.location.href = 'login.html';
}


// Exibe o e-mail do usuário autenticado no menu lateral.
const email =
    localStorage.getItem('email');

emailUsuario.textContent =
    `Email: ${email || ''}`;


// Alterna a visibilidade do menu lateral.
btnMenu.addEventListener('click', () => {

    menuLateral.hidden =
        !menuLateral.hidden;

});

// Fecha automaticamente o menu quando o usuário clica fora dele.
document.addEventListener(
    'click',
    (evento) => {

        const clicouNoMenu =
            menuLateral.contains(
                evento.target
            );

        const clicouNoBotaoMenu =
            btnMenu.contains(
                evento.target
            );

        if (
            !menuLateral.hidden &&
            !clicouNoMenu &&
            !clicouNoBotaoMenu
        ) {

            menuLateral.hidden = true;

        }

    }
);

// Remove os dados armazenados localmente e retorna para a tela de login(logout).
btnLogout.addEventListener('click', () => {

    localStorage.clear();

    window.location.href =
        'login.html';

});


/*
Solicita à API a lista de publicações cadastradas
e envia os dados para renderização na interface.
*/
async function carregarPublicacoes() {

    try {

        // Obtém todas as publicações cadastradas.
        const resposta =
            await fetch(
                '/publicacoes'
            );

        // Converte a resposta recebida para JSON.
        const publicacoes =
            await resposta.json();

        renderizarPublicacoes(
            publicacoes
        );

    } catch (erro) {

        console.error(erro);

        alert(
            'Erro ao carregar publicações.'
        );

    }

}


/*
Exibe dinamicamente as publicações retornadas pela API.
*/
function renderizarPublicacoes(
    publicacoes
) {

    // Limpa a lista atual antes de renderizar novamente.
    listaPublicacoes.innerHTML = '';

    publicacoes.forEach(
        (publicacao) => {

            // Cria um container para representar a publicação na interface.
            const div =
                document.createElement('div');

            div.classList.add(
                'publicacao'
            );

            div.innerHTML = `
                <h2>${publicacao.titulo}</h2>
                <p>${publicacao.conteudo}</p>
                <button class="btnVerPublicacao">
                    Ver publicação
                </button>
            `;

            const btnVer =
                div.querySelector(
                    '.btnVerPublicacao'
                );

            btnVer.addEventListener(
                'click',
                () => {

                    // Armazena o ID da publicação para consulta na página de detalhes.
                    localStorage.setItem(
                        'publicacaoId',
                        publicacao.id
                    );

                    window.location.href =
                        'publicacao.html';

                }
            );

            listaPublicacoes.appendChild(
                div
            );

        }
    );

}


// Exibe o formulário de criação de publicação.
btnNovaPublicacao.addEventListener(
    'click',
    () => {

        modalNovaPublicacao.hidden =
            false;

    }
);


// Oculta o formulário de criação de publicação.
btnFecharModal.addEventListener(
    'click',
    () => {

        modalNovaPublicacao.hidden =
            true;

    }
);

/*
Processa o envio do formulário de nova publicação.
*/
formNovaPublicacao.addEventListener(
    'submit',
    async (evento) => {

        // Impede o recarregamento padrão da página.
        evento.preventDefault();

        const titulo =
            document.getElementById(
                'tituloPublicacao'
            ).value;

        const conteudo =
            document.getElementById(
                'conteudoPublicacao'
            ).value;

        // Verifica se todos os campos obrigatórios foram preenchidos.
        if (!titulo || !conteudo) {

            alert(
                'Preencha todos os campos.'
            );

            return;
        }

        try {

            // Envia os dados da publicação para a API.
            const resposta =
                await fetch(
                    '/publicacoes',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type':
                                'application/json'
                        },
                        body: JSON.stringify({
                            titulo,
                            conteudo,
                            autorId: Number(usuarioId)
                        })
                    }
                );

            const dados =
                await resposta.json();

            if (!resposta.ok) {

                alert(
                    dados.erro ||
                    'Erro ao criar publicação.'
                );

                return;
            }

            // Fecha o modal após o cadastro bem-sucedido.
            modalNovaPublicacao.hidden =
                true;

            // Limpa os campos do formulário.
            formNovaPublicacao.reset();

            // Atualiza a listagem exibida na tela.
            carregarPublicacoes();

        } catch (erro) {

            console.error(erro);

            alert(
                'Erro ao criar publicação.'
            );

        }

    }
);


// Realiza a pesquisa de publicações pelo título.
btnPesquisar.addEventListener(
    'click',
    async () => {

        // Obtém o texto digitado pelo usuário.
        const texto =
            campoPesquisa.value.trim();

        // Caso o campo esteja vazio, exibe novamente todas as publicações.
        if (!texto) {
            carregarPublicacoes();
            return;
        }

        try {

            const resposta =
                await fetch(
                    `/publicacoes/busca?q=${encodeURIComponent(texto)}`
                );

            const publicacoes =
                await resposta.json();

            // Atualiza a interface com os resultados encontrados.
            renderizarPublicacoes(
                publicacoes
            );

        } catch (erro) {

            console.error(erro);

            alert(
                'Erro na pesquisa.'
            );

        }

    }
);


// Inicialização
carregarPublicacoes();

/*
Arquivo responsável pela página principal da aplicação.

Funcionalidades implementadas:

- Verificação de autenticação.
- Exibição do usuário logado.
- Abertura e fechamento do menu lateral.
- Logout.
- Listagem de publicações.
- Pesquisa por título.
- Criação de publicações.
- Navegação para a página de detalhes da publicação.

A comunicação com o servidor é realizada por meio da API
utilizando a função fetch().
*/