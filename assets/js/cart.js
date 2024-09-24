const showCartItem = (type, item, amount, service, price) => {
    // Cria a linha do carrinho
    let itemRow = document.createElement("tr");
    itemRow.classList.add("cart-item");

    // Cria a primeira célula (imagem e descrição)
    let descriptionCell = document.createElement("td");
    descriptionCell.classList.add("d-flex", "align-items-center");

    // Cria a imagem do produto
    let image = document.createElement("img");
    image.src = item.image;
    image.alt = item.altText;
    image.classList.add("rounded-3");

    // Cria a descricao do produto
    let description = document.createElement("p");
    description.textContent = type === 'product' ? item.title : `${service} ${item.type.toLowerCase()} porte ${item.size.toLowerCase()}`;
    description.classList.add("item-description", "m-0", "mx-3");

    descriptionCell.appendChild(image);
    descriptionCell.appendChild(description);

    // Cria a segunda célula (preço)
    let priceCell = document.createElement("td");
    priceCell.classList.add("align-middle");
    priceCell.textContent = type === 'product' ? item.price : 'R$'+price.toFixed(2).replace('.',',');

    // Cria a terceira célula (quantidade)
    let amountCell = document.createElement("td");
    amountCell.classList.add("align-middle", "text-center");

    if (type === 'product') {
        let amoutDiv = document.createElement("div");
        amoutDiv.classList.add("col-8", "form-floating");

        // Input da quantidade
        let inputQuantidade = document.createElement("input");
        inputQuantidade.type = "number";
        inputQuantidade.classList.add("form-control", "input-field", "py-1");
        inputQuantidade.id = "qtdInput";
        inputQuantidade.name = "productQtd";
        inputQuantidade.value = amount;
        inputQuantidade.max = "99";
        // Adiciona na celula
        amoutDiv.appendChild(inputQuantidade);
        amountCell.appendChild(amoutDiv);
    }

    // Cria a quarta célula (remover)
    let removeCell = document.createElement("td");
    removeCell.classList.add("align-middle");

    let removeButton = document.createElement("button");
    removeButton.style.textDecoration = "none";
    removeButton.style.background = "none";
    removeButton.style.border = "none";
    removeButton.onclick = () => {
        if (type === 'product') {
            removeItem(item.id);
        } else {
            removeItem(null, item.id, service);
        }
    }
    removeButton.textContent = "Remover";
    removeButton.classList.add("item-link");

    removeCell.appendChild(removeButton);

    // Adiciona as células à linha do carrinho
    itemRow.appendChild(descriptionCell);
    itemRow.appendChild(priceCell);
    itemRow.appendChild(amountCell);
    itemRow.appendChild(removeCell);

    if (type === 'product') {
        productTable.appendChild(itemRow);
    } else {
        serviceTable.appendChild(itemRow);
    }
}

// Remove item do carrinho e atualiza ele
const removeItem = (id = null, petId = null, service = null) => {
    removeCartItem(id, petId, service);
    refreshCart();
}

// Atualiza o carrinho
const refreshCart = () => {
    // Verifica se ja existe o carrinho
    if (localStorage.cart){
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    // Limpa os produtos
    const productTable = document.getElementById('productTable');
    productTable.innerHTML = '';
    const serviceTable = document.getElementById('serviceTable');
    serviceTable.innerHTML = '';
    let productsPrice = 0;
    let servicesPrice = 0;

    // Busca os produtos na memoria e mostra no carrinho
    for (item of cart) {
        if (item.id) {
            let product = productsData.find(p => p.id === item.id);
            let amount = item.quantidade;
            // mostra no carrinho
            showCartItem('product', product, amount);
            // acrescenta ao valor dos produtos
            productsPrice += parseFloat(product.price.substring(2).replace(',', '.')) * amount;
        } else {
            // Busca o pet
            let pet = petsData.find(p => p.id === item.petId);
            // mostra no carrinho
            showCartItem('service', pet, null, item.service, item.price);
            // acrescenta no valor dos servicos
            servicesPrice += parseFloat(item.price);
        }
    }

    // Atualiza o total dos produtos
    const totalProducts = document.getElementById('totalProducts');
    totalProducts.innerHTML = `R$${productsPrice.toFixed(2).replace('.',',')}`;
    // Atualiza o total dos produtos
    const totalServices = document.getElementById('totalServices');
    totalServices.innerHTML = `R$${servicesPrice.toFixed(2).replace('.',',')}`;
    // Atualiza o total dos produtos
    const totalCart = document.getElementById('totalCart');
    totalCart.innerHTML = `R$${(productsPrice + servicesPrice).toFixed(2).replace('.',',')}`;
}

$(document).ready(function() {
    refreshCart();
});