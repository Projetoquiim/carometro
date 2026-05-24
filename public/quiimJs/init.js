import {listar} from "./firebase/ini.js";
/* 
logar("projetoquim@gmail.com","@19Twostars");
 */

const listagem = listar().then((lista)=>{
    console.log("Dados => ", lista);
}).catch((error)=>{
    console.error("Erro ao listar dados:", error);
});

console.log("Entrou no init.js");