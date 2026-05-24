import {listar,logar, listaArquivos} from "./firebase/ini.js";

logar("projetoquim@gmail.com","@19Twostars");

const listagem = listar().then((lista)=>{
    console.log("Dados => ", lista);
}).catch((error)=>{
    console.error("Erro ao listar dados:", error);
});

const arquivos = listaArquivos().then((lista)=>{
    console.log("Arquivos => ", lista);
}).catch((error)=>{
    console.error("Erro ao listar arquivos:", error);
});

console.log("Entrou no init.js");