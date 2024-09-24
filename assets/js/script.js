let cart = [];
let pedido = [];

// Funcao para voltar para pagina anterior
function voltarPagina() {
    window.history.back();
}

// Funcao para adicionar item ao carrinho
function addCartItem(id = null, petId = null, service = null) {
    // Verificar se ja existe algo no carrinho
    if (localStorage.cart){
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    if (id) {
        // Verifica se o item ja esta no carrinho
        let cartItem = cart.find(item => item.id === id);

        // Se ja estiver acrescenta mais 1 na quantidade, senao adiciona ao carrinho
        if (cartItem) {
            cartItem.quantidade++;
        } else {
            cart.push({ id: id, quantidade: 1 });
        }
    } else {
        // Verifica se o item ja esta no carrinho
        let cartItem = cart.find(item => item.petId === petId && item.service === service);

        // Se nao estiver, adiciona no carrinho
        if (!cartItem) {
            let price = service === 'Banho' ? 50 : 75;
            cart.push({petId: petId, service: service, price: price})
        }
    }

    // Atualiza o carrinho
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Funcao para atualizar o item no carrinho
function updateCartItem(id, quantidade) {
    // Verificar se ja existe algo no carrinho
    if (localStorage.cart){
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    // Verifica se o item ja esta no carrinho
    let cartItem = cart.find(item => item.id === id);

    // Se estiver atualiza a quantidade
    if (cartItem) {
        cartItem.quantidade = quantidade;
    }

    // Atualiza o carrinho
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Funcao para remover um item do carrinho
function removeCartItem(id = null, petId = null, service = null) {
    // Obtem o carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('cart'));
  
    // Filtra para eliminar o elemento que deseja remover do carrinho
    if (id) {
        cart = cart.filter(item => item.id !== id);
    } else {
        cart = cart.filter(item => item.petId !== petId || item.service !== service);
    }
  
    // Atualiza para o novo carrinho sem o item
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Funcao para adicionar item diretamente ao pedido
function addItem(id = null, petId = null, service = null) {
    if (id) {
        pedido.push({ id: id, quantidade: 1 });
    } else {
        let price = service === 'Banho' ? 50 : 75;
        pedido.push({petId: petId, service: service, price: price})
    }
}

// Function que fecha pedido e redireciona
const fechaPedido = () => {
    localStorage.setItem('pedido', JSON.stringify(pedido));
    window.location.href = "pedido.html";
}

// Adiciona item unico em pedido e vai para fechamento
const requestItem = (id = null, petId = null, service = null) => {
    pedido = [];
    addItem(id, petId, service);
    fechaPedido();
}

// Adiciona servicos marcados e redireciona para fechar pedido
const requestServices = (services) => {
    pedido = [];
    for (item of services) {
        addItem(null, item.petId, item.service);
    }
    fechaPedido();
}

// Executa ao carregar pagina
$(document).ready(function() {

    // Verifica qual a pagina atual
    page = window.location.pathname.split('/').pop();

    // Verifica se esta na pagina home
    if (page === 'index.html') {
        const urlParams = new URLSearchParams(window.location.search);
        // Verifica se esta logado
        const logged = urlParams.get('logged');

        // Se estiver logado, mostra navbar logado
        if (logged === 'true') {
            fetch('loggedNavbar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('homeNav').innerHTML = data;
            });
        } else {
            // Senao mostra a navbar deslogado
            fetch('homeNavbar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('homeNav').innerHTML = data;
            });
        }

    } else {
        // Se nao estiver na home, carrega o navbar logada em todas paginas na regiao do id
        fetch('loggedNavbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('loggedNav').innerHTML = data;
        });
    }

    // Carrega o footer de forma dinamica em todas paginas na regiao do id
    fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('pageFooter').innerHTML = data;
    });
})