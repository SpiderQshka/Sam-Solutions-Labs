const form = document.getElementById('form');
const meter = form.querySelector('#impessionRange');
const dialog = document.getElementById('dialog');
const impressionRadios = Array.from(form.elements.impressionInput);
const places = form.querySelector('#places');
const countrySelect = form.elements.countrySelect;
const contriesPlaces = {
    belarus: [
        {
            name: 'Belarus 1',
            img: '#'
        },
        {
            name: 'Belarus 2',
            img: '#'
        },
        {
            name: 'Belarus 3',
            img: '#'
        }
    ],
    italy: [
        {
            name: 'Italy 1',
            img: '#'
        },
        {
            name: 'Italy 2',
            img: '#'
        },
        {
            name: 'Italy 3',
            img: '#'
        }
    ],
    estony: [
        {
            name: 'Estony 1',
            img: '#'
        },
        {
            name: 'Estony 2',
            img: '#'
        },
        {
            name: 'Estony 3',
            img: '#'
        }
    ]
}

// Создание шаблона пункта списка достопримечательностей

const liTemplate = document.createElement('li');
const label = document.createElement('label');
const input = document.createElement('input');
const text = document.createElement('span');
input.type = 'checkbox';
label.appendChild(input);
label.appendChild(text);
liTemplate.appendChild(label);
liTemplate.style.display = 'none';

// Добавление списка на страницу

for(let country in contriesPlaces){
    contriesPlaces[country].forEach( 
        place => {
            const li = liTemplate.cloneNode(true);
            li.firstChild.lastChild.innerText = place.name;
            places.appendChild(li);
        }
    )
}

// Установка начального значения шкалы
meter.value = impressionRadios.filter(el => el.checked)[0].value;

// Установка листнеров на каждую радиокнопку
impressionRadios.forEach(el => el.onchange = e => impressionChange(e.target.value));

// Закрывать диалоговое окно при двойном клике
dialog.ondblclick = () => {
    dialog.style.display = 'none';
}

const impressionChange = v => {
    meter.value = v;
}

countrySelect.onchange = e => {
    Array.from(places.children).forEach()
    // console.log(Array.from(places.children))
}

form.addEventListener('submit', e => {
    dialog.innerHTML = '';

    e.preventDefault();
    
    const impression = document.createElement('li');
    impression.innerHTML = `Impression:
            ${form.elements.impressionRange.value}`;

    const userData = document.createElement('li');
    userData.innerHTML = `Name: ${form.elements.userData[0].value}, \n
                          Surname: ${form.elements.userData[1].value}, \n
                          Patronymic: ${form.elements.userData[2].value}`;

    const contacts = document.createElement('li');
    contacts.innerHTML = `Tel: ${form.elements.tel.value}, Email: ${form.elements.email.value}`;
    
    const tripDetails = document.createElement('li');
    tripDetails.innerHTML = `Country: ${form.elements.countrySelect.value} \n,
                             Places: ${form.elements.place.value}`;
        
    const guideFeedback = document.createElement('li');
    guideFeedback.innerHTML = `Guide value: ${form.elements.guideValue.value}`;

    const gallery = document.createElement('li');
    gallery.innerHTML = `Image: ${form.elements.gallery.value}`;

    const feedback = document.createElement('li');
    feedback.innerHTML = `Feedback: ${form.elements.feedback.value}`;

    dialog.append(impression, userData, contacts, tripDetails,
                guideFeedback, gallery, feedback);

    dialog.style.display = 'block';
})