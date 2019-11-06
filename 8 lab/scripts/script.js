import cookieSingleton from './cookieSingleton.js';

const documentCookies = document.getElementById('documentCookies');
const singletonCookies = document.getElementById('singletonCookies');
const getCookieBtn = document.getElementById('getCookieBtn');
const setCookie = document.getElementById('setCookie');
const deleteCookie = document.getElementById('deleteCookie');
const info = document.getElementById('info')

const fillDocumentCookies = () => {
    documentCookies.innerHTML = '';
    document.cookie.split(';').forEach(
        cookie => {
            const li = document.createElement('li');
            li.innerHTML = cookie;
            documentCookies.appendChild(li);
        }
    )
}

const fillSingletonCookies = () => {
    singletonCookies.innerHTML = '';
    for(let name in cookieSingleton.cookie){
        const li = document.createElement('li');
        li.innerHTML = `${name}=${cookieSingleton.cookie[name]}`;
        singletonCookies.appendChild(li)
    }
}

const fillInfo = infoText => info.innerHTML = infoText;

fillDocumentCookies();
fillSingletonCookies();

getCookieBtn.onclick = e => {
    const name = e.target.previousElementSibling.value + '';
    try{
        fillInfo(cookieSingleton.getCookie(name));
    }
    catch(e){
        fillInfo(e)
    }
    
}

setCookieBtn.onclick = e => {
    const value = e.target.previousElementSibling.value + '';
    const name = e.target.previousElementSibling.previousElementSibling.value + '';
    try{
        cookieSingleton.setCookie(name, value);
    }
    catch(e){
        fillInfo(e);
    }
    fillDocumentCookies();
    fillSingletonCookies();
}