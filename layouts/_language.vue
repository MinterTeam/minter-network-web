<script>
    import {MDCMenu} from '@material/menu/index';
    // import Cookies from 'js-cookie';
    // import {LANGUAGE_COOKIE_KEY} from '~/assets/variables';

    const DEFAULT_LOCALE = 'en';

    export default {
        props: {
            locales: {
                type: Array,
                required: true,
            },
            lang: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
                mdcMenu: {
                    open: false,
                },
            };
        },
        computed: {
            localesFixed() {
                // set 'en' code for default locale
                return this.locales.map((locale) => {
                    return locale.code ? locale : {
                        ...locale,
                        code: DEFAULT_LOCALE,
                    };
                })
            },
            currentLocale() {
                const lang = this.lang || DEFAULT_LOCALE;
                return this.localesFixed.find((locale) => locale.code === lang) || {};
                // return this.$i18n.locales.find((locale) => locale.code === this.$i18n.locale);
            },
        },
        mounted() {
            this.mdcMenu = new MDCMenu(this.$el.querySelector('.mdc-menu'));
            this.mdcMenu.setAnchorMargin({top: -20, left: -16, right: -16});
        },
        beforeDestroy() {
            if (this.mdcMenu.destroy) {
                this.mdcMenu.destroy();
            }
        },
        methods: {
            setLang(lang) {
                lang = lang === DEFAULT_LOCALE ? '' : lang;
                this.$emit('update:lang', lang);
            }
            // switchLocaleCookie(localeCode) {
            //     this.$store.commit('SET_PREFERRED_LOCALE', localeCode);
            //     const date = new Date();
            //     Cookies.set(LANGUAGE_COOKIE_KEY, localeCode, {
            //         expires: new Date(date.setDate(date.getDate() + 365)),
            //         domain: window.location.host.split('.').slice(-2).join('.').replace(/:\d+$/, ''),
            //     });
            // },
        },
    };
</script>

<template>
    <div class="mdc-menu-surface--anchor">
        <button class="header__language-button u-semantic-button" @click="mdcMenu.open = true">
            <img class="header__language-button-icon" :src="`/img/icon-flag-${currentLocale.code}.png`" :srcset="`/img/icon-flag-${currentLocale.code}@2x.png 2x`" :alt="currentLocale.name" width="24" height="24">
        </button>
        <div class="mdc-menu mdc-menu-surface" tabindex="-1">
            <div class="mdc-menu__items mdc-list" role="menu" aria-hidden="true">
                <!-- current locale -->
                <button class="mdc-list-item u-semantic-button" @click="setLang(currentLocale.code)" type="button">
                    <span class="mdc-list-item__text header__language-text">{{ currentLocale.name }}</span>
                    <img class="mdc-list-item__meta" :src="`/img/icon-flag-${currentLocale.code}.png`" :srcset="`/img/icon-flag-${currentLocale.code}@2x.png 2x`" alt="" width="24" height="24" role="presentation">
                </button>
                <!--list of other locales -->
                <button class="mdc-list-item u-semantic-button"
                           v-for="locale in localesFixed"
                           :key="locale.code"
                           @click="setLang(locale.code)"
                           v-if="locale.code !== currentLocale.code"
                >
                    <span class="mdc-list-item__text header__language-text">{{ locale.name }}</span>
                    <img class="mdc-list-item__meta" :src="`/img/icon-flag-${locale.code}.png`" :srcset="`/img/icon-flag-${locale.code}@2x.png 2x`" alt="" width="24" height="24" role="presentation">
                </button>
            </div>
        </div>
    </div>
</template>
