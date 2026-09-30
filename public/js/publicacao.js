const btnMenu = document.getElementById('btnMenu');
const menuLateral = document.getElementById('menuLateral');

const emailUsuario =
    document.getElementById('emailUsuario');

const btnLogout =
    document.getElementById('btnLogout');

const tituloPublicacao =
    document.getElementById('tituloPublicacao');

const conteudoPublicacao =
    document.getElementById('conteudoPublicacao');

const dataPublicacao =
    document.getElementById('dataPublicacao');

const listaComentarios =
    document.getElementById('listaComentarios');

const formComentario =
    document.getElementById('formComentario');

const campoComentario =
    document.getElementById('campoComentario');

const btnNovaPublicacao =
    document.getElementById('btnNovaPublicacao');

const modalNovaPublicacao =
    document.getElementById('modalNovaPublicacao');

const btnFecharModal =
    document.getElementById('btnFecharModal');

const formNovaPublicacao =
    document.getElementById('formNovaPublicacao');

const btnExcluirPublicacao =
    document.getElementById( 'btnExcluirPublicacao' );


// Verificar login
const usuarioId =
    localStorage.getItem('usuarioId');

if (!usuarioId) {
    window.location.href =
        'login.html';
}


// Exibir email
const email =
    localStorage.getItem('email');

emailUsuario.textContent =
    `Email: ${email || ''}`;


//
// Menu lateral
//
btnMenu.addEventListener(
    'click',
    () => {

        menuLateral.hidden =
            !menuLateral.hidden;

    }
);

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

//
// Logout
//
btnLogout.addEventListener(
    'click',
    () => {

        localStorage.clear();

        window.location.href =
            'login.html';

    }
);


//
// Publicação
//
const publicacaoId =
    localStorage.getItem(
        'publicacaoId'
    );

if (!publicacaoId) {

    window.location.href =
        'index.html';

}


async function carregarPublicacao() {

    try {

        const resposta =
            await fetch(
                `http://localhost:3000/publicacoes/${publicacaoId}`
            );

        const publicacao =
            await resposta.json();

        tituloPublicacao.textContent =
            publicacao.titulo;

        conteudoPublicacao.textContent =
            publicacao.conteudo;

        dataPublicacao.textContent =
            `Publicado em: ${publicacao.dataCriacao}`;

    } catch (erro) {

        console.error(erro);

        alert(
            'Erro ao carregar publicação.'
        );

    }

}


//
// Comentários
//
async function carregarComentarios() {

    try {

        const resposta =
            await fetch(
                `http://localhost:3000/comentarios/publicacao/${publicacaoId}`
            );

        const comentarios =
            await resposta.json();

        renderizarComentarios(
            comentarios
        );

    } catch (erro) {

        console.error(erro);

        alert(
            'Erro ao carregar comentários.'
        );

    }

}


function renderizarComentarios(
    comentarios
) {

    listaComentarios.innerHTML = '';

    comentarios.forEach(
        (comentario) => {

            const div =
                document.createElement('div');

            div.classList.add(
                'comentario'
            );

            div.innerHTML = `
                <p>${comentario.conteudo}</p>

                <button class="btnMenuComentario">
                    ⋮
                </button>

                <div
                    class="menuComentario"
                    hidden
                >
                    <button
                        class="btnExcluirComentario"
                    >
                        Excluir
                    </button>
                </div>
            `;

            const btnMenuComentario =
                div.querySelector(
                    '.btnMenuComentario'
                );

            const menuComentario =
                div.querySelector(
                    '.menuComentario'
                );

            const btnExcluir =
                div.querySelector(
                    '.btnExcluirComentario'
                );

            btnMenuComentario.addEventListener(
                'click',
                () => {

                    menuComentario.hidden =
                        !menuComentario.hidden;

                }
            );

            btnExcluir.addEventListener(
                'click',
                async () => {

                    try {

                        const resposta =
                            await fetch(
                                `http://localhost:3000/comentarios/${comentario.id}`,
                                {
                                    method:
                                        'DELETE'
                                }
                            );

                        if (
                            !resposta.ok
                        ) {

                            alert(
                                'Erro ao excluir comentário.'
                            );

                            return;
                        }

                        carregarComentarios();

                    } catch (erro) {

                        console.error(
                            erro
                        );

                    }

                }
            );

            listaComentarios.appendChild(
                div
            );

        }
    );

}


//
// Criar comentário
//
formComentario.addEventListener(
    'submit',
    async (evento) => {

        evento.preventDefault();

        const conteudo =
            campoComentario.value.trim();

        if (!conteudo) {

            alert(
                'Digite um comentário.'
            );

            return;
        }

        try {

            const resposta =
                await fetch(
                    'http://localhost:3000/comentarios',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type':
                                'application/json'
                        },
                        body: JSON.stringify({
                            conteudo,
                            autorId: usuarioId,
                            publicacaoId
                        })
                    }
                );

                const dados = await resposta.json();

                if (!resposta.ok) {

                    alert(
                        dados.mensagem ||
                        dados.erro ||
                        'Erro ao criar comentário.'
                    );

                    return;
                }

            campoComentario.value =
                '';

            carregarComentarios();

        } catch (erro) {

            console.error(erro);

            alert(
                'Erro ao criar comentário.'
            );

        }

    }
);

//
// Excluir publicação
//
btnExcluirPublicacao.addEventListener(
    'click',
    async () => {

        const confirmar = confirm(
            'Deseja realmente excluir esta publicação?'
        );

        if (!confirmar) {
            return;
        }

        try {

            const resposta =
                await fetch(
                    `http://localhost:3000/publicacoes/${publicacaoId}`,
                    {
                        method: 'DELETE'
                    }
                );

            const dados =
                await resposta.json();

            if (!resposta.ok) {

                alert(
                    dados.erro ||
                    'Erro ao excluir publicação.'
                );

                return;
            }

            alert(
                'Publicação excluída com sucesso.'
            );

            localStorage.removeItem(
                'publicacaoId'
            );

            window.location.href =
                'index.html';

        } catch (erro) {

            console.error(erro);

            alert(
                'Erro ao excluir publicação.'
            );

        }

    }
);

//
// Modal Nova Publicação
//
btnNovaPublicacao.addEventListener(
    'click',
    () => {

        modalNovaPublicacao.hidden =
            false;

    }
);

btnFecharModal.addEventListener(
    'click',
    () => {

        modalNovaPublicacao.hidden =
            true;

    }
);


//
// Criar publicação
//
formNovaPublicacao.addEventListener(
    'submit',
    async (evento) => {

        evento.preventDefault();

        const titulo =
            document.getElementById(
                'tituloNovaPublicacao'
            ).value;

        const conteudo =
            document.getElementById(
                'conteudoNovaPublicacao'
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
                    'http://localhost:3000/publicacoes',
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

            if (!resposta.ok) {

                alert(
                    'Erro ao criar publicação.'
                );

                return;
            }

            modalNovaPublicacao.hidden =
                true;

            formNovaPublicacao.reset();

            alert(
                'Publicação criada com sucesso.'
            );

        } catch (erro) {

            console.error(erro);

            alert(
                'Erro ao criar publicação.'
            );

        }

    }
);


// Inicialização
carregarPublicacao();
carregarComentarios();