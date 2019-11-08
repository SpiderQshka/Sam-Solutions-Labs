const noteBook = {
    setData(name, value){
        if(name && value){
            localStorage.setItem(name, value);
        }
    },
    getData(name){
        return localStorage.getItem(name) || 'Not found';
    },
    deleteData(name){
        localStorage.removeItem(name);
    }
}

export default noteBook;