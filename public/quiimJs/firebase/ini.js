//------------------------------- GERAL ----------------------------------------
//import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-SERVICE.js";
//------------------------------- GERAL ----------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { collection, getDocs, getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";


/* dotenv.config();*/
/* app.use(cors());*/

const firebaseConfig = {
    apiKey: "AIzaSyBuUNUufC0aGs4VFZEiHvAXvpIpsvy5Dek",
    authDomain: "projetoquiim.firebaseapp.com",
    projectId:"projetoquiim",
    storageBucket: "projetoquiim.appspot.com",
    messagingSenderId: "541088523428",
    appId: "1:541088523428:web:41811dfd1e88b78d7cb231"
};

const quiimAdm = initializeApp(firebaseConfig);
const quiimDB = getFirestore(quiimAdm);

/* 
const quiimLog = firebase.auth();

export async function logar(usuario, senha) {
    signInWithEmailAndPassword(quiimLog, usuario, senha)
        .then((credencial) => {
            // Usuário logado com sucesso
            const user = credencial.user;
            console.log("Logado com sucesso:", user.email);
        })
        .catch((error) => {
            const codigoerro = error.code;
            const mensagemErro = error.message;
            console.error("Erro ao logar:", mensagemErro);
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
            console.log(`${doc.id} => ${doc.data().Nome}`);
            lista.push(doc.data().Nome);
        });

    } catch (error) {
        console.error("Erro ao listar documentos:", error);
    }
    return lista;
}
/*
listar();
 logar("projetoquim@gmail.com","@19Twostars"); */