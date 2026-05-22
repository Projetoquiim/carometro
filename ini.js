import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {getFirestore, collection, getDocs} from "firebase/firestore";

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const admin = initializeApp(firebaseConfig);

const quiimDB = getFirestore(admin);
const quiimLog = getAuth(admin);

function logar(usuario, senha) {
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

async function listar() {
    try {
        // Sintaxe correta para o Client SDK v9/v10
        const querySnapshot = await getDocs(collection(quiimDB, "quiimCliente"));
        
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().Nome}`);
        });
    } catch (error) {
        console.error("Erro ao listar documentos:", error);
    }
}
listar();
logar("projetoquim@gmail.com","@19Twostars");