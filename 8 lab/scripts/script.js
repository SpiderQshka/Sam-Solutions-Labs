const form = document.getElementById('form');

const inputs = [...form.elements].filter(el => el.nodeName === 'INPUT');

inputs.forEach(
    input =>
        input.value = localStorage.getItem(input.name))

form.onchange = e => localStorage.setItem(e.target.name, e.target.value);