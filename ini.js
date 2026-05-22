import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const adminDB = admin.firestore();

async function listar() {
    const lista = await adminDB.collection("quiimCliente").get();
    lista.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().Nome}`);
    });
}
listar();