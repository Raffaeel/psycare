/* dom do campo menssagens*/ 
const btnMensagens = document.getElementById('btnMensagens');
const mensagens = document.getElementById('mensagens');

btnMensagens.addEventListener('click', () => {
    if (mensagens.style.display === 'none' ) {
        mensagens.style.display = 'block';
    } else {
        mensagens.style.display = 'none';
    }   
});