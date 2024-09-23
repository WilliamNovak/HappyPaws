const showCartItem = (item, amount) => {
    // Cria a linha do carrinho
    var productRow = document.createElement("tr");
    productRow.classList.add("cart-item");

    // Cria a primeira célula (imagem e descrição)
    var descriptionCell = document.createElement("td");
    descriptionCell.classList.add("d-flex", "align-items-center");

    // Cria a imagem do produto
    var image = document.createElement("img");
    image.src = item.image;
    image.alt = item.altText;
    image.classList.add("rounded-3");

    // Cria a descricao do produto
    var description = document.createElement("p");
    description.textContent = item.title;
    description.classList.add("item-description", "m-0", "mx-3");

    descriptionCell.appendChild(image);
    descriptionCell.appendChild(description);

    // Cria a segunda célula (preço)
    var priceCell = document.createElement("td");
    priceCell.classList.add("align-middle");
    priceCell.textContent = item.price;

    // Cria a terceira célula (quantidade)
    var amountCell = document.createElement("td");
    amountCell.classList.add("align-middle", "text-center");

    var amoutDiv = document.createElement("div");
    amoutDiv.classList.add("col-8", "form-floating");

    // Input da quantidade
    var inputQuantidade = document.createElement("input");
    inputQuantidade.type = "number";
    inputQuantidade.classList.add("form-control", "input-field", "py-1");
    inputQuantidade.id = "qtdInput";
    inputQuantidade.name = "productQtd";
    inputQuantidade.value = amount;
    inputQuantidade.max = "99";
    // Adiciona na celula
    amoutDiv.appendChild(inputQuantidade);
    amountCell.appendChild(amoutDiv);

    // Cria a quarta célula (remover)
    var removeCell = document.createElement("td");
    removeCell.classList.add("align-middle");

    var removeButton = document.createElement("button");
    removeButton.style.textDecoration = "none";
    removeButton.style.background = "none";
    removeButton.style.border = "none";
    removeButton.onclick = () => {
        removeItem(item.id);
    }
    removeButton.textContent = "Remover";
    removeButton.classList.add("item-link");

    removeCell.appendChild(removeButton);

    // Adiciona as células à linha do carrinho
    productRow.appendChild(descriptionCell);
    productRow.appendChild(priceCell);
    productRow.appendChild(amountCell);
    productRow.appendChild(removeCell);

    productTable.appendChild(productRow);
}

// Remove item do carrinho e atualiza ele
const removeItem = (id) => {
    console.log(id);
    removeCartItem(id);
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

    // Busca os produtos na memoria e mostra no carrinho
    for (item of cart) {
        console.log(item)
        let product = productsData.find(p => p.id === item.id);
        let amount = item.quantidade;
        showCartItem(product, amount);
    }
}

$(document).ready(function() {
    refreshCart();
});