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
        const title = 'Minter 2 — How to buy and sell BIP?';
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
            <nuxt-link class="language-item link--default" to="/">What’s Minter?</nuxt-link>
            <language class="language-item" :locales='[{"code":"","name":"English"},{"code":"ru","name":"Russian"}]' lang="" :push="true"/>
        </div>
        <div class="u-container index-section">
            <img class="index-intro__logo" src="/img/minter-logo.svg" alt="Minter" width="133" height="42">
            <h1 class="index-intro__title">How to buy and sell BIP?</h1>

            <div class="u-grid u-grid--vertical-margin u-mt-25">
                <div class="u-cell u-cell--large--3-10 u-cell--medium--1-3 u-cell--small--1-2">
                    <h4 class="bip-price__caption u-h--uppercase u-mb-05">Average price</h4>
                    <div class="bip-price__value u-text-number">
                        ${{ coinPrice(bipPrice) }}
                    </div>
                </div>
                <div class="u-cell u-cell--large--auto u-cell--small--1-2">
                    <h4 class="bip-cap__title">Market cap</h4>
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
                <h2 class="u-h2 u-mb-10">Buy BIP for ETH. Fully decentralized</h2>
                <div class="u-grid">
                    <div class="u-cell u-cell--medium--2-3">
                        <p>Use our cross-chain bridge to buy BIP in a fully decentralized way. Just log in to Console, click “Buy BIP,” and follow instructions.</p>
                        <a class="button button--main u-mt-10" href="https://console.minter.network" target="_blank">Buy BIP</a>
                    </div>
                    <div class="u-cell u-cell--medium--1-3">
                        <div class="bip-trade__item bip-trade__item--large">
                            <a class="bip-trade__link link--default" href="https://console.minter.network" target="_blank">
                                <img class="bip-trade__icon" src="/img/index-wallet-console.svg" alt="" role="presentation" width="68" height="68">
                                <h4 class="bip-trade__title">Minter Console</h4>
                            </a>
                            <div class="bip-trade__value bip-trade__value--large">${{ coinPrice(bipPrice) }}</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bip-trade__panel">
                <div class="u-grid">
                    <div class="u-cell u-cell--medium--1-3">
                        <h2 class="u-h2 u-mb-05">Elsewhere</h2>
                        <p>To buy or sell BIP, use one of the verified methods below.</p>
                    </div>
                    <div class="u-cell u-cell--medium--2-3">
                        <div class="u-grid u-grid--small u-grid--vertical-margin">
                            <div class="u-cell u-cell--small--1-2" v-if="false">
                                <div class="bip-trade__item">
                                    <a class="bip-trade__link link--default" href="https://www.bithumb.pro/en-us/exchange/professional?q=BIP-USDT" target="_blank" rel="noopener">
                                        <img class="bip-trade__icon" src="/img/bip-trade-bithumb.png" srcset="/img/bip-trade-bithumb@2x.png 2x" alt="" role="presentation">
                                        <h4 class="bip-trade__title">Bithumb Global</h4>
                                    </a>
                                    <div class="bip-trade__value">${{ getPrice('bithumb') }}</div>
                                </div>
                                <p class="bip-trade__description">Cryptocurrency exchange where BIP is traded most actively. Ranks 16th on CoinGecko, no KYC required.</p>
                            </div>
                            <div class="u-cell u-cell--small--1-2">
                                <div class="bip-trade__item">
                                    <a class="bip-trade__link link--default" href="https://t.me/BIP_Banker_bot" target="_blank" rel="noopener">
                                        <img class="bip-trade__icon" src="/img/bip-trade-banker-bot.png" srcset="/img/bip-trade-banker-bot@2x.png 2x" alt="" role="presentation">
                                        <h4 class="bip-trade__title">Bip Banker Bot</h4>
                                    </a>
                                    <div class="bip-trade__value">${{ getPrice('bipbanker') }}</div>
                                </div>
                                <p class="bip-trade__description">Convenient P2P trading Telegram bot. Allows you to purchase and sell BIP for both crypto and fiat currencies.</p>
                            </div>
                            <div class="u-cell u-cell--small--1-2">
                                <div class="bip-trade__item">
                                    <a class="bip-trade__link link--default" href="https://t.me/dailyexchangebot" target="_blank" rel="noopener">
                                        <img class="bip-trade__icon" src="/img/bip-trade-daily-exchange.png" srcset="/img/bip-trade-daily-exchange@2x.png 2x" alt="" role="presentation">
                                        <h4 class="bip-trade__title">Daily Exchange</h4>
                                    </a>
                                    <div class="bip-trade__value">${{ getPrice('dailyexchange') }}</div>
                                </div>
                                <p class="bip-trade__description">Telegram bot by the MinterPro team. Allows you to purchase BIP for USDT, ETH, and Qiwi.</p>
                            </div>
                            <div class="u-cell u-cell--small--1-2">
                                <div class="bip-trade__item">
                                    <a class="bip-trade__link link--default" href="https://coins.black/" target="_blank" rel="noopener">
                                        <img class="bip-trade__icon" src="/img/bip-trade-coins-black.png" srcset="/img/bip-trade-coins-black@2x.png 2x" alt="" role="presentation">
                                        <h4 class="bip-trade__title">Coins.Black</h4>
                                    </a>
                                    <div class="bip-trade__value">${{ getPrice('coinsblack') }}</div>
                                </div>
                                <p class="bip-trade__description">Digital assets and currencies exchange service with various options to get BIP for fiat and crypto funds.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <h2 class="u-h2 u-mt-35 u-mb-05">Where to store</h2>
            <p class="u-mb-15">Manage your BIP in one of these user-friendly wallets:</p>
            <div class="u-grid u-grid--small u-grid--vertical-margin">
                <div class="u-cell u-cell--medium--1-3">
                    <div class="index-wallets__item">
                        <a class="index-wallets__link link--default" href="https://bip.to" target="_blank">
                            <img class="index-wallets__icon" src="/img/index-wallet-bip.png" srcset="/img/index-wallet-bip@2x.png 2x" alt="" role="presentation">
                            <div class="bip-wallets__title">Bip Wallet</div>
                        </a>
                        <p class="bip-wallets__description">Main wallet that has all the features you need. iOS, Android, and Web versions are supported.</p>
                    </div>
                </div>
                <div class="u-cell u-cell--medium--1-3">
                    <div class="index-wallets__item">
                        <a class="index-wallets__link link--default" href="https://wallet.minter.org" target="_blank">
                            <img class="index-wallets__icon" src="/img/index-wallet-minter.png" srcset="/img/index-wallet-minter@2x.png 2x" alt="" role="presentation">
                            <div class="bip-wallets__title">Minter Wallet</div>
                        </a>
                        <p class="bip-wallets__description">The most simple wallet. The only thing you need to use it is an e-mail address.</p>
                    </div>
                </div>
                <div class="u-cell u-cell--medium--1-3">
                    <div class="index-wallets__item">
                        <a class="index-wallets__link link--default" href="https://console.minter.network" target="_blank" rel="noopener">
                            <img class="index-wallets__icon" src="/img/index-wallet-console.svg" alt="" role="presentation">
                            <div class="bip-wallets__title">Minter Console</div>
                        </a>
                        <p class="bip-wallets__description">Full-fledged operational tool for the most advanced users.</p>
                    </div>
                </div>
            </div>

            <hr class="hr--divider">


            <h2 class="u-h2 u-mb-05">Learn more</h2>
            <p class="u-mb-15">BIP is the native coin of Minter network.<br> <nuxt-link class="link--default" to="/">Find out more about Minter.</nuxt-link></p>
        </div>
    </div>
</template>
