/* dom do prontuário*/ 
const btnProntuario = document.getElementById('btnProntuario');
const prontuario = document.getElementById('prontuario');

btnProntuario.addEventListener('click', () => {
    if (prontuario.style.display === 'none' ) {
        prontuario.style.display = 'block';
    } else {
        prontuario.style.display = 'none';
    }   
});