"use strict";

import axios from 'axios';

let psLoadingEl = document.querySelector('[data-ps-loading]');
let submitUrl = process.env.APP_PS_API_URL + '/api/v1/subscribers/confirm';

axios.post(submitUrl, {code: window.location.search.replace('?code=', '')})
    .then((response) => {
        showSuccess();
        psLoadingEl.classList.add('u-hidden');
    })
    .catch((error) => {
        if (error.response && error.response.data.error.message) {
            // other server error
            showFormError(error.response.data.error.message)
        } else {
            // network error
            showFormError(error.message)
        }
        psLoadingEl.classList.add('u-hidden');
    });

function showSuccess() {
    let psFormSuccessEl = document.querySelector('[data-ps-success]');
    psFormSuccessEl.classList.remove('u-hidden');
}

let psFormErrorEl = document.querySelector('[data-ps-form-error]');
function showFormError(message) {
    psFormErrorEl.textContent = message;
    psFormErrorEl.classList.remove('u-hidden');
}
