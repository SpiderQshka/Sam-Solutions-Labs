const form = document.getElementById('form');
const meter = form.querySelector('#impessionRange');
const dialog = document.getElementById('dialog');
const impressionRadios = Array.from(form.elements.impressionInput);
const places = form.querySelector('#places');
const countrySelect = form.elements.countrySelect;
const loadingImg = '../img/loading.png';
const contriesPlaces = {
    belarus: [
        {
            name: 'Belarus 1',
            img: '../img/belarus-1.png'
        },
        {
            name: 'Belarus 2',
            img: '../img/belarus-2.png'
        },
        {
            name: 'Belarus 3',
            img: '../img/belarus-3.png'
        }
    ],
    italy: [
        {
            name: 'Italy 1',
            img: '../img/italy-1.png'
        },
        {
            name: 'Italy 2',
            img: '../img/italy-2.png'
        },
        {
            name: 'Italy 3',
            img: '../img/italy-3.png'
        }
    ],
    estony: [
        {
            name: 'Estony 1',
            img: '../img/belarus-1.png'
        },
        {
            name: 'Estony 2',
            img: '../img/belarus-1.png'
        },
        {
            name: 'Estony 3',
            img: '../img/belarus-1.png'
        }
    ]
}

// Создание шаблона пункта списка достопримечательностей

const liTemplate = document.createElement('li');
const label = document.createElement('label');
const input = document.createElement('input');
const text = document.createElement('span');
const img = document.createElement('img');
img.src = loadingImg;
input.type = 'checkbox';
label.appendChild(input);
label.appendChild(text);
liTemplate.appendChild(label);
liTemplate.appendChild(img);
liTemplate.classList.add('place');
// Вынеси в классы, балбес


// Добавление списка на страницу

for(let country in contriesPlaces){
    contriesPlaces[country].forEach( 
        place => {
            const li = liTemplate.cloneNode(true);
            li.firstChild.lastChild.innerText = place.name;
            li.classList.add(country);
            // const img = document.createElement('img');
            // img.src = "https://cs5.pikabu.ru/post_img/2019/01/16/5/1547622216182941132.jpg";
            // img.onload = () => li.children[1].replaceWith(img);
            places.appendChild(li);
        }
    )
}

// Установка начального значения шкалы
meter.value = impressionRadios.filter(el => el.checked)[0].value;

// Установка листнеров на каждую радиокнопку
impressionRadios.forEach(el => el.onchange = e => impressionChange(e.target.value));

const impressionChange = v => {
    meter.value = v;
}

// Закрывать диалоговое окно при двойном клике
dialog.ondblclick = () => {
    dialog.style.display = 'none';
}

Array.from(places.children).forEach(
    place => {
        place.classList.contains(countrySelect.value) ?
            place.classList.add('visible') : 
            place.classList.remove('visible');
    }
)

countrySelect.onchange = e => {
    Array.from(places.children).forEach(
        place => {
            if(place.classList.contains(e.target.value)){
                place.classList.add('visible');
            }
            else{
                place.classList.remove('visible');
            }
        }
    )
}


const guideFeedback = Array.from(form.elements.guideFeedback.querySelector('ul').children)

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