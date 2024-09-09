// Executa ao carregar pagina
$(document).ready(function() {

    const paymentSelect = document.getElementById('paymentSelect');
    const creditCardDiv = document.getElementById('creditCardDiv');

    // Change event do campo select de pagamento
    paymentSelect.addEventListener('change', function() {
        // quando for credito, mostra campos para informar dados do cartao
        if (paymentSelect.value === 'credito') {
            creditCardDiv.style.display = 'flex';
        } else {
            creditCardDiv.style.display = 'none';
        }
      });
});