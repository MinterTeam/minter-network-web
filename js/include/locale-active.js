import $ from 'jquery';
import Cookies from 'js-cookie';
import {LANGUAGE_COOKIE_KEY} from './variables';
const locales = process.env.LOCALES;

export default function initActiveLocale() {
    const localeUrlSegment = window.location.pathname.split('/')[1];
    // check that url segment is locale segment, otherwise it's default locale
    const currentLocalePrefix = locales[localeUrlSegment] ? locales[localeUrlSegment].prefix : '';
    const currentLocale = Object.keys(locales).find((code) => locales[code].prefix === currentLocalePrefix);

    $('[data-dropdown]').each(function () {
        const $dropdown = $(this);

        const $currentLocaleEl = $dropdown.find(`[data-locale="${currentLocale}"]`);
        if ($currentLocaleEl.index() !== 0) {
            $currentLocaleEl.insertBefore($('[data-locale]').eq(0));
        }
        const $currentLocaleIcon = $currentLocaleEl.find('[data-locale-icon]');
        $dropdown.find('[data-locale-active]').attr('src', $currentLocaleIcon.attr('src')).attr('srcset', $currentLocaleIcon.attr('srcset'));

        $dropdown.find('[data-locale]').each(function () {
            const $localeLink = $(this);
            const localeCode = $localeLink.attr('data-locale');
            const localePrefix = locales[localeCode].prefix;
            // set correct link href
            const basePath = currentLocalePrefix ? window.location.pathname.replace(new RegExp('^\/' + currentLocalePrefix), '') : window.location.pathname;
            const localePath = localePrefix ? ('/' + localePrefix + basePath) : (basePath ? basePath : '/');
            $localeLink.attr('href', localePath);

            $localeLink.on('click', function () {
                if (currentLocale !== localeCode) {
                    const date = new Date();
                    Cookies.set(LANGUAGE_COOKIE_KEY, localeCode, {
                        expires: new Date(date.setDate(date.getDate() + 365)),
                        domain: window.location.host.split('.').slice(-2).join('.').replace(/:\d+$/, ''),
                    });
                    // force link location change, since default behavior is prevented
                    //@TODO remove when bug will be fixed see https://github.com/material-components/material-components-web/issues/3486
                    window.location.href = localePath;
                }
            });
        });
    });
}
