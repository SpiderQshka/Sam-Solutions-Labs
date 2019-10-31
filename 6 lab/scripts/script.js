import validate from './validate.js' 
import createRange from './range.js';

const form = document.getElementById('form');
const dialog = document.getElementById('dialog');
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
const meter = form.querySelector('#impessionRange');
const impressionRadios = Array.from(form.elements.impressionInput);
const places = form.querySelector('#places');
const countrySelect = form.elements.countrySelectInput;
const loadingImg = '../img/loading.png';
const galleryImages = document.querySelector('#galleryImages');

form.appendChild(createRange());

// Создание шаблона пункта списка достопримечательностей
const liTemplate = document.createElement('li');
const label = document.createElement('label');
const input = document.createElement('input');
const text = document.createElement('span');
const img = document.createElement('img');
img.src = loadingImg;
input.type = 'checkbox';
input.name = 'place';
label.appendChild(input);
label.appendChild(text);
liTemplate.appendChild(label);
liTemplate.appendChild(img);
liTemplate.classList.add('place');

// Добавление списка достопримечательностей на страницу
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

Array.from(form.elements).forEach(
    element => {
        if(element.nodeName !== 'FIELDSET'){
            element.onchange = e => validate(e.target);
        }
    }
)

// Установка начального значения шкалы
meter.value = impressionRadios.filter(el => el.checked).length ?
                impressionRadios.filter(el => el.checked)[0].value :
                100;

// Установка листнеров на каждую радиокнопку,
// При изменении активной радиокнопки изменяется значение шкалы
impressionRadios.forEach(el => el.onchange = e => meter.value = e.target.value);

// Закрывать диалоговое окно при двойном клике
dialog.ondblclick = () => {
    dialog.classList.remove('visible');
}

// Изначальное отображение достопримечательностей
Array.from(places.children).forEach(
    place => {
        const countries = [...countrySelect.selectedOptions];
        const result = countries.some(
            country => place.classList.contains(country.value)
        )
        result ?
            place.classList.add('visible') : 
            place.classList.remove('visible');
    }
)

// Установка листнеров на изменение значения селекта
countrySelect.onchange = e => {
    Array.from(places.children).forEach(
        place => {
            validate(e.target);
            const countries = [...e.target.selectedOptions];
            const result = countries.some(
                country => place.classList.contains(country.value)
            )
            result ?
                place.classList.add('visible') : 
                place.classList.remove('visible');
        }
    )
}

// Установка листнеров на изменение значения чекбоксов "Качество услуг гида",
// При неактивном чекбоксе - не отображаем range
const guideFeedbackInputs = form.elements.guideFeedbackInput;
const guideFeedbackRanges = form.elements.guideFeedbackRange;
Array.from(guideFeedbackInputs).forEach(
    (input, i) => {
        input.checked ? guideFeedbackRanges[i].disabled = false : guideFeedbackRanges[i].disabled = true;
        input.onchange = e => {
            validate(e.target);
            if(input.checked){
                guideFeedbackRanges[i].disabled = false;
                console.log('Enabled');
            }
            else{
                guideFeedbackRanges[i].disabled = true;
                guideFeedbackRanges[i].value = 0;
                console.log('Disabled');
            }
        } 
    } 
)

const galleryInput = form.elements.galleryInput;

galleryInput.onchange = e => {
    const imagesArray = Array.from(e.target.files);
    imagesArray.forEach(
        file => {
            validate(e.target);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = document.createElement('img');
                img.src = reader.result
                galleryImages.appendChild(img);
            }
            reader.onerror = () => {
                const errorInfo = document.createElement('p');
                errorInfo.innerText = reader.error;
                galleryImages.appendChild(errorInfo)
            };
        }
    )
}

form.addEventListener('submit', e => {

    dialog.innerHTML = '';
    e.preventDefault();

    if(validate()){

        const impression = document.createElement('li');
        impression.innerHTML = `Impression:
                ${form.elements.impressionInput.value}%`;

        const userData = document.createElement('li');
        userData.innerHTML = `Name: ${form.elements.userDataInput[0].value}, \n
                            Surname: ${form.elements.userDataInput[1].value}, \n
                            Patronymic: ${form.elements.userDataInput[2].value}`;

        const contacts = document.createElement('li');
        contacts.innerHTML = `Tel: ${form.elements.tel.value}, Email: ${form.elements.email.value}`;
        
        const tripDetails = document.createElement('li');
        const placesArray = Array.from(form.elements.place);

        tripDetails.innerHTML = `Country(ies): ${[...form.elements.countrySelectInput.selectedOptions].map(
                                            country => country.value
                                        )};
                                Places: ${placesArray.reduce(
                                    (result, place) => {
                                        const currentPlace = place.disabled ? null : place.offsetParent;
                                        return currentPlace && place.checked ?
                                            result +=`${place.offsetParent.innerText}, ` : 
                                            result;
                                    }, ''
                                ) || null}`;
            
        const guideFeedback = document.createElement('li');
        const guideFeedbacksArray = Array.from(form.elements.guideFeedbackRange);
        guideFeedback.innerHTML = `Guide value: ${guideFeedbacksArray.reduce(
            (result, currentValue, i) => 
                result += `${i + 1}) ${currentValue.disabled ? null : currentValue.value + '%'} `, ''
        ) || null}`;

        const gallery = document.createElement('li');
        const images = Array.from(form.elements.galleryInput.files);
        gallery.innerHTML = `Image: ${images.reduce(
            (result, image, i) => result += `${i + 1}) ${image.name} `, ''
        )}`;

        const feedback = document.createElement('li');
        feedback.innerHTML = `Feedback: ${form.elements.feedbackInput.value}`;

        dialog.append(impression, userData, contacts, tripDetails,
                    guideFeedback, gallery, feedback);

        dialog.classList.add('visible');
    }
})