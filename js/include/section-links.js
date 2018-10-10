import 'core-js/es6/promise';
import $ from "jquery";
import debounce from 'lodash-es/debounce';
import throttle from 'lodash-es/throttle';
import support from '../utils/support';

const HEADER_WIDTH = 55;
//const MOBILE_WIDTH = 959;

const $win = $(window);
const $doc = $(document);
const $htmlBody = $('html, body');
const $body = $('body');
const $sections = $('[data-section]');
const $hashSections = $('[data-section], [data-section-hash]');
const $sectionLinks = $('[data-section-link]');
let activeHashSectionIndex;
let isScrollAnimated = 0;

const throttledUpdateHash = throttle(updateHash, 1000);
function updateHash() {
    const $activeSection = $hashSections.eq(activeHashSectionIndex);
    const activeSectionName = activeHashSectionIndex ? ($activeSection.attr('data-section') || $activeSection.attr('data-section-hash')) : '';
    if (window.location.hash.substr(1) !== activeSectionName) {
        // change hash without browser native scroll
        // const sectionEl = document.getElementById(activeSectionName);
        // sectionEl.id = activeSectionName+'-tmp';
        // window.location.hash = activeSectionName;
        // sectionEl.id = activeSectionName;
        if (activeSectionName) {
            window.history.replaceState(window.history.state, null, '#' + activeSectionName);
        } else {
            window.history.replaceState(window.history.state, null, window.location.pathname);
        }
    }
}


export default function initSectionLinks(headerMenu) {
    const debouncedCheckActiveLink = debounce(checkActiveLink, 100);
    window.addEventListener('scroll', checkActiveLink, support.passiveListener ? {passive: true} : false);
    window.addEventListener('resize', debouncedCheckActiveLink, support.passiveListener ? {passive: true} : false);
    window.addEventListener('orientationchange', debouncedCheckActiveLink, support.passiveListener ? {passive: true} : false);

    // скролл до секции по клику на [data-section-link]
    $sectionLinks.on('click', function (e) {
        e.preventDefault();
        const targetName = $(this).attr('data-section-link');
        const $targetSection = $(`[data-section="${targetName}"]`);
        if (headerMenu.getIsOpened()) {
            headerMenu.$header.one('headerCloseStartAnimation', function() {
                waitBody().then(() => {
                    scrollToSection($targetSection);
                });
            });
            headerMenu.hide();
        } else {
            scrollToSection($targetSection);
        }
    });

    // Скролл до секции при открытии страницы по хэшу
    const hashName = location.hash.substr(1);
    const $targetSection  = $(`[data-section="${hashName}"], [data-section-hash="${hashName}"]`);
    if ($targetSection.length) {
        setTimeout(function () {
            scrollToSection($targetSection, true);
        }, 200);
    } else {
        // установка классов при открытии
        checkActiveLink();
    }
}


function scrollToSection($targetSection, instant) {
    let targetOffset = $targetSection.offset().top - HEADER_WIDTH + 4;
    targetOffset = Math.max(targetOffset, 0);
    targetOffset = Math.min(targetOffset, $doc.outerHeight() - $win.height());
    setActiveLinkClass($targetSection);
    setActiveHash($targetSection, true);
    isScrollAnimated++;
    if (instant) {
        window.scrollTo(0, targetOffset);
        // откладываем до выполнения пассивного листенера на скролле
        setTimeout(() => {
            isScrollAnimated--;
        }, 100);
    } else {
        const distance = targetOffset - $win.scrollTop();
        const time = 300 + Math.pow(Math.abs(distance), 0.6);
        $htmlBody.animate({scrollTop: targetOffset}, time);
        // откладываем до выполнения пассивного листенера на скролле
        setTimeout(() => {
            isScrollAnimated--;
        }, time + 100);
    }
}

function checkActiveLink() {
    if (isScrollAnimated) {
        return;
    }
    const scrollTop = $win.scrollTop();
    const windowCenter = scrollTop + $win.height() * 0.4;
    const activeIndex = findActiveByBottom(windowCenter, $sections);
    const $activeSection = $sections.eq(activeIndex);
    setActiveLinkClass($activeSection);
    const activeHashIndex = findActiveByBottom(windowCenter, $hashSections);
    setActiveHash(activeHashIndex);
}

function setActiveLinkClass($activeSection) {
    const activeSectionName = $activeSection.attr('data-section');
    $sectionLinks.removeClass('is-active is-active-disabled').filter(`[data-section-link="${activeSectionName}"]`).addClass('is-active');
}
function setActiveHash(index, instant) {
    if (typeof index === 'object') {
        // convert jquery object to index
        index = $hashSections.index(index);
    }
    activeHashSectionIndex = index;
    if (instant) {
        updateHash();
    } else {
        throttledUpdateHash();
    }

}

/**
 * Секция включает в себя область от своего начала до начала следующей секции, ищем попадание центра окна в область секции
 * @param {number} windowCenter
 * @param {jQuery} $sectionList
 * @return {number}
 */
function findActiveByBottom(windowCenter, $sectionList) {
    const sectionsPos = new SectionPos($sectionList);
    let activeIndex;

    $sectionList.each(function(index, section) {
        if (windowCenter >= sectionsPos.get(index) && windowCenter <= sectionsPos.get(index + 1)) {
            activeIndex = index;
            //return false;
        }
    });

    return activeIndex;
}

function SectionPos($sectionList) {
    const positions = [];

    /**
     * @param index
     * @return {number} section's offset top
     */
    this.get = function(index) {
        if (typeof positions[index] === 'undefined') {
            if (index === 0) {
                positions[index] = 0;
            } else if (index === $sectionList.length) {
                positions[index] = $doc.outerHeight();
            } else {
                positions[index] = $sectionList.eq(index).offset().top;
            }
        }

        return positions[index];
    }

}

function waitBody () {
    if (!isBodyTranslated()) {
        return Promise.resolve();
    } else {
        return new Promise((resolve) => {
            let interval = setInterval(() => {
                if (!isBodyTranslated()) {
                    clearInterval(interval);
                    resolve();
                }
            }, 50);
        });
    }
}

function isBodyTranslated() {
    return parseInt($body.css('margin-top'), 10)
}



/**
 * Ищет дистанцию между центром окна и центром секции, возвращает индекс секции с меньшей дистанцией
 * @param windowCenter
 * @return {number}
 */
// function findActiveByCenter(windowCenter) {
//     const deltas = [];
//     $sections.each(function (index, section) {
//         const $thisSection = $(section);
//         const sectionCenter = $thisSection.offset().top + $thisSection.outerHeight() / 2;
//         deltas[index] = Math.abs(windowCenter - sectionCenter);
//     });
//     const minDelta = Math.min.apply(null, deltas);
//
//     return deltas.indexOf(minDelta);
// }

