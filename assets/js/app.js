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
    })
})