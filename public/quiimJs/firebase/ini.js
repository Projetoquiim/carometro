//------------------------------- GERAL ----------------------------------------
//import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-SERVICE.js";
//------------------------------- GERAL ----------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { collection, getDocs, getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getStorage, ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js";
//import { } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";
//import { } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-functions.js";

const firebaseConfig = {
    apiKey: "AIzaSyBuUNUufC0aGs4VFZEiHvAXvpIpsvy5Dek",
    authDomain: "projetoquiim.firebaseapp.com",
    projectId: "projetoquiim",
    storageBucket: "projetoquiim.appspot.com",
    messagingSenderId: "541088523428",
    appId: "1:541088523428:web:41811dfd1e88b78d7cb231"
};

const quiimAdm = initializeApp(firebaseConfig);
const quiimDB = getFirestore(quiimAdm);
const quiimAuth = getAuth(quiimAdm);
const quiimStorage = getStorage(quiimAdm);

export async function logar(usuario, senha) {
    await signInWithEmailAndPassword(quiimAuth, usuario, senha)
        .then((credencial) => {
            // Usuário logado com sucesso
            const user = credencial.user;
            console.log("Logado com sucesso:", user.email);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Usuário logado: " + usuario,
                showConfirmButton: false,
                timer: 2500
            });
        })
        .catch((error) => {
            const codigoerro = error.code;
            const mensagemErro = error.message;
            console.error("Erro ao logar: "+mensagemErro);
            Swal.fire({
                icon: "error",
                title: "Erro ao logar ❌ "+mensagemErro,
                text: "Algo deu errado. Verifique as credenciais e tente novamente."
            });
        });
}
/* 
export function sairFirebase(){
    quiimLog.signOut().then(()=>{
        window.location.href = "./formUsuario.html"; 
    }).catch(()=>{
        alert("Erro ao fazer logout..");
    });
} 
*/
export async function listar() {
    const lista = [];
    try {
        // Sintaxe correta para o Client SDK v9/v10
        const querySnapshot = await getDocs(collection(quiimDB, "quiimCliente"));

        querySnapshot.forEach((doc) => {
            /*console.log(`${doc.id} => ${doc.data().Nome}`);*/
            lista.push(doc.data().Nome);
        });

    } catch (error) {
        console.error("Erro ao listar documentos:", error);
    }
    return lista;
}

export async function listaArquivos() {
    const pastaImagem = ref(quiimStorage, "/arquivos");
    const arquivos = [];
    await listAll(pastaImagem)
        .then(async (res) => {
            // 1. Listar subpastas (se houver)
            res.prefixes.forEach((pastaRef) => {
                console.log("Subpasta encontrada:", pastaRef.fullPath);
            });
            // 2. Listar arquivos e pegar suas URLs de download
            for (const itemRef of res.items) {
                /* console.log("Arquivo encontrado:", itemRef.name); *///SE DEIXAR ASSIM, ELE TRAZ O NOME COMPLETO
                console.log("Arquivo encontrado:", itemRef.fullPath);
                try {
                    const url = await getDownloadURL(itemRef);
                    console.log(`URL de ${itemRef.name}:`, url);
                    arquivos.push(url);
                } catch (error) {
                    console.error("Erro ao obter URL do arquivo:", error);
                }
            }
        })
        .catch((error) => {
            console.error("Erro ao listar arquivos:", error);
        });
    return arquivos;
}