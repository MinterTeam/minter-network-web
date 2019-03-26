export default function initAb() {
    const gtag = getGtag();
    const caseNumber = randomInteger(1, 3);
    const currentPromotion = {
        id: `ab_panel_launch_sale_${caseNumber}`,
        name: `ab_panel_launch_sale_${caseNumber}`,
    };

    // show panel
    document.querySelectorAll(`[data-ab-panel="${caseNumber}"]`).forEach((el) => {
        el.classList.remove('u-hidden');
    });
    document.querySelector(`[data-ab-panel-button="${caseNumber}"]`).classList.remove('u-hidden');

    // promo was showed
    gtag('event', 'view_promotion', {
        promotions: [currentPromotion]
    });

    // send on click
    const buttonEl = document.querySelector(`[data-ab-panel-button]`);
    buttonEl.addEventListener('click', handlePromoClick);

    function handlePromoClick() {
        gtag('event', 'select_content', {
            promotions: [currentPromotion]
        });
        // disable double click
        buttonEl.removeEventListener('click', handlePromoClick);
    }
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

function getGtag() {
    if (typeof window.gtag === 'function') {
        return window.gtag;
    }

    let delayedList = [];
    let isGtagResolved = false;

    // wait for gtag loaded
    let waitInterval = setInterval(() => {
        // when gtag finally loaded
        if (typeof window.gtag === 'function') {
            // set flag
            isGtagResolved = true;
            // run all postponed calls
            delayedList.forEach((argumentsItem) => {
                window.gtag(...argumentsItem);
            });
            // stop polling
            clearInterval(waitInterval);
        }
    }, 1000);

    return function () {
        if (isGtagResolved) {
            // call gtag if it is loaded
            window.gtag(...arguments);
        } else {
            // or store arguments to call gtag later
            delayedList.push(arguments);
        }
    }
}
