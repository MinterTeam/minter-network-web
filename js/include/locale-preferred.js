import Cookies from 'js-cookie';
import {LANGUAGE_COOKIE_KEY} from './variables';

const locales = process.env.LOCALES;

export default function redirectPreferredLocale() {
    const localeUrlSegment = window.location.pathname.split('/')[1];

    // check that url segment is locale segment, otherwise it's default locale
    const currentLocalePrefix = locales[localeUrlSegment] ? localeUrlSegment : '';
    const currentLocale = Object.keys(locales).find((code) => locales[code].prefix === currentLocalePrefix);

    if (window.location.pathname === '/') {
        // redirect to preferred locale (only from root page)
        const preferredLocale = Cookies.get(LANGUAGE_COOKIE_KEY);
        if (preferredLocale && preferredLocale !== currentLocale && locales[preferredLocale]) {
            let path = window.location.pathname;
            // remove old prefix
            if (currentLocalePrefix) {
                path = path.replace('/' + currentLocalePrefix, '');
            }
            // add new prefix
            const preferredLocalePrefix = locales[preferredLocale].prefix;
            if (preferredLocalePrefix) {
                path = '/' + preferredLocalePrefix + path;
            }
            window.location.href = window.location.protocol + '//' + window.location.host + path + window.location.search;
            return true;
        }
    } else {
        // set preferred locale from page url
        const date = new Date();
        Cookies.set(LANGUAGE_COOKIE_KEY, currentLocale, {
            expires: new Date(date.setDate(date.getDate() + 365)),
            domain: window.location.host.split('.').slice(-2).join('.').replace(/:\d+$/, ''),
        });
    }

}
