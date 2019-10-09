const switcher = document.querySelector('.switch-wrap input');

switcher.addEventListener('change', () => {
    console.log('!');
    document.body.classList.toggle('dark');
})