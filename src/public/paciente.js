
document.addEventListener("DOMContentLoaded", function () {

    const btnPaciente = document.getElementById('btnPaciente');
    const paciente = document.getElementById('paciente');

    btnPaciente.addEventListener('click', () => {
        const estiloAtual = window.getComputedStyle(paciente).display;

        if (estiloAtual === 'none') {
            paciente.style.display = 'block';
        } else {
            paciente.style.display = 'none';
        }
    });

});
