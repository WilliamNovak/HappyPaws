// Funcao para voltar para pagina anterior
function voltarPagina() {
    window.history.back();
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