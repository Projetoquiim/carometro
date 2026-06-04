/* import {logar, listar} from "./firebase/ini.js";

const listagem = listar().then((lista) => {
    console.log("Dados => ", lista);
}).catch((error) => {
    console.error("Erro ao listar dados:", error);
});
 */
// Array de objetos com os dados solicitados
const contatos = [
    { nome: "Ana Silva", idade: 28, telefone: "(11) 99999-1111" },
    { nome: "Bruno Costa", idade: 34, telefone: "(21) 98888-2222" },
    { nome: "Carlos Souza", idade: 42, telefone: "(31) 97777-3333" },
    { nome: "Diana Mendes", idade: 23, telefone: "(47) 96666-4444" }
];



// Define o que aparece em cada rota
/* const rotas = {
    '/': '<h1>Página Inicial</h1><p>Bem-vindo ao meu site!</p>',
    '/contato': '<h1>Contato</h1><p>Fale conosco em contato@email.com</p>',
    '/404': '<h1>404</h1><p>Página não encontrada.</p>'
};
 */
// Função para mudar a URL e o conteúdo sem recarregar a página
/* function navegar(url) {
    window.history.pushState({}, "", url);
    processarRota();
}
 */
// Renderiza o conteúdo baseado na URL atual
/* function processarRota() {
    const caminho = window.location.pathname;
    const conteudoDiv = document.getElementById('conteudo');
    conteudoDiv.innerHTML = rotas[caminho] || rotas['/404'];
}
 */
// Escuta os botões de voltar/avançar do navegador
/* window.onpopstate = processarRota; */

// Processa a rota assim que a página carrega
/* processarRota(); */