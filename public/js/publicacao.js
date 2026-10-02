// Referências aos elementos da interface utilizados na página.
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


// Recupera o usuário autenticado armazenado no navegador.
const usuarioId =
    localStorage.getItem('usuarioId');

// Recupera o usuário autenticado armazenado no navegador.
if (!usuarioId) {
    window.location.href =
        'login.html';
}

// Exibe o e-mail do usuário no menu lateral.
const email =
    localStorage.getItem('email');

emailUsuario.textContent =
    `Email: ${email || ''}`;


/*
Controle de abertura e fechamento do menu lateral.
*/
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


/*
Carregamento dos dados da publicação selecionada.
*/
// Obtém o ID da publicação armazenado na página anterior.
const publicacaoId =
    localStorage.getItem(
        'publicacaoId'
    );

// Caso nenhuma publicação tenha sido selecionada, retorna à página principal.
if (!publicacaoId) {

    window.location.href =
        'index.html';

}

/*
Busca os dados da publicação na API
e atualiza os elementos da página.
*/

async function carregarPublicacao() {

    try {

        const resposta =
            await fetch(
                `/publicacoes/${publicacaoId}`
            );

        const publicacao =
            await resposta.json();

        alert(JSON.stringify(publicacao));

        tituloPublicacao.textContent =
            publicacao.titulo;

        conteudoPublicacao.textContent =
            publicacao.conteudo;

        dataPublicacao.textContent =
            `Publicado em: ${publicacao.dataCriacao}`;

    } catch (erro) {

        alert(erro);

    }

}

/*
async function carregarPublicacao() {

    try {

        // Solicita os dados da publicação ao servidor.
        const resposta =
            await fetch(
                `/publicacoes/${publicacaoId}`
            );

        const publicacao =
            await resposta.json();

        // Atualiza as informações exibidas na tela.
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
*/

/*
Carregamento e exibição dos comentários da publicação.
Busca todos os comentários associados à publicação atual.
*/
async function carregarComentarios() {

    try {

        const resposta =
            await fetch(
                `/comentarios/publicacao/${publicacaoId}`
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

    /*
    Renderiza dinamicamente os comentários recebidos da API.
    */
   // Remove comentários já exibidos antes de renderizar novamente.
    listaComentarios.innerHTML = '';

    comentarios.forEach(
        (comentario) => {

            // Cria um container para representar o comentário.
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

            // Exibe ou oculta o menu de ações do comentário.
            btnMenuComentario.addEventListener(
                'click',
                () => {

                    menuComentario.hidden =
                        !menuComentario.hidden;

                }
            );

            // Solicita a exclusão do comentário selecionado.
            btnExcluir.addEventListener(
                'click',
                async () => {

                    try {

                        const resposta =
                            await fetch(
                                `/comentarios/${comentario.id}`,
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

                        // Atualiza a lista após a exclusão.
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


/*
Processa o envio de novos comentários.
*/
Comentario.addEventListener(
    'submit',
    async (evento) => {

        // Impede o recarregamento padrão da página.
        evento.preventDefault();

        // Obtém e remove espaços extras do comentário digitado.
        const conteudo =
            campoComentario.value.trim();

        if (!conteudo) {

            alert(
                'Digite um comentário.'
            );

            return;
        }

        try {

            // Envia o comentário para a API.
            const resposta =
                await fetch(
                    '/comentarios',
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

            // Limpa o campo após o envio.
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

/*
Permite remover a publicação atualmente aberta.
*/
btnExcluirPublicacao.addEventListener(
    'click',
    async () => {

        // Solicita confirmação antes da exclusão.
        const confirmar = confirm(
            'Deseja realmente excluir esta publicação?'
        );

        if (!confirmar) {
            return;
        }

        try {

            const resposta =
                await fetch(
                    `/publicacoes/${publicacaoId}`,
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

            // Remove o ID armazenado da publicação excluída.
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

/*
Controle do modal utilizado para criar novas publicações.
*/
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

/*
Processa o cadastro de uma nova publicação.
*/
formNovaPublicacao.addEventListener(
    'submit',
    async (evento) => {

        evento.preventDefault();

        // Obtém os dados preenchidos pelo usuário.
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

            // Envia os dados da nova publicação para a API.
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

            if (!resposta.ok) {

                alert(
                    'Erro ao criar publicação.'
                );

                return;
            }

            modalNovaPublicacao.hidden =
                true;

            // Limpa o formulário após a criação.
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

/*
Arquivo responsável pela página de detalhes de uma publicação.

Funcionalidades implementadas:

- Verificação de autenticação.
- Exibição da publicação selecionada.
- Listagem de comentários.
- Criação de comentários.
- Exclusão de comentários.
- Exclusão de publicações.
- Abertura e fechamento do menu lateral.
- Logout.
- Criação de novas publicações pelo modal.

A comunicação com o servidor é realizada através da API
utilizando requisições fetch().
*/