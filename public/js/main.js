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


// Verificar login
const usuarioId =
    localStorage.getItem('usuarioId');


//usados para verificação durante teste
//alert(usuarioId);
//alert(typeof usuarioId);

if (!usuarioId) {
    window.location.href = 'login.html';
}


// Exibir email
const email =
    localStorage.getItem('email');

emailUsuario.textContent =
    `Email: ${email || ''}`;


// Abrir/fechar menu
btnMenu.addEventListener('click', () => {

    menuLateral.hidden =
        !menuLateral.hidden;

});

// Fechar menu ao clicar fora dele
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

// Logout
btnLogout.addEventListener('click', () => {

    localStorage.clear();

    window.location.href =
        'login.html';

});


// Carregar publicações
async function carregarPublicacoes() {

    try {

        const resposta =
            await fetch(
                '/publicacoes'
            );

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


// Renderizar publicações
function renderizarPublicacoes(
    publicacoes
) {

    listaPublicacoes.innerHTML = '';

    publicacoes.forEach(
        (publicacao) => {

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


// Abrir modal
btnNovaPublicacao.addEventListener(
    'click',
    () => {

        modalNovaPublicacao.hidden =
            false;

    }
);


// Fechar modal
btnFecharModal.addEventListener(
    'click',
    () => {

        modalNovaPublicacao.hidden =
            true;

    }
);


// Criar publicação
formNovaPublicacao.addEventListener(
    'submit',
    async (evento) => {

        evento.preventDefault();

        const titulo =
            document.getElementById(
                'tituloPublicacao'
            ).value;

        const conteudo =
            document.getElementById(
                'conteudoPublicacao'
            ).value;

        if (!titulo || !conteudo) {

            alert(
                'Preencha todos os campos.'
            );

            return;
        }

        try {

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

            modalNovaPublicacao.hidden =
                true;

            formNovaPublicacao.reset();

            carregarPublicacoes();

        } catch (erro) {

            console.error(erro);

            alert(
                'Erro ao criar publicação.'
            );

        }

    }
);


// Pesquisar publicação
btnPesquisar.addEventListener(
    'click',
    async () => {

        const texto =
            campoPesquisa.value.trim();

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