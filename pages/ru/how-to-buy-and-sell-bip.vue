<script>
import prettyNum, {PRECISION_SETTING} from 'pretty-num';
import {getStatus} from '~/api/explorer.js';
import {getAveragePrice, getExchangePrice} from '~/api/bipchange.js';
import {getRankCmc, getRankCoingecko} from '~/api/rank.js';
import {prettyRound} from '~/assets/utils.js';
import {HOST} from '~/assets/variables.js';
import Language from '~/layouts/_language.vue';

export default {
    components: {
        Language,
    },
    fetchOnServer: false,
    fetch() {
        const bipPricePromise = getStatus()
            .then((status) => {
                this.bipPrice = status.bipPriceUsd;
                this.marketCap = status.marketCap;
            });

        const cmcRankPromise = getRankCmc()
            .then((rank) => {
                this.rank.cmc = rank;
            });

        const geckoRankPromise = getRankCoingecko()
            .then((rank) => {
                this.rank.coingecko = rank;
            });
        // const averagePricePromise = getAveragePrice()
        //     .then((price) => {
        //         this.averagePrice = price;
        //     });

        const exchangePricePromiseList = ['bithumb', 'bipbanker', 'coinsblack', 'dailyexchange'].map((slug) => {
            return getExchangePrice(slug)
                .then((priceItem) => {
                    this.priceList.push({
                        slug,
                        ...priceItem,
                    });
                });
        });

        return Promise.all(exchangePricePromiseList.concat(bipPricePromise, cmcRankPromise, geckoRankPromise));
    },
    head() {
        const title = 'Minter 2 — Как купить и продать Bip?';
        const description = '';
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
                { rel: 'canonical', href: `${HOST}/how-to-buy-and-sell-bip`},
            ],
        };
    },
    data() {
        return {
            bipPrice: 0,
            marketCap: 0,
            priceList: [],
            rank: {
                cmc: 0,
                coingecko: 0,
            },
        };
    },
    methods: {
        prettyRound,
        coinPrice: (value) => prettyNum(value || 0, {precision: 4, precisionSetting: PRECISION_SETTING.FIXED}),
        getPrice(slug) {
            return this.coinPrice(this.priceList.find((item) => item.slug === slug)?.price);
        },
    },
};
</script>

<template>
    <div>
        <div class="u-container u-container--full language-wrap">
            <nuxt-link class="language-item link--default" to="/ru">Что такое Minter?</nuxt-link>
            <language class="language-item" :locales='[{"code":"","name":"English"},{"code":"ru","name":"Russian"}]' lang="ru" :push="true"/>
        </div>
        <div class="u-container index-section">
            <img class="index-intro__logo" src="/img/minter-logo.svg" alt="Minter" width="133" height="42">
            <h1 class="index-intro__title">Как купить и продать BIP?</h1>

            <div class="u-grid u-grid--vertical-margin u-mt-25">
                <div class="u-cell u-cell--large--3-10 u-cell--medium--1-3 u-cell--small--1-2">
                    <h4 class="bip-price__caption u-h--uppercase u-mb-05">Средняя цена BIP</h4>
                    <div class="bip-price__value u-text-number">
                        ${{ coinPrice(bipPrice) }}
                    </div>
                </div>
                <div class="u-cell u-cell--large--auto u-cell--small--1-2">
                    <h4 class="bip-cap__title">Капитализация</h4>
                    <div class="bip-cap__value">${{ prettyRound(marketCap) }}</div>
                </div>
                <div class="u-cell u-cell--small--auto">
                    <div class="bip-cap__item">
                        <a class="bip-cap__link link--default" href="https://coinmarketcap.com/currencies/minter-network/" target="_blank" rel="noopener">
                            <img class="bip-cap__icon" src="/img/bip-price-cmc.png" srcset="/img/bip-price-cmc@2x.png 2x" alt="" role="presentation">
                            <h4 class="bip-cap__title">Coinmarketcap.com</h4>
                        </a>
                        <div class="bip-cap__value">#{{ rank.cmc }}</div>
                    </div>
                </div>
                <div class="u-cell u-cell--small--auto">
                    <div class="bip-cap__item">
                        <a class="bip-cap__link link--default" href="https://www.coingecko.com/en/coins/bip" target="_blank" rel="noopener">
                            <img class="bip-cap__icon" src="/img/bip-price-coingecko.png" srcset="/img/bip-price-coingecko@2x.png 2x" alt="" role="presentation">
                            <h4 class="bip-cap__title">Coingecko.com</h4>
                        </a>
                        <div class="bip-cap__value">#{{ rank.coingecko }}</div>
                    </div>
                </div>
            </div>

            <section class="bip-trade__panel">
                <div class="u-grid">
                    <div class="u-cell u-cell--medium--1-3">
                        <h2 class="u-h2 u-mb-05">Где торговать</h2>
                        <p>Чтобы приобрести или продать BIP, воспользуйтесь одним из этих проверенных способов.</p>
                    </div>
                    <div class="u-cell u-cell--medium--2-3">
                        <div class="u-grid u-grid--small u-grid--vertical-margin">
                            <div class="u-cell u-cell--small--1-2">
                                <div class="bip-trade__item">
                                    <a class="bip-trade__link link--default" href="https://console.minter.network/ru/hub" target="_blank">
                                        <img class="bip-trade__icon" src="/img/index-wallet-console.svg" alt="" role="presentation" width="52" height="52">
                                        <h4 class="bip-trade__title">Minter Console</h4>
                                    </a>
                                    <div class="bip-trade__value">${{ coinPrice(bipPrice) }}</div>
                                </div>
                                <p class="bip-trade__description">Переводите свои Ethereum-активы в сеть Minter и обменивайте их на BIP. <a class="link--default" href="https://teletype.in/@biplenta/usdt-bip" target="_blank" rel="noopener">Узнать как</a></p>
                            </div>
                            <div class="u-cell u-cell--small--1-2">
                                <div class="bip-trade__item">
                                    <a class="bip-trade__link link--default" href="https://www.bithumb.pro/en-us/exchange/professional?q=BIP-USDT" target="_blank" rel="noopener">
                                        <img class="bip-trade__icon" src="/img/bip-trade-bithumb.png" srcset="/img/bip-trade-bithumb@2x.png 2x" alt="" role="presentation">
                                        <h4 class="bip-trade__title">Bithumb Global</h4>
                                    </a>
                                    <div class="bip-trade__value">${{ getPrice('bithumb') }}</div>
                                </div>
                                <p class="bip-trade__description">Криптовалютная биржа с наиболее активными торгами BIP. Занимает 16 место в CoinGecko, KYC не требуется.</p>
                            </div>
                            <div class="u-cell u-cell--small--1-2">
                                <div class="bip-trade__item">
                                    <a class="bip-trade__link link--default" href="https://t.me/BIP_Banker_bot" target="_blank" rel="noopener">
                                        <img class="bip-trade__icon" src="/img/bip-trade-banker-bot.png" srcset="/img/bip-trade-banker-bot@2x.png 2x" alt="" role="presentation">
                                        <h4 class="bip-trade__title">Bip Banker Bot</h4>
                                    </a>
                                    <div class="bip-trade__value">${{ getPrice('bipbanker') }}</div>
                                </div>
                                <p class="bip-trade__description">Удобный Telegram-бот с P2P торговлей. Позволяет приобретать и продавать BIP как за криптовалюту, так и за фиатные средства.</p>
                            </div>
                            <div class="u-cell u-cell--small--1-2">
                                <div class="bip-trade__item">
                                    <a class="bip-trade__link link--default" href="https://t.me/dailyexchangebot" target="_blank" rel="noopener">
                                        <img class="bip-trade__icon" src="/img/bip-trade-daily-exchange.png" srcset="/img/bip-trade-daily-exchange@2x.png 2x" alt="" role="presentation">
                                        <h4 class="bip-trade__title">Daily Exchange</h4>
                                    </a>
                                    <div class="bip-trade__value">${{ getPrice('dailyexchange') }}</div>
                                </div>
                                <p class="bip-trade__description">Telegram-бот от команды MinterPro, позволяющий приобрести BIP за USDT, ETH и Qiwi.</p>
                            </div>
                            <div class="u-cell u-cell--small--1-2">
                                <div class="bip-trade__item">
                                    <a class="bip-trade__link link--default" href="https://coins.black/" target="_blank" rel="noopener">
                                        <img class="bip-trade__icon" src="/img/bip-trade-coins-black.png" srcset="/img/bip-trade-coins-black@2x.png 2x" alt="" role="presentation">
                                        <h4 class="bip-trade__title">Coins.Black</h4>
                                    </a>
                                    <div class="bip-trade__value">${{ getPrice('coinsblack') }}</div>
                                </div>
                                <p class="bip-trade__description">Платформа обмена криптовалют и цифровых активов с множеством вариантов покупки BIP за фиатные и криптовалютные средства.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <h2 class="u-h2 u-mt-35 u-mb-05">Как хранить</h2>
            <p class="u-mb-15">Выберите один из удобных кошельков для управления своими BIP:</p>
            <div class="u-grid u-grid--small u-grid--vertical-margin">
                <div class="u-cell u-cell--medium--1-3">
                    <div class="index-wallets__item">
                        <a class="index-wallets__link link--default" href="https://bip.to" target="_blank">
                            <img class="index-wallets__icon" src="/img/index-wallet-bip.png" srcset="/img/index-wallet-bip@2x.png 2x" alt="" role="presentation">
                            <div class="bip-wallets__title">Bip Wallet</div>
                        </a>
                        <p class="bip-wallets__description">Основной кошелек, имеющий все необходимые для полноценной работы функции. Поддерживаются iOS, Android и Web версии.</p>
                    </div>
                </div>
                <div class="u-cell u-cell--medium--1-3">
                    <div class="index-wallets__item">
                        <a class="index-wallets__link link--default" href="https://wallet.minter.org" target="_blank">
                            <img class="index-wallets__icon" src="/img/index-wallet-minter.png" srcset="/img/index-wallet-minter@2x.png 2x" alt="" role="presentation">
                            <div class="bip-wallets__title">Minter Wallet</div>
                        </a>
                        <p class="bip-wallets__description">Наиболее простой кошелек, не требующий от вас ничего, кроме email адреса.</p>
                    </div>
                </div>
                <div class="u-cell u-cell--medium--1-3">
                    <div class="index-wallets__item">
                        <a class="index-wallets__link link--default" href="https://console.minter.network" target="_blank" rel="noopener">
                            <img class="index-wallets__icon" src="/img/index-wallet-console.svg" alt="" role="presentation">
                            <div class="bip-wallets__title">Minter Console</div>
                        </a>
                        <p class="bip-wallets__description">Полноценный рабочий инструмент для самых продвинутых пользователей. </p>
                    </div>
                </div>
            </div>

            <hr class="hr--divider">


            <h2 class="u-h2 u-mb-05">Узнать больше</h2>
            <p class="u-mb-15">BIP — базовая монета блокчейна Minter. <br> <nuxt-link class="link--default" to="/ru">Узнать подробнее о Minter.</nuxt-link></p>
        </div>
    </div>
</template>
