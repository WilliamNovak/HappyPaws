// Executa ao carregar pagina
$(document).ready(function() {

    const paymentSelect = document.getElementById('paymentSelect');
    const creditCardDiv = document.getElementById('creditCardDiv');

    // Change event do campo select de pagamento
    paymentSelect.addEventListener('change', function() {
        // quando for credito, mostra campos para informar dados do cartao
        if (paymentSelect.value === 'credito') {
            creditCardDiv.style.display = 'flex';
        } else {
            creditCardDiv.style.display = 'none';
        }
    });

    // Busca regiao do resumo do pedido
    const requestItems = document.getElementById('requestItems');
    requestItems.innerHTML = '';
    let price = 0;

    if (localStorage.cart){
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    
    // Adiciona os itens ao resumo do pedido
    for (item of cart) {
        let li = document.createElement('li');
        if (item.id) {
            // Busca o produto
            let product = productsData.find(p => p.id === item.id);
            li.textContent = `x${item.quantidade} ${product.title}`;
            // acrescenta o valor dos produtos
            price += parseFloat(product.price.substring(2).replace(',', '.')) * item.quantidade;
        } else {
            // Busca o pet
            let pet = petsData.find(p => p.id === item.petId);
            li.textContent = `x1 ${item.service} ${pet.type.toLowerCase()} porte ${pet.size.toLowerCase()}`;
            // acrescenta o valor dos servicos
            price += parseFloat(item.price);
        }

        requestItems.appendChild(li);

        // Atualiza o total dos itens
        const totalItems = document.getElementById('totalItems');
        totalItems.innerHTML = `R$${price.toFixed(2).replace('.',',')}`;
        // Busca o valor do frete
        const frete = parseFloat(document.getElementById('frete').textContent.substring(2).replace(',','.'));
        // Atualiza o total do pedido
        const total = document.getElementById('total');
        total.innerHTML = `R$${(price + frete).toFixed(2).replace('.',',')}`;
    }
});