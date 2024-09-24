let cart = [];

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
            cart.push({petId: petId, service: service})
        }
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
        cart = cart.filter(item => item.petId !== petId && item.service !== service);
    }
  
    // Atualiza para o novo carrinho sem o item
    localStorage.setItem('cart', JSON.stringify(cart));
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
        console.log(logged);

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