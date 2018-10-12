"use strict";

import clickBlur from './include/click-blur';
import redirectPreferredLocale from './include/locale-preferred';
import initActiveLocale from './include/locale-active';
import initDropdown from './include/dropdown';
import './include/track';


(() => {
    const isRedirected = redirectPreferredLocale();

    if (isRedirected) {
        return;
    }


    /**
     * Active locale
     * Before question response
     */
    initActiveLocale();


    /**
     * Dropdown
     */
    initDropdown();

    // start listening click
    clickBlur();
})();
