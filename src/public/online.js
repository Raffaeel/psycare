/* dom do campo online */
const btnOnline = document.getElementById('btnOline');
const online = document.getElementById('online');
btnOnline.addEventListener('click', () => {
    if (online.style.display === 'none' ) {
        online.style.display = 'block';
    } else {
        online.style.display = 'none';
    }   
});