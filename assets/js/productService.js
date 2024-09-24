let interval = ''
let services = []

// Passa slide de produto
function nextSlide() {
    $('#productCarousel').carousel('next');
}

// Ativa intervalo para passar slides
function activeInterval() {
    clearInterval(interval);
    timer = window.screen.width <= 480 ? 5000 : 10000;
    interval = setInterval(nextSlide, timer);
}

// Gera cards de pets para servico dinamicamente
const generatePetCards = (data, service) => {
    
    const serviceContainer = document.getElementById('serviceContainer');
    serviceContainer.innerHTML = ''; // Limpa linhas existentes

    // Percorre array de pets
    data.forEach(pet => {
        // Cria um novo card
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');

        // Cria uma linha
        const row = document.createElement('div');
        row.classList.add('row', 'g-0');

        // Primeira coluna da linha
        const col1 = document.createElement('div');
        col1.classList.add('col-md-4', 'd-flex', 'align-items-center');
        // Input checkbox
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.onchange = () => {
            controlService(pet.id, service);
        }
        check.name = 'serviceCheck';
        check.classList.add('m-4');
        col1.appendChild(check);
        // Imagem
        const image = document.createElement('img');
        image.src = pet.image;
        image.classList.add('rounded', 'img-fluid');
        image.alt = 'Imagem do Pet';
        image.width = 100;
        image.height = 100;
        col1.appendChild(image);
        // Adiciona a primeira coluna
        row.appendChild(col1);

        // Segunda coluna da linha
        const col2 = document.createElement('div');
        col2.classList.add('col-md-4', 'd-md-flex', 'align-items-md-center');

        // Dados do pet
        col2.innerHTML += `
            <div class="card-body">
                <h5 class="card-title">${pet.name}</h5>
                <p class="card-text">Raça: ${pet.breed}</p>
                <p class="card-text"><small class="text-muted">Idade: ${pet.age} anos - Porte: ${pet.sizeLetter}</small></p>
            </div>
        `;

        // Adiciona segunda coluna
        row.appendChild(col2);

        // Terceira coluna da linha
        const col3 = document.createElement('div');
        col3.classList.add('col-md-4', 'd-md-flex', 'align-items-md-center');

        // Dados terceira coluna
        col3.innerHTML += `
            <div class="card-body">
                <p class="card-text fw-semibold">Valor: <span class="text-success">R$50,00</span></p>
                <button type="button" class="btn btn-primary">Agendar ${service}</button>
            </div>
        `;
        // Adiciona terceira coluna
        row.appendChild(col3);

        // Adiciona a linha no card
        card.appendChild(row);

        // Adiciona o Card do serviço na div
        serviceContainer.appendChild(card);
    });
}

// Cria um novo card de produto
const createProductCard = (productData) => {
    // Cria os elementos HTML
    const card = document.createElement('div');
    card.classList.add('col', 'd-flex', 'justify-content-center', 'm-0');
    // Cria o card
    const cardElement = document.createElement('div');
    cardElement.classList.add('card', 'rounded-4');

    // Cria a div do preco do card
    cardPrice = `<div class="card-price p-2"><span>${productData.price}</span></div>`;
  
    // Cria a imagem do card
    const image = document.createElement('img');
    image.classList.add('card-img-top', 'card-img', 'rounded-4');
    image.src = productData.image;
    image.alt = productData.altText;

    // Cria o footer do card
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer', 'py-3', 'rounded-bottom-4');

    // Cria o titulo do card
    const cardTitle = document.createElement('div');
    cardTitle.classList.add('row', 'card-title', 'd-flex', 'align-items-center', 'h-25', 'mb-0');

    const h5 = `<h5 class="col-10 m-0">${productData.title}</h5>`;

    const cardButton = document.createElement('button');
    cardButton.classList.add('col-2', 'btn');
    cardButton.type = 'button';

    cardButton.onclick = function() {
        showHideCardDescription(this);
    };
    
    cardButton.innerHTML = '<i class="fa-solid fa-plus"></i>';

    // Adiciona os elementos do titulo
    cardTitle.innerHTML += h5;
    cardTitle.appendChild(cardButton);
  
    // Cria a descricao do card
    const cardDescription = document.createElement('div');
    cardDescription.classList.add('row', 'card-text-hidden', 'h-75', 'position-relative', 'pt-2');
    cardDescription.style.display = 'none';

    // Cria as acoes do card
    const cardActions = document.createElement('div');
    cardActions.classList.add('card-buttons', 'd-flex', 'gap-2', 'justify-content-end');
    const btnBuy = '<button type="button" class="btn btn-success rounded-3">Comprar</button>';
    const btnCart = `<button type="button" onclick="addCartItem(${productData.id})" class="btn btn-outline-success rounded-3"><i class="fa-solid fa-cart-shopping"></i></button>`;
    // Adiciona os botoes de acoes
    cardActions.innerHTML += (btnBuy);
    cardActions.innerHTML += (btnCart);

    // Adiciona os elementos na description do card
    cardDescription.innerHTML += `<p class="card-text m-0">${productData.description}</p>`;
    cardDescription.appendChild(cardActions);

    // Adiciona os elementos no footer do card
    cardFooter.appendChild(cardTitle);
    cardFooter.appendChild(cardDescription);
  
    // Adiciona os elementos filhos ao card
    cardElement.innerHTML += cardPrice;
    cardElement.appendChild(image);
    cardElement.appendChild(cardFooter);
  
    card.appendChild(cardElement);
  
    // Retorna o card criado
    return card;
}

// Gera os cards de produtos na tela
const generateProductCards = (productArray) => {
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = ''; // Limpa linhas existentes

    // Verifica tamanho da tela e quantidade de cards por slide
    const screenWidth   = window.screen.width
        , cardsPerSlide = screenWidth <= 480 ? 1 : 4
        , totalSlides   = productArray.length / cardsPerSlide;

    // Cria e adiciona os slides de produtos
    for (let i = 1; i <= totalSlides; i++) {
        // Cria o slide
        const slide = document.createElement('div');
        slide.classList.add('carousel-item');
        
        // Seta o primeiro como ativo
        if (i === 1) {
            slide.classList.add('active');
        }
        // Cria a linha de cards
        const row = document.createElement('div');
        row.classList.add('row', 'row-cols-1', `row-cols-md-${cardsPerSlide}`, 'g-4', 'mt-1');

        // Verifica cards por slide
        const final   = (cardsPerSlide * i)
            , initial = final - cardsPerSlide;
        
        // Chama funcao que cria o card e adiciona os cards no array
        for (let p = initial; p < final; p++) {
            card = createProductCard(productArray[p]);
            row.appendChild(card);
        }

        // Adiciona a linha no slide
        slide.appendChild(row);

        // Adiciona o slide na div de produtos
        productContainer.appendChild(slide);
    }
}

// Funcao que controla a regiao da descricao dos cards de produtos
const showHideCardDescription = (btn) => {
    // Seleciona o elemento com classe card mais proximo
    const card       = btn.closest('.card')
        , cardFooter = card.querySelector('.card-footer');;
    // Adiciona ou remove a classe expanded
    card.classList.toggle('expanded');

    // Alteracao icone do botao
    const icon = btn.querySelector('i');
    icon.classList.toggle('fa-plus');
    icon.classList.toggle('fa-minus');

    // Limpa o intervalo de tempo do slide
    clearInterval(interval);

    // Altera o display do elemento da classe card-text-hidden
    const cardTextHidden = cardFooter.querySelector('.card-text-hidden');
    cardTextHidden.style.display = cardTextHidden.style.display === 'none' ? 'block' : 'none';
};

// Funcao para controlar servicos marcados
function controlService(petId, service) {
    // Verificar se ja existe algo no carrinho
    if (localStorage.services){
        services = JSON.parse(localStorage.getItem('services'));
    }

    // Verifica se o servico esta marcado
    let serviceItem = services.find(item => item.petId === petId && item.service === service);

    // Se ja estiver remove, senao adiciona nos servicos marcados
    if (serviceItem) {
        services = services.filter(item => item.petId !== petId && item.service !== service);
    } else {
        services.push({ petId: petId, service: service });
    }

    // Atualiza os servicos marcados
    localStorage.setItem('services', JSON.stringify(services));
    console.log(services);
}

// Adiciona servicos selecionados ao carrinho
const addServices = () => {
    for (let item of services) {
        addCartItem(null, item.petId, item.service);
    }
}

// Executa ao carregar pagina
$(document).ready(function() {
    // Pega os parametros da url
    const urlParams = new URLSearchParams(window.location.search);
    // Verifica a tab passada por parametro
    const tab = urlParams.get('tab');

    // Se houver, vai para aquela tab
    if (tab) {
        document.getElementById(tab).click();
    };

    generateProductCards(productsData)

    // Executa ao abrir a modal
    $('#serviceModal').on('show.bs.modal', function (event) {
        // Botao que disparou o evento de abrir a modal
        let button = $(event.relatedTarget);
        // Extrai a acao do atributo do botao
        let service = button.data('service');

        // Chama a funcao que adiciona as linhas dos pets
        generatePetCards(petsData, service);

        // Limpa os servicos marcados
        services = [];
        localStorage.setItem('services', services);

        let cartButton = document.getElementById('cartButton');
        cartButton.onclick = () => {
            addServices(service);
            console.log(cart);
        }

        let contractButton = document.getElementById('contractButton');
        contractButton.onclick = () => {
            addServices(service);
        }
    });

    activeInterval();
})