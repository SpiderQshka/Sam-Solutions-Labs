const btn = document.getElementById('btn');

window.onstorage = () => {
    localStorage.getItem('isThemeDark') ? 
        document.body.classList.add('dark') :
        document.body.classList.remove('dark');
}

btn.onchange = () => {
    if(localStorage.getItem('isThemeDark')){
        localStorage.removeItem('isThemeDark');
        document.body.classList.remove('dark');
    } else {
        localStorage.setItem('isThemeDark', true);
        document.body.classList.add('dark');
    }
}