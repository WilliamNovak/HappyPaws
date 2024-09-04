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
})