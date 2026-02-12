
/* pegando elementos dom do paciente */
const btnPaciente = document.getElementById('btnPaciente');
const paciente = document.getElementById('paciente');

btnPaciente.addEventListener('click', () => {
    if (paciente.style.display === 'none' ) {
        paciente.style.display = 'block';   
    } else {
        paciente.style.display = 'none';
    }   
});