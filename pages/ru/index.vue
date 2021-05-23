<script>
import {getStatus} from '~/api/status.js';
import {HOST} from '~/assets/variables.js';
import {prettyRound} from '~/assets/utils.js';
import Language from '~/layouts/_language.vue';

export default {
    components: {
        Language,
    },
    head() {
        const title = 'Minter 2 — Маркетплейс цифровых активов';
        const description = 'Ваша единая точка доступа к крупнейшим цифровым валютам и активам — покупайте, продавайте, отправляйте и тратьте BTC, ETH, BIP, USDC, золото, нефть, акции и тысячи других.';
        // const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

        return {
            title: title,
            meta: [
                { hid: 'og-title', name: 'og:title', content: title },
                { hid: 'description', name: 'description', content: description },
                { hid: 'og-description', name: 'og:description', content: description },
                { hid: 'og-image', name: 'og:image', content: `/social-share-2.png` },
            ],
            link: [
                { rel: 'canonical', href: `${HOST}`},
            ],
        };
    },
    data() {
        return {
            stats: null,
        };
    },
    beforeMount() {
        getStatus()
            .then((data) => {
                this.stats = data;
            })
    },
    methods: {
        prettyRound,
    },
}
</script>

<template>
    <div>
        <div class="u-container u-container--full index-language">
            <language class="" :locales='[{"code":"","name":"English"},{"code":"ru","name":"Russian"}]' lang="ru" :push="true"/>
        </div>
        <div class="u-container index-section">
            <section class="index-intro">
                <div class="index-intro__content">
                    <img class="index-intro__logo" src="/img/minter-logo.svg" alt="Minter" width="133" height="42">
                    <h1 class="index-intro__title">Маркетплейс цифровых активов</h1>
                    <p>Ваша единая точка доступа к крупнейшим цифровым валютам и активам — покупайте, продавайте, отправляйте и тратьте BTC, ETH, BIP, USDC, золото, нефть, акции и тысячи других.</p>
                    <a class="u-mt-15 button button--main" href="/ru/how-to-buy-and-sell-bip">Купить BIP</a>
                </div>
                <div class="index-intro__assets-wrap">
                    <img class="index-intro__assets" src="/img/index-assets.png" srcset="/img/index-assets@2x.png 2x" alt="" role="presentation">
                </div>
            </section>

            <hr class="hr--divider">

            <h2 class="u-h2 u-mb-05">Кратко о Minter</h2>
            <p>Minter — это DPoS-блокчейн, а значит, все транзакции безопасны, анонимны и финальны. Лишь вы решаете, как распоряжаться своими активами, и никто не может ограничивать, блокировать или изменять их.</p>

            <hr class="hr--divider" v-if="stats">

            <div class="index-numbers u-grid u-grid--xlarge u-grid--vertical-margin" v-if="stats">
                <div class="index-numbers__item u-cell u-cell--auto">
                    <div class="index-numbers__value">{{ stats.activeValidators }}</div>
                    <div class="index-numbers__caption">Валидаторы</div>
                </div>
                <div class="index-numbers__item u-cell u-cell--auto">
                    <div class="index-numbers__value">{{ prettyRound(stats.delegatorsCount) }}</div>
                    <div class="index-numbers__caption">Делегаторы</div>
                </div>
                <div class="index-numbers__item u-cell u-cell--auto">
                    <div class="index-numbers__value">{{ prettyRound(stats.nonZeroAddressesCount) }}</div>
                    <div class="index-numbers__caption">Адреса с ненулевым балансом</div>
                </div>
            </div>

            <hr class="hr--divider">

            <h2 class="u-h2 u-mb-05">Интернет денег</h2>
            <p>Все работает со скоростью света и при низких комиссиях: перевод занимает всего 5 секунд и стоит 1 цент. Независимо от объема, трейды всегда будут стоить 3 цента + 0.2%, которые распределяются между поставщиками ликвидности.</p>

            <hr class="hr--divider">

            <h2 class="u-h2 u-mb-05">Просто</h2>
            <p class="u-mb-15">Выбирайте любой из трех кошельков, чтобы управлять своими активами:</p>
            <div class="u-grid u-grid--vertical-margin">
                <div class="u-cell u-cell--medium--1-3">
                    <div class="index-wallets__item">
                        <a class="index-wallets__link link--default" href="https://wallet.minter.org" target="_blank">
                            <img class="index-wallets__icon" src="/img/index-wallet-minter.png" srcset="/img/index-wallet-minter@2x.png 2x" alt="" role="presentation">
                            <div class="index-wallets__title">Minter Wallet</div>
                        </a>
                        <p class="index-wallets__description">Для начала работы достаточно иметь электронную почту</p>
                    </div>
                </div>
                <div class="u-cell u-cell--medium--1-3">
                    <div class="index-wallets__item">
                        <a class="index-wallets__link link--default" href="https://bip.to" target="_blank">
                            <img class="index-wallets__icon" src="/img/index-wallet-bip.png" srcset="/img/index-wallet-bip@2x.png 2x" alt="" role="presentation">
                            <div class="index-wallets__title">Bip Wallet</div>
                        </a>
                        <p class="index-wallets__description">Наше полу-профессиональное решение, поддерживающее iOS, Android и Web</p>
                    </div>
                </div>
                <div class="u-cell u-cell--medium--1-3">
                    <div class="index-wallets__item">
                        <a class="index-wallets__link link--default" href="https://console.minter.network" target="_blank" rel="noopener">
                            <img class="index-wallets__icon" src="/img/index-wallet-console.png" srcset="/img/index-wallet-console@2x.png 2x" alt="" role="presentation">
                            <div class="index-wallets__title">Minter Console</div>
                        </a>
                        <p class="index-wallets__description">Для наиболее продвинутых пользователей и бизнесов</p>
                    </div>
                </div>
            </div>

            <hr class="hr--divider">


            <h2 class="u-h2 u-mb-05">Роль найдется каждому</h2>
            <p class="u-mb-15">С точки зрения какой роли вам было бы интересно узнать о Minter подробнее?</p>
            <div class="u-grid u-grid--vertical-margin">
                <div class="u-cell u-cell--medium--1-3 u-cell--1-2">
                    <div class="u-fw-600">Койнер</div>
                    <p>Выпускайте и управляйте собственными монетами или токенами</p>
                </div>
                <div class="u-cell u-cell--medium--1-3 u-cell--1-2">
                    <div class="u-fw-600">Валидатор</div>
                    <p>Поддерживайте сеть, предоставляя инфраструктуру</p>
                </div>
                <div class="u-cell u-cell--medium--1-3 u-cell--1-2">
                    <div class="u-fw-600">Делегатор</div>
                    <p>Занимайтесь стейкингом, чтобы получать вознаграждения</p>
                </div>
                <div class="u-cell u-cell--medium--1-3 u-cell--1-2">
                    <div class="u-fw-600">Поставщик ликвидности</div>
                    <p>Создавайте или присоединяйтесь к пулам ликвидности, чтобы зарабатывать на торговых комиссиях</p>
                </div>
                <div class="u-cell u-cell--medium--1-3 u-cell--1-2">
                    <div class="u-fw-600">Разработчик</div>
                    <p>Внедряйте активы в уже существующие проекты или стройте новые</p>
                </div>
                <div class="u-cell u-cell--medium--1-3 u-cell--1-2">
                    <div class="u-fw-600">Трейдер</div>
                    <p>Получайте прибыль с торгов (полностью децентрализованно)</p>
                </div>
            </div>


            <hr class="hr--divider">


            <h2 class="u-h2 u-mb-05">Что насчёт HUB?</h2>
            <p>
                <a class="link--default" href="https://coinmarketcap.com/currencies/minter-hub/" target="_blank" rel="noopener">HUB</a> — это нативный токен в блокчейне Minter Hub, который, в свою очередь, является мостом, соединяющим Minter с Ethereum и Binance Smart Chain. HUB — это PoS-токен, и все оракулы получают 1% комиссии от переводов между сетями. HUB также служит резервом в Uniswap-подобных пулах в Minter, Ethereum и Binance Smart Chain. Например, Uniswap <a class="link--default" href="https://info.uniswap.org/#/pools/0x27878ae7f961a126755042ee8e5c074ea971511f" target="_blank" rel="noopener">HUB-USDT</a>, Uniswap v2 <a class="link--default" href="https://v2.info.uniswap.org/pair/0x3796fee2b555DA1356cdcD3e1861263B351A58A0" target="_blank" rel="noopener">HUB-USDT</a>, Minter <a class="link--default" href="https://explorer.minter.network/pools/BIP/HUB" target="_blank">BIP / HUB</a>.
            </p>


            <hr class="hr--divider">


            <h2 class="u-h2 u-mb-20">Факты и ссылки</h2>

            <div class="u-grid u-grid--large u-grid--vertical-margin--large">
                <div class="u-cell u-cell--medium--1-2">
                    <img class="index-feature__icon" src="/img/feature-tools.svg" width="48" height="48" alt="" role="presentation">
                    <h2 class="index-feature__title u-h3">Собственные монеты и токены</h2>
                    <p class="index-feature__description">
                        Игровые кредиты, баллы лояльности, права доступа и достижения — все это может легко управляться при помощи набора таких инструментов, как кошельки (<a class="link--default" href="https://itunes.apple.com/ru/app/bip-wallet/id1457843214" target="_blank" rel="nofollow">iOS</a>,
                        <a class="link--default" href="https://play.google.com/store/apps/details?id=network.minter.bipwallet.mainnet" target="_blank" rel="nofollow">Android</a>,
                        <a class="link--default" href="https://wallet.bip.to/" target="_blank">Web</a><!--, <a class="link&#45;&#45;default" href="">Telegram bot</a>-->) и
                        <a class="link--default" href="https://console.minter.network/" target="_blank">консоль</a> или же
                        <a class="link--default" href="https://www.minter.network/docs#minter-sdks" target="_blank">SDK</a> и
                        <a class="link--default" href="https://www.minter.network/docs#node-api" target="_blank">API</a> для продвинутых интеграций.
                    </p>
                </div>
                <div class="u-cell u-cell--medium--1-2">
                    <img class="index-feature__icon" src="/img/feature-consensus.svg" width="48" height="48" alt="" role="presentation">
                    <h2 class="index-feature__title u-h3">Надежный алгоритм консенсуса</h2>
                    <p class="index-feature__description">Нативный utility-токен сети называется <nuxt-link class="link--default" to="/ru/how-to-buy-and-sell-bip">BIP</nuxt-link> и добывается <a class="link--default" href="https://github.com/MinterTeam/minter-go-node" target="_blank" rel="nofollow">валидаторами</a> (DPoS на базе Tendermint)</p>
                </div>
                <div class="u-cell u-cell--medium--1-2">
                    <img class="index-feature__icon" src="/img/feature-speed.svg" width="48" height="48" alt="" role="presentation">
                    <h2 class="index-feature__title u-h3">Очень высокая скорость</h2>
                    <p class="index-feature__description">Ваш перевод будет завершен всего за <a class="link--default" href="https://explorer.minter.network" target="_blank">5 секунд</a> и обойдется в 1 цент.</p>
                </div>
                <div class="u-cell u-cell--medium--1-2">
                    <img class="index-feature__icon" src="/img/feature-open.svg" width="48" height="48" alt="" role="presentation">
                    <h2 class="index-feature__title u-h3">Открытый исходный код</h2>
                    <p class="index-feature__description">Наш код основан на принципах краудсорсинга и публикуется на <a class="link--default" href="https://github.com/MinterTeam" target="_blank" rel="nofollow">GitHub</a> под открытыми лицензиями.</p>
                </div>
                <div class="u-cell u-cell--medium--1-2">
                    <img class="index-feature__icon" src="/img/feature-docs.svg" width="48" height="48" alt="" role="presentation">
                    <h2 class="index-feature__title u-h3">Детальная документация</h2>
                    <p class="index-feature__description">В <nuxt-link class="link--default" to="/docs">документации</nuxt-link> вы найдёте все, чтобы начать работать с блокчейном Minter, разрабатывать на нём сервисы и приложения или интегрировать Minter в процессы своей организации.</p>
                </div>
            </div>
            <hr class="hr--divider">
            <div class="">
                <img class="index-feature__icon" src="/img/feature-community.svg" width="48" height="48" alt="" role="presentation">
                <h2 class="index-feature__title u-h3">Отзывчивое сообщество</h2>
                <p class="index-feature__description">
                    Следите за нами в <a class="link--default" href="tg://resolve?domain=MinterTeam" target="_blank" rel="nofollow">Telegram</a>,
                    <a class="link--default" href="https://medium.com/@MinterTeam" target="_blank" rel="nofollow">Medium</a>,
                    <a class="link--default" href="https://twitter.com/MinterTeam" target="_blank" rel="nofollow">Twitter</a>,
                    <a class="link--default" href="https://www.facebook.com/MinterNetwork" target="_blank" rel="nofollow">Facebook</a> <br class="u-hidden-medium-down">
                    и вступайте в дискуссию в <a class="link--default" href="tg://join?invite=EafyERJSJZJ-nwH_139jLQ" target="_blank" rel="nofollow">Telegram</a>
                    и&nbsp;<a class="link--default" href="https://www.reddit.com/r/Minter/" target="_blank" rel="nofollow">Reddit</a>
                </p>
            </div>
        </div>
    </div>
</template>
