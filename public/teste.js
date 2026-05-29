import {logar, listar} from "./firebase/ini.js";

const listagem = listar().then((lista) => {
    console.log("Dados => ", lista);
}).catch((error) => {
    console.error("Erro ao listar dados:", error);
});

// Define o que aparece em cada rota
const rotas = {
    '/': '<h1>Página Inicial</h1><p>Bem-vindo ao meu site!</p>',
    /* '/contato': '<h1>Contato</h1><p>Fale conosco em contato@email.com</p>', */
    '/contato': '<h1>Contato</h1><p>'+listagem+'</p>',
    '/404': '<h1>404</h1><p>Página não encontrada.</p>'
};

// Função para mudar a URL e o conteúdo sem recarregar a página
function navegar(url) {
    window.history.pushState({}, "", url);
    processarRota();
}

// Renderiza o conteúdo baseado na URL atual
function processarRota() {
    const caminho = window.location.pathname;
    const conteudoDiv = document.getElementById('conteudo');
    conteudoDiv.innerHTML = rotas[caminho] || rotas['/404'];
}

// Escuta os botões de voltar/avançar do navegador
window.onpopstate = processarRota;

// Processa a rota assim que a página carrega
processarRota();