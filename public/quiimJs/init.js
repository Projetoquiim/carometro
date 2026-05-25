import { listar, logar, listaArquivos } from "./firebase/ini.js";

const usuario = document.querySelector("#email");
const senha = document.querySelector("#password");
const btnEntrar = document.querySelector("#entrar");
const btnGoogle = document.querySelector("#google");

btnEntrar.addEventListener("click", (e) => {
    logar(usuario.value, senha.value);
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
    });
});


const listagem = listar().then((lista) => {
    console.log("Dados => ", lista);
}).catch((error) => {
    console.error("Erro ao listar dados:", error);
});

const arquivos = listaArquivos().then((lista) => {
    console.log("Arquivos => ", lista);
}).catch((error) => {
    console.error("Erro ao listar arquivos:", error);
});

console.log("Entrou no init.js");