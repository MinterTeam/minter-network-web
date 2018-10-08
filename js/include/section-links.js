import 'core-js/es6/promise';
import $ from "jquery";
import debounce from 'lodash-es/debounce';
import support from '../utils/support';

const HEADER_WIDTH = 55;
//const MOBILE_WIDTH = 959;

const $win = $(window);
const $doc = $(document);
const $htmlBody = $('html, body');
const $body = $('body');
const $sections = $('[data-section]');
const $sectionLinks = $('[data-section-link]');
let activeSectionName;
let isScrollAnimated = false;


export default function initSectionLinks(headerMenu) {
    const debouncedCheckActiveLink = debounce(checkActiveLink, 50);
    window.addEventListener('scroll', checkActiveLink, support.passiveListener ? {passive: true} : false);
    window.addEventListener('resize', debouncedCheckActiveLink, support.passiveListener ? {passive: true} : false);
    window.addEventListener('orientationchange', debouncedCheckActiveLink, support.passiveListener ? {passive: true} : false);

    // установка классов при открытии
    checkActiveLink(null, {y: $win.scrollTop()});

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
    const $targetSection  = $(`[data-section="${hashName}"], [data-section-disabled="${hashName}"]`);
    if ($targetSection.length) {
        setTimeout(function () {
            scrollToSection($targetSection, true);
        }, 200);
    }
}


function scrollToSection($targetSection, instant) {
    let targetOffset = $targetSection.offset().top - HEADER_WIDTH + 4;
    targetOffset = Math.max(targetOffset, 0);
    targetOffset = Math.min(targetOffset, $doc.outerHeight() - $win.height());
    if (instant) {
        window.scrollTo(0, targetOffset);
    } else {
        const distance = targetOffset - $win.scrollTop();
        const time = 300 + Math.pow(Math.abs(distance), 0.6);
        isScrollAnimated = true;
        setActiveLinkClass($targetSection);
        $htmlBody.animate({scrollTop: targetOffset}, time, function () {
            // откладываем до выполнения пассивного листенера на скролле
            setTimeout(() => {
                isScrollAnimated = false;
            });
        });
    }

}

function checkActiveLink() {
    if (isScrollAnimated) {
        return;
    }
    const scrollTop = $win.scrollTop();
    const windowCenter = scrollTop + $win.height() * 0.4;
    const activeIndex = findActiveByBottom(windowCenter);
    const $activeSection = $sections.eq(activeIndex);
    setActiveLinkClass($activeSection);
}

function setActiveLinkClass($activeSection) {
    activeSectionName = $activeSection.attr('data-section');
    $sectionLinks.removeClass('is-active is-active-disabled').filter(`[data-section-link="${activeSectionName}"]`).addClass('is-active');
}

/**
 * Секция включает в себя область от своего начала до начала следующей секции, ищем попадание центра окна в область секции
 * @param windowCenter
 * @return {number}
 */
function findActiveByBottom(windowCenter) {
    const sectionsPos = new SectionPos();
    let activeIndex;

    $sections.each(function(index, section) {
        if (windowCenter >= sectionsPos.get(index) && windowCenter <= sectionsPos.get(index + 1)) {
            activeIndex = index;
            //return false;
        }
    });

    return activeIndex;
}

function SectionPos() {
    const positions = [];

    /**
     * @param index
     * @return {number} section's offset top
     */
    this.get = function(index) {
        if (typeof positions[index] === 'undefined') {
            if (index === 0) {
                positions[index] = 0;
            } else if (index === $sections.length) {
                positions[index] = $doc.outerHeight();
            } else {
                positions[index] = $sections.eq(index).offset().top;
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

