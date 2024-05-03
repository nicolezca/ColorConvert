var resultColors = document.querySelectorAll('.result-color');
var copiedMessage = document.querySelector('.copy-message');

resultColors.forEach(function (color) {
    color.addEventListener('click', function () {
        var textToCopy = this.getAttribute('data-clipboard-text');

        // Mostrar el mensaje de "Copiado"
        copiedMessage.classList.add('show');

        var clipboard = new ClipboardJS(this, {
            text: function () {
                return textToCopy;
            }
        });

        // Ocultar el mensaje después de 1 segundos
        setTimeout(() => {
            copiedMessage.classList.remove('show');
        }, 1000);
        e.clearSelection();

        clipboard.on('error', function (e) {
            console.error('Error al copiar al portapapeles');
        });
    });
});
