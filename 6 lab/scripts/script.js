const form = document.getElementById('form');

// const fieldsets = {
//     impression: {
//         element: form.elements.impression
//     },
//     userData: {
//         element: form.elements.userData
//     },
//     contacts: {
//         element: form.elements.contacts
//     },
//     tripDetails: {
//         element: form.elements.tripDetails
//     },
//     guideFeedback: {
//         element: form.elements.guideFeedback
//     },
//     gallery: {
//         element: form.elements.gallery
//     },
//     feedback: {
//         element: form.elements.feedback
//     },
// }

const dialog = document.getElementById('dialog');
dialog.ondblclick = () => {
    dialog.style.display = 'none';
}

console.log(form.elements)

Array.from(form.elements.impressionInput).filter(el => el.checked)[0]

const impressionChange = v => {
    form.querySelector('#impessionRange').value = v;
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