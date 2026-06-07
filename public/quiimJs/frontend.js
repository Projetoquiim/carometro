document.getElementById('form-pagamento').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita a página de recarregar

    const btn = document.getElementById('btn-comprar');
    btn.innerText = "Processando...";
    btn.disabled = true;

    // Captura os dados digitados pelo usuário
    const dadosCompra = {
        produtoId: document.getElementById('produto-id').value,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        cpf: document.getElementById('cpf').value.replace(/\D/g, '') // Remove pontos e traços do CPF
    };

    try {
        // Envia os dados para o SEU servidor backend
        const resposta = await fetch('http://localhost:3000/api/criar-cobranca', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosCompra)
        });

        const resultado = await resposta.json();

        if (resultado.urlPagamento) {
            // Redireciona o usuário para a tela oficial de pagamento da AbacatePay
            window.location.href = resultado.urlPagamento;
        } else {
            alert('Erro ao gerar pagamento: ' + resultado.error);
            btn.innerText = "Pagar Agora";
            btn.disabled = false;
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro de conexão com o servidor.');
        btn.innerText = "Pagar Agora";
        btn.disabled = false;
    }
});
