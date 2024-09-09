// Funcao para voltar para pagina anterior
function voltarPagina() {
    window.history.back();
}

// Executa ao carregar pagina
$(document).ready(function() {
    // Carrega o footer de forma dinamica em todas paginas na regiao do id
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('pageFooter').innerHTML = data;
        });
})