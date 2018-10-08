import $ from 'jquery';
import debounce from 'lodash-es/debounce';

export default function HeaderMenu() {
    const $win = $(window);
    const $body = $('body');

    let isAnimating = false;
    let isOpened = false;
    let menuHeight = 0;
    let scrollBarWidth = 0;
    let modalScrollPos;
    const animationShowDuration = 450;
    const animationHideDuration = 350;
    const breakpoint = 960;


    // init
    let $header = $('[data-header]');
    let $headerContainer = $('[data-header-container]');
    let $headerLogo = $('[data-header-logo]');
    let $headerMenu = $('[data-header-menu]');
    let $headerButton = $('[data-header-button]');

    $headerButton.on('click', () => {
        if (isOpened) {
            _hide();
        } else {
            _show();
        }
    });

    _recalculate();
    $win.on('resize', debounce(() => {
        if ($win.width() >= breakpoint) {
            _hide();
        }
        _recalculate();
    }, 50));


    // Public API

    this.$header = $header;

    this.hide = _hide;

    this.show = _show;

    this.getIsOpened = () => {
        return isOpened;
    };

    this.getIsAnimating = () => {
        return isAnimating;
    };




    function _commonToggle() {
        isAnimating = true;
        setTimeout(() => {
            isAnimating = false;
        }, isOpened ? animationHideDuration : animationShowDuration);

        $headerButton.toggleClass('is-active');
        $headerMenu.toggleClass('is-active');
    }

    function _show() {
        if (isOpened || isAnimating) {
            return;
        }
        $header.trigger('headerOpenStart');
        _commonToggle();
        // фиксация положения экрана
        //@TODO переделать на html {overflow: hidden}, когда починят баг в сафари
        //@see https://bugs.webkit.org/show_bug.cgi?id=153856
        $headerMenu.css('min-height', menuHeight);
        modalScrollPos = {x: window.pageXOffset, y: window.pageYOffset};
        scrollBarWidth = window.innerWidth - $body.width();
        let headerCss = {position: 'fixed', height: '100%', 'overflow-y': 'scroll'};
        if (scrollBarWidth > 0) {
            headerCss['overflow-y'] = 'scroll';
        } else {
            headerCss.overflow = 'auto';
        }
        $headerContainer.css(headerCss);
        $body.css({width: window.innerWidth - scrollBarWidth, height: window.innerHeight, position: 'fixed', 'margin-top': modalScrollPos.y * -1, 'overflow-y': 'visible'});
        $headerContainer.addClass('header--menu-active header--menu-animate-in');
        $header.trigger('headerOpenStartAnimation');
        setTimeout(() => {
            $headerContainer.removeClass('header--menu-animate-in');
            $header.trigger('headerOpened');
        }, animationShowDuration);
        isOpened = true;
    }

    function _hide() {
        if (!isOpened || isAnimating) {
            return;
        }
        $header.trigger('headerCloseStart');
        _commonToggle();
        //@TODO не учитывается ресайз
        $body.css({width: '', height: '', position: '', 'margin-top': '', 'overflow-y': ''});
        $headerContainer.css({overflow: ''}).addClass('header--menu-animate-out');
        window.scrollTo(modalScrollPos.x, modalScrollPos.y);
        $header.trigger('headerCloseStartAnimation');
        setTimeout(() => {
            $headerMenu.css({'min-height': ''});
            $headerContainer.css({position: '', height: ''}).removeClass('header--menu-active header--menu-animate-out');
            $header.trigger('headerClosed');
        }, animationHideDuration);
        isOpened = false;
    }

    function _recalculate() {
        menuHeight = window.innerHeight - $headerLogo.outerHeight();
        if (isOpened) {
            $headerMenu.css('min-height', menuHeight);
            $body.css({width: window.innerWidth - scrollBarWidth, height: window.innerHeight});
        }
    }
}

