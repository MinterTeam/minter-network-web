import Swiper from 'swiper';
import debounce from 'lodash-es/debounce';



/**
 * Use cases
 */

let useCasesSlider = initSlider();
let $win = $(window);
let lastSliderSize = getSliderSize();
$win.on('resize', debounce(() => {
    let newSliderSize;
    newSliderSize = getSliderSize();
    // reinit slider to apply options from `breakpoint` prop
    if (newSliderSize !== lastSliderSize) {
        useCasesSlider.destroy();
        $('[data-team-slider] .swiper-wrapper').css({height: ''});
        useCasesSlider = initSlider();
        lastSliderSize = newSliderSize;
    }
}, 200));
function initSlider() {
    return new Swiper('[data-team-slider]', {
        prevButton: '[data-swiper-prev]',
        nextButton: '[data-swiper-next]',
        // pagination: '[data-swiper-pagination]',
        speed: 450,
        spaceBetween: 40,
        slidesPerView: 3,
        // paginationClickable: true,
        grabCursor: true,
        loop: true,
        autoHeight: false,
        breakpoints: {
            699: {
                slidesPerView: 2,
                spaceBetween: 30,
                autoHeight: true,
            },
            449: {
                slidesPerView: 1,
                spaceBetween: 20,
                autoHeight: true,
            },
        },
    });
}
function getSliderSize() {
    return $win.width() <= 699 ? 'small': 'large'
}
