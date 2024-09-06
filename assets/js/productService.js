// Array com dados dos pets
const petsData = [
    { name: "Nome do Pet", breed: "Golden Retriever", age: 2, size: "P", image: "./assets/img/dog_shower.jpg" },
    { name: "Nome do Pet", breed: "Golden Retriever", age: 2, size: "P", image: "./assets/img/dog_shower.jpg" },
    { name: "Nome do Pet", breed: "Golden Retriever", age: 2, size: "P", image: "./assets/img/dog_shower.jpg" },
    { name: "Nome do Pet", breed: "Golden Retriever", age: 2, size: "P", image: "./assets/img/dog_shower.jpg" }
];

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
        col1.classList.add('col-md-4');
        // Input checkbox
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.name = 'serviceCheck';
        check.classList.add('m-4');
        col1.appendChild(check);
        // Imagem
        const image = document.createElement('img');
        image.src = pet.image;
        image.classList.add('rounded', 'img-fluid');
        image.alt = 'Imagem do Pet';
        image.width = 150;
        image.height = 150;
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
                <p class="card-text"><small class="text-muted">Idade: ${pet.age} anos - Porte: ${pet.size}</small></p>
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

// Funcao que controla a regiao da descricao dos cards de produtos
const showHideCardDescription = (btn) => {
    // Seleciona o elemento com classe card mais proximo
    const card       = btn.closest('.card')
        , cardFooter = card.querySelector('.card-footer');;
    // Adiciona ou remove a classe expanded
    card.classList.toggle('expanded');

    // Altera o display do elemento da classe card-text-hidden
    const cardTextHidden = cardFooter.querySelector('.card-text-hidden');
    cardTextHidden.style.display = cardTextHidden.style.display === 'none' ? 'block' : 'none';
};

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

    // Executa ao abrir a modal
    $('#serviceModal').on('show.bs.modal', function (event) {
        // Botao que disparou o evento de abrir a modal
        let button = $(event.relatedTarget);
        // Extrai a acao do atributo do botao
        let service = button.data('service');

        // Chama a funcao que adiciona as linhas dos pets
        generatePetCards(petsData, service);
    });
})