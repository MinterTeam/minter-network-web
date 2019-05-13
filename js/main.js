import $ from 'jquery';
import debounce from 'lodash-es/debounce';
import 'jquery-inline-svg';
import support from './utils/support';
// import initAb from './include/ab';
import HeaderMenu from './include/header-menu';
import sectionLinks from './include/section-links';

// init AB test
// initAb();


/**
 * Inline svg
 */
$('[data-inline-svg]').inlineSvg();


/**
 * Header menu
 */
const headerMenu = new HeaderMenu();
const $navPanel = $('[data-nav-panel]');
headerMenu.$header.on('headerOpenStart', () => {
    $navPanel.addClass('is-hidden')
});
headerMenu.$header.on('headerCloseStart', () => {
    $navPanel.removeClass('is-hidden')
});
setTimeout(() => {
    setHeaderTopProperty();
}, 3000);
const debouncedSetHeaderTopProperty = debounce(setHeaderTopProperty, 50);
window.addEventListener('scroll', setHeaderTopProperty, support.passiveListener ? {passive: true} : false);
window.addEventListener('resize', debouncedSetHeaderTopProperty, support.passiveListener ? {passive: true} : false);
window.addEventListener('orientationchange', debouncedSetHeaderTopProperty, support.passiveListener ? {passive: true} : false);
function setHeaderTopProperty() {
    if (headerMenu.getIsAnimating() || headerMenu.getIsOpened()) {
        return;
    }
    document.documentElement.style.setProperty('--header-top', (headerMenu.$header[0].offsetTop - window.scrollY) + 'px');
}


/**
 * Section links
 */
sectionLinks(headerMenu);

