import noteBook from './noteBook.js';
const setData = document.getElementById('setData');
const getData = document.getElementById('getData');
const deleteData = document.getElementById('deleteData');

setData.onclick = e => {
    const value = e.target.previousElementSibling.value;
    const name = e.target.previousElementSibling.previousElementSibling.value;
    console.log(name, value)
    noteBook.setData(name, value);
}

getData.onclick = e => {
    const name = e.target.previousElementSibling.value;
    alert(noteBook.getData(name));
}

deleteData.onclick = e => {
    const name = e.target.previousElementSibling.value;
    noteBook.deleteData(name);
}