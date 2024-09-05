// Array com dados dos pets
const petsData = [
    { name: "Nome do Pet", type: "Tipo de Pet", breed: "Raça do Pet", size: "Pequeno", image: "./assets/img/dog_shower.jpg" },
    { name: "Nome do Pet", type: "Tipo de Pet", breed: "Raça do Pet", size: "Pequeno", image: "./assets/img/dog_shower.jpg" },
    { name: "Nome do Pet", type: "Tipo de Pet", breed: "Raça do Pet", size: "Pequeno", image: "./assets/img/dog_shower.jpg" }
];

// Gera linhas de pets dinamicamente
const generatePetRows = (data) => {
    
    const petTable = document.getElementById('petTable');
    petTable.innerHTML = ''; // Limpa linhas existentes

    // Percorre array de pets
    data.forEach(pet => {
        // Cria uma nova linha
        const row = document.createElement('tr');

        // Adiciona imagem do pet
        const imageCell = document.createElement('td');
        imageCell.classList.add('text-center');
        const image = document.createElement('img');
        image.src = pet.image;
        image.classList.add('rounded-4', 'shadow-sm');
        image.alt = 'Imagem do Pet';
        image.width = 100;
        image.height = 100;
        imageCell.appendChild(image);
        row.appendChild(imageCell);

        // Dados do pet
        row.innerHTML += `
            <td class="align-middle">${pet.name}</td>
            <td class="align-middle">${pet.type}</td>
            <td class="align-middle">${pet.breed}</td>
            <td class="align-middle">${pet.size}</td>
        `;

        // Acoes de botoes
        const actionsCell = document.createElement('td');
        actionsCell.classList.add('align-middle');
        // Edit button
        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'me-2');
        editButton.setAttribute('data-bs-toggle', 'modal');
        editButton.setAttribute('data-bs-target', '#modalPet');
        editButton.setAttribute('data-action', 'edit');
        editButton.innerHTML = '<i class="fa-regular fa-pen-to-square me-2"></i><span>Editar</span>';
        actionsCell.appendChild(editButton);
        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-outline-danger', 'btn-sm');
        deleteButton.setAttribute('data-bs-toggle', 'modal');
        deleteButton.setAttribute('data-bs-target', '#confirmDelete');
        deleteButton.innerHTML = '<i class="fa-regular fa-trash-can me-2"></i><span>Excluir</span>';
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        // Adiciona a linha do pet na tabela
        petTable.appendChild(row);
    });
}

$(document).ready(function() {
    
    // Executa ao abrir a modal
    $('#modalPet').on('show.bs.modal', function (event) {
        // Botao que disparou o evento de abrir a modal
        let button = $(event.relatedTarget);
        // Extrai a acao do atributo do botao
        let action = button.data('action');
    
        let modal = $(this);
        let btnAdd = modal.find('#addButton');
        let btnSave = modal.find('#saveButton');
    
        // Show/hide button na modal conforme botao clicou para abrir
        if (action === 'add') {
            btnAdd.show()
            btnSave.hide()
        } else if (action === 'edit') {
            btnAdd.hide()
            btnSave.show()
        }
    });

    // Chama a funcao que adiciona as linhas dos pets
    generatePetRows(petsData);

})