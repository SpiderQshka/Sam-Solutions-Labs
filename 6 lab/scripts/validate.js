const validate = () => {
    const elements = form.elements;
    const errorMsg = document.createElement('div');
    errorMsg.innerText = 'Поле обязательно к заполнению';
    errorMsg.classList.add('error-msg')
    
    const isImpressionFilled = () => {
        if(elements.impressionInput.value === 0 || 
            !!elements.impressionInput.value){
                return true;
            }
        elements.impression.appendChild(errorMsg.cloneNode(true));
        return false;
    }

    const isUserInfoFilled = () => {
        const isFilled = Array.from(elements.userDataInput).every(
            input => input.value
        );
        if(isFilled){
            return true;
        }
        elements.userData.appendChild(errorMsg.cloneNode(true));
        return false;
    }

    const areContactsFilled = () => {
        const isFilled = Array.from(elements.contacts).every(
            input => input.value
        );
        if(isFilled){
            return true;
        }
        elements.contacts.appendChild(errorMsg.cloneNode(true));
        return false;
    } 

    const areTripDetailsFilled = () => {
        const isFilled = !!(elements.tripDate.value && elements.countrySelect.value);
        if(isFilled){
            return true;
        }
        elements.tripDetails.appendChild(errorMsg.cloneNode(true));
        return false;
    };

    // const areGuideFeedbackFilled = Array.from(elements.guideFeedbackInput).some(
    //     input => !!input.value
    // )

    // console.log(elements.guideFeedbackInput)

    // if(!areGuideFeedbackFilled){
    //     elements.guideFeedback.appendChild(errorMsg.cloneNode(true));
    // }

    const isGalleryFilled = () => {
        const isFilled = !!elements.galleryInput.files.length;
        if(isFilled){
            return true;
        }
        elements.gallery.appendChild(errorMsg.cloneNode(true));
        return false;
    };

    const isFeedbackFilled = () => {
        const isFilled = !!elements.feedbackInput.value;
        if(isFilled){
            return true;
        }
        elements.feedback.appendChild(errorMsg.cloneNode(true));
        return false;
    };

    return {
        // isImpressionFilled,
        isUserInfoFilled,
        areContactsFilled,
        areTripDetailsFilled,
        // areGuideFeedbackFilled,
        isGalleryFilled,
        isFeedbackFilled
    }
}

export default validate;