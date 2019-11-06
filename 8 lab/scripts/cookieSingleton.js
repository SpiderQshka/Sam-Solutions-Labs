const getCookieStr = name => (document.cookie.match(new RegExp(`${name}=\\S+;?`)) || [null])[0];
const getCookieValue = str => str.split('=')[1];
const deleteCookie = name => document.cookie = name + '=; Max-Age=-1;'; 

const cookieSingleton = {
    cookie: {

    },
    getCookie(name){
        if(this.cookie[name]){
            return this.cookie[name]
        }
        const cookieStr = getCookieStr(name);
        if(cookieStr){
            const cookieValue = getCookieValue(cookieStr);
            this.cookie[name] = cookieValue;
            return cookieValue
        }
        throw new Error('Nothing was found');
    },
    setCookie(name, value){
        if(typeof name !== 'string' || name === ''){
            throw new Error('Only strings are allowed')
        }
        this.cookie[name] = value;
        document.cookie = `${name}=${value};`
    },
    deleteCookie(name){
        delete this.cookie[name];
        deleteCookie(name);
    }
}

export default cookieSingleton