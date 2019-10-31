const inputs = [
    {name: 'impressionInput'},
    {name: 'tel'},
    {name: 'email'},
    {name: 'tripDateInput'},
    {name: 'countrySelectInput'},
    {name: 'galleryInput'},
    {name: 'feedbackInput'}
]
const elements = form.elements;
const errorMsg = document.createElement('div');
errorMsg.innerText = 'Поле обязательно к заполнению';
errorMsg.classList.add('error-msg')

const showErrorMsg = element => {
    const isErrorMsgAlreadyExsist = !!element.querySelector('.error-msg');

    console.log(element, 'error', isErrorMsgAlreadyExsist)

    if(!isErrorMsgAlreadyExsist){
        element.appendChild(errorMsg.cloneNode(true));
    }

    return false;
}

const deleteErrorMsg = element => {
    const isErrorMsgExsist = !!element.querySelector('.error-msg');

    if(isErrorMsgExsist){
        element.removeChild(element.querySelector('.error-msg'))
    }

    return true;
}

const validate = (element = null) => {
    if(element === null){
        const result = inputs.map(
            input => validate(input)
        )
        return result.every(el => el);
    }

    switch(element.name){
        case('impressionInput'):
            const isImpressionFilled = elements.impressionInput.value === 0 || 
                !!elements.impressionInput.value;
            
            return isImpressionFilled ? 
                deleteErrorMsg(elements.impression) :
                showErrorMsg(elements.impression);
        case('userDataInput'):
            const isUserInfoFilled = Array.from(elements.userDataInput).every(
                input => input.value
            );

            return isUserInfoFilled ?
                deleteErrorMsg(elements.userData) :
                showErrorMsg(elements.userData);
        case('tel'):
            const isTelFilled = !!elements.tel.value;

            return isTelFilled ?
                deleteErrorMsg(elements.contacts) :
                showErrorMsg(elements.contacts);
        case('email'):
            const isEmailFilled = !!elements.email.value

            return isEmailFilled ?
                deleteErrorMsg(elements.contacts) :
                showErrorMsg(elements.contacts);
        case('tripDateInput'):
            const isDateFilled = !!elements.tripDateInput.value
            
            return isDateFilled ?
                deleteErrorMsg(elements.tripDate) :
                showErrorMsg(elements.tripDate);
        case('countrySelectInput'):
            const countries = [...elements.countrySelectInput.selectedOptions].map(
                country => country.value
            )
            const areCountriesFilled = !!countries[0];
            return areCountriesFilled ?
                deleteErrorMsg(elements.countrySelect) :
                showErrorMsg(elements.countrySelect);
        case('galleryInput'):
            const isGalleryFilled = !!elements.galleryInput.files.length;

            return isGalleryFilled ?
                deleteErrorMsg(elements.gallery) :
                showErrorMsg(elements.gallery);
        case('feedbackInput'):
            const isFeedbackFilled = !!elements.feedbackInput.value;

            return isFeedbackFilled ?
                deleteErrorMsg(elements.feedback) :
                showErrorMsg(elements.feedback);
        default:
            console.log(`${element.name} doesn't needed in your goddamn validation`);
            return true
    }
}

export default validate;