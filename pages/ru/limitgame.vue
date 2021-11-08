<script>
import {HOST} from '~/assets/variables.js';
import trackClick from '~/assets/v-track-click.js';
import Language from '~/layouts/_language.vue';

export default {
    layout: 'simple',
    components: {
        Language,
        // Footer,
    },
    directives: {
        trackClick,
    },
    fetchOnServer: false,
    head() {
        const title = 'Minter Limit Game';
        const description = 'Игра будет проходить в тестнете Минтера, правила максимально просты, но о них ты узнаешь позже.';
        // const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

        return {
            title: title ,
            meta: [
                { hid: 'og-title', name: 'og:title', content: title },
                { hid: 'description', name: 'description', content: description },
                { hid: 'og-description', name: 'og:description', content: description },
                { hid: 'og-image', name: 'og:image', content: `/img/limitgame1@2x.png` },
            ],
            link: [
                { rel: 'canonical', href: `${HOST}/limitgame`},
                { rel: 'stylesheet', href: '/limitgame/style.css', hid: 'limitgame-style'},
            ],
        };
    },
    mounted() {
        // move landing styles under global styles
        const style = document.querySelector('[data-hid="limitgame-style"]');
        if (!style) {
            return;
        }
        style.parentNode.removeChild(style);
        document.head.appendChild(style);
    },
};
</script>

<template>
    <div class="page--limitgame">
        <header>
            <div class="container">
                <div class="hello">
                    <picture>
                        <img src="/img/limitgame1.png" srcset="/img/limitgame1@2x.png 2x" alt="" class="hello-image" />
                    </picture>
                    <div class="hello-content">
                        <div class="logo"><img src="/img/minter-logo-white.svg" width="155" height="48" alt="Minter"></div>
                        <h1>Прими участие в <span>LIMIT GAME</span></h1>
                        <p>Игра будет проходить в тестнете Минтера, правила максимально просты, но о них ты узнаешь позже.</p>
                        <div class="button-block">
                            <a class="btn" href="https://forms.gle/TSGCHjvH5ZfnUwRM9">Участвовать</a>
                            <small>Регистрация открыта до 10 ноября 2021. Торопись!</small>
                        </div>
                        <div class="airdrop">
                            <p>Все активные участники игры, <b>вне зависимости от результата</b> получат аирдроп!</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>
