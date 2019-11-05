const btn = document.getElementById('disable-adds');
const adds = document.getElementById('adds');

const isCookieExsist = cookie => 
    !!(document.cookie.match(new RegExp(cookie)));

setInterval(() => {
    isCookieExsist('timeCookie') ?
        adds.classList.add('hidden') :
        adds.classList.remove('hidden')
}, 200)

btn.onclick = () => {
    document.cookie = 'timeCookie=""; max-age=3600';
}