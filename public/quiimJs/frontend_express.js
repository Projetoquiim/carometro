const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Inicialize o Firebase Admin
admin.initializeApp({ projectId: "seu-projeto-id" });
const db = admin.firestore();

const app = express();
app.use(express.json());
app.use(cors()); // Permite que o frontend acesse o backend

const ABACATE_API_KEY = "Sua_Chave_Secreta_Da_AbacatePay_Aqui";

app.post('/api/criar-cobranca', async (req, res) => {
    try {
        const { produtoId, nome, email, cpf } = req.body;

        // 1. Busca o produto direto no Firestore para validar o preço real
        const produtoDoc = await db.collection('produtos').doc(produtoId).get();
        if (!produtoDoc.exists) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        const produto = produtoDoc.data();

        // 2. Registra a intenção de compra na coleção "pedidos" com status PENDENTE
        const novoPedidoRef = db.collection('pedidos').doc(); // Cria um ID automático
        await novoPedidoRef.set({
            cliente: { nome, email, cpf },
            produtoId: produtoId,
            valor: produto.preco,
            status: "PENDENTE",
            criadoEm: admin.firestore.FieldValue.serverTimestamp()
        });

        // 3. Monta e envia o POST oficial para a AbacatePay usando a Fetch API nativa
        const respostaAbacate = await fetch('https://abacatepay.com', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ABACATE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                frequency: "ONE_TIME", // Cobrança única
                methods: ["PIX"],      // Apenas PIX
                products: [
                    {
                        externalId: produtoId,
                        name: produto.nome,
                        quantity: 1,
                        priceValue: Math.round(produto.preco * 100) // AbacatePay exige o valor em centavos (Ex: R$ 97,00 vira 9700)
                    }
                ],
                returnUrl: "https://sualoja.com", // Para onde o cliente volta após pagar
                completionUrl: "https://sualoja.com",
                customerId: cpf, // Identificador único do cliente
                customer: {
                    name: nome,
                    email: email,
                    taxId: cpf
                }
            })
        });

        const dadosAbacate = await respostaAbacate.json();

        if (!respostaAbacate.ok) {
            throw new Error(dadosAbacate.message || 'Erro na API da AbacatePay');
        }

        // 4. Salva o ID da cobrança da AbacatePay no pedido do Firestore para conciliação futura
        await novoPedidoRef.update({
            abacatePayId: dadosAbacate.data.id
        });

        // 5. Devolve a URL de pagamento para o frontend redirecionar o usuário
        res.json({ urlPagamento: dadosAbacate.data.url });

    } catch (error) {
        console.error('Erro no servidor:', error.message);
        res.status(500).json({ error: 'Falha interna ao processar a cobrança.' });
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
