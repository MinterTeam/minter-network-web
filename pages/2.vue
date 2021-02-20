<script>
import {getStatus} from '~/api/status.js';
import {HOST} from '~/assets/variables.js';
import {prettyRound} from '~/assets/utils.js';

export default {
    head() {
        const title = 'Minter: digital assets marketplace';
        const description = 'Your single gateway to major digital currencies and assets: buy, sell, send, and spend BTC, ETH, BIP, USDC, gold, oil, stocks, and thousands more.';
        // const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

        return {
            title: title,
            meta: [
                { hid: 'og-title', name: 'og:title', content: title },
                { hid: 'description', name: 'description', content: description },
                { hid: 'og-description', name: 'og:description', content: description },
                // { hid: 'og-image', name: 'og:image', content: `/img/social-share-wallet${localeSuffix}.png` },
            ],
            link: [
                { rel: 'canonical', href: `${HOST}/`},
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
        <div class="index-bar">
            <div class="u-container">Minter 2 is coming soon!</div>
        </div>
        <div class="u-container index-section">
            <section class="index-intro">
                <div class="index-intro__content">
                    <img class="index-intro__logo" src="/img/minter-logo.svg" alt="Minter" width="133" height="42">
                    <h1 class="index-intro__title">Digital Assets Marketplace</h1>
                    <p>Your single gateway to major digital currencies and assets: buy, sell, send, and spend BTC, ETH, BIP, USDC, gold, oil, stocks, and thousands more.</p>
                </div>
                <div class="index-intro__assets-wrap">
                    <img class="index-intro__assets" src="/img/index-assets.png" srcset="/img/index-assets@2x.png 2x" alt="" role="presentation">
                </div>
            </section>

            <hr class="hr--divider">

            <h2 class="u-h2 u-mb-05">What’s Minter</h2>
            <p>Minter is a DPoS blockchain, meaning that all transactions are secure, anonymous, and&nbsp;final. Only&nbsp;you control your assets, and no one can restrict, block, or tamper with&nbsp;them.</p>

            <hr class="hr--divider" v-if="stats">

            <div class="index-numbers u-grid u-grid--xlarge u-grid--vertical-margin" v-if="stats">
                <div class="index-numbers__item u-cell u-cell--auto">
                    <div class="index-numbers__value">{{ stats.activeValidators }}</div>
                    <div class="index-numbers__caption">Validators</div>
                </div>
                <div class="index-numbers__item u-cell u-cell--auto">
                    <div class="index-numbers__value">{{ prettyRound(stats.delegatorsCount) }}</div>
                    <div class="index-numbers__caption">Delegators</div>
                </div>
                <div class="index-numbers__item u-cell u-cell--auto">
                    <div class="index-numbers__value">{{ prettyRound(stats.nonZeroAddressesCount) }}</div>
                    <div class="index-numbers__caption">Non-zero addresses</div>
                </div>
            </div>

            <hr class="hr--divider">

            <h2 class="u-h2 u-mb-05">The internet of money</h2>
            <p>Everything is lightning-fast and cost-efficient: a transaction takes only 5&nbsp;seconds in time and $0.01 in&nbsp;fees. Trade&nbsp;of any volume costs $0.03 plus 0.2% distributed among liquidity providers.</p>

            <hr class="hr--divider">

            <h2 class="u-h2 u-mb-05">Ease of use</h2>
            <p class="u-mb-15">Choose one of the three wallets to manage your assets:</p>
            <div class="u-grid u-grid--vertical-margin">
                <div class="u-cell u-cell--medium--1-3">
                    <div class="index-wallets__item">
                        <a class="index-wallets__link link--default" href="https://wallet.minter.org" target="_blank">
                            <img class="index-wallets__icon" src="/img/index-wallet-minter.png" srcset="/img/index-wallet-minter@2x.png 2x" alt="" role="presentation">
                            <div class="index-wallets__title">Minter Wallet</div>
                        </a>
                        <p class="index-wallets__description">You will only need an e-mail to get started</p>
                    </div>
                </div>
                <div class="u-cell u-cell--medium--1-3">
                    <div class="index-wallets__item">
                        <a class="index-wallets__link link--default" href="https://bip.to" target="_blank">
                            <img class="index-wallets__icon" src="/img/index-wallet-bip.png" srcset="/img/index-wallet-bip@2x.png 2x" alt="" role="presentation">
                            <div class="index-wallets__title">Bip Wallet</div>
                        </a>
                        <p class="index-wallets__description">Our semi-pro solution supporting iOS, Android, and Web</p>
                    </div>
                </div>
                <div class="u-cell u-cell--medium--1-3">
                    <div class="index-wallets__item">
                        <a class="index-wallets__link link--default" href="https://console.minter.network" target="_blank" rel="noopener">
                            <img class="index-wallets__icon" src="/img/index-wallet-console.png" srcset="/img/index-wallet-console@2x.png 2x" alt="" role="presentation">
                            <div class="index-wallets__title">Minter Console</div>
                        </a>
                        <p class="index-wallets__description">For the most advanced users and businesses</p>
                    </div>
                </div>
            </div>

            <hr class="hr--divider">


            <h2 class="u-h2 u-mb-05">There’s a role for everyone</h2>
            <p class="u-mb-15">Through the lens of which role would you like to learn more about Minter?</p>
            <div class="u-grid u-grid--vertical-margin">
                <div class="u-cell u-cell--medium--1-3 u-cell--1-2">
                    <div class="u-fw-600">Coiner</div>
                    <p>Create and manage your own coin or&nbsp;token</p>
                </div>
                <div class="u-cell u-cell--medium--1-3 u-cell--1-2">
                    <div class="u-fw-600">Validator</div>
                    <p>Support the network by providing infrastructure</p>
                </div>
                <div class="u-cell u-cell--medium--1-3 u-cell--1-2">
                    <div class="u-fw-600">Delegator</div>
                    <p>Stake assets and get&nbsp;rewards</p>
                </div>
                <div class="u-cell u-cell--medium--1-3 u-cell--1-2">
                    <div class="u-fw-600">Liquidity provider</div>
                    <p>Set up or join liquidity pools to&nbsp;earn trading&nbsp;fees</p>
                </div>
                <div class="u-cell u-cell--medium--1-3 u-cell--1-2">
                    <div class="u-fw-600">Developer</div>
                    <p>Integrate assets into existing projects or build new&nbsp;ones</p>
                </div>
                <div class="u-cell u-cell--medium--1-3 u-cell--1-2">
                    <div class="u-fw-600">Trader</div>
                    <p>Profit from trading in a&nbsp;fully decentralized way</p>
                </div>
            </div>


            <hr class="hr--divider">

            <h2 class="u-h2 u-mb-20">Facts and links</h2>

            <div class="u-grid u-grid--large u-grid--vertical-margin--large">
                <div class="u-cell u-cell--medium--1-2">
                    <img class="index-feature__icon" src="/img/feature-tools.svg" width="48" height="48" alt="" role="presentation">
                    <h2 class="index-feature__title u-h3">Comprehensive toolset</h2>
                    <p class="index-feature__description">
                        Game credits, loyalty points, access tokens and achievements can be managed in a simple way via set of tools like wallets (<a class="link--default" href="https://itunes.apple.com/ru/app/bip-wallet/id1457843214" target="_blank" rel="nofollow">iOS</a>,
                        <a class="link--default" href="https://play.google.com/store/apps/details?id=network.minter.bipwallet.mainnet" target="_blank" rel="nofollow">Android</a>,
                        <a class="link--default" href="https://wallet.bip.to/" target="_blank">Web</a><!--, <a class="link&#45;&#45;default" href="">Telegram bot</a>-->) and
                        <a class="link--default" href="https://console.minter.network/" target="_blank">console</a>, or
                        <a class="link--default" href="https://docs.minter.network/#section/Minter-SDKs" target="_blank">SDK</a> and
                        <a class="link--default" href="https://docs.minter.network/#tag/Node-API" target="_blank">API</a> for advanced integrations.
                    </p>
                </div>
                <div class="u-cell u-cell--medium--1-2">
                    <img class="index-feature__icon" src="/img/feature-consensus.svg" width="48" height="48" alt="" role="presentation">
                    <h2 class="index-feature__title u-h3">Trustworthy consensus algorithm</h2>
                    <p class="index-feature__description">Network’s native utility token is called <a class="link--default" href="https://www.coingecko.com/en/coins/bip" target="_blank" rel="nofollow">BIP</a> and mined by <a class="link--default" href="https://github.com/MinterTeam/minter-go-node" target="_blank" rel="nofollow">validators</a> (Tendermint-based DPoS)</p>
                </div>
                <div class="u-cell u-cell--medium--1-2">
                    <img class="index-feature__icon" src="/img/feature-speed.svg" width="48" height="48" alt="" role="presentation">
                    <h2 class="index-feature__title u-h3">Blazingly fast speed</h2>
                    <p class="index-feature__description">Transactions are final in <a class="link--default" href="https://explorer.minter.network" target="_blank">5 seconds</a> and&nbsp;cost less than a cent. </p>
                </div>
                <div class="u-cell u-cell--medium--1-2">
                    <img class="index-feature__icon" src="/img/feature-open.svg" width="48" height="48" alt="" role="presentation">
                    <h2 class="index-feature__title u-h3">Open and free code</h2>
                    <p class="index-feature__description">Everything is crowdsourced and published in&nbsp;<a class="link--default" href="https://github.com/MinterTeam" target="_blank" rel="nofollow">GitHub</a> with open licenses.</p>
                </div>
            </div>
            <hr class="hr--divider">
            <div class="">
                <img class="index-feature__icon" src="/img/feature-community.svg" width="48" height="48" alt="" role="presentation">
                <h2 class="index-feature__title u-h3">Helpful community</h2>
                <p class="index-feature__description">
                    Subscribe to <a class="link--default" href="tg://resolve?domain=MinterTeam" target="_blank" rel="nofollow">Telegram</a>,
                    <a class="link--default" href="https://medium.com/@MinterTeam" target="_blank" rel="nofollow">Medium</a>,
                    <a class="link--default" href="https://twitter.com/MinterTeam" target="_blank" rel="nofollow">Twitter</a>,
                    <a class="link--default" href="https://www.facebook.com/MinterNetwork" target="_blank" rel="nofollow">Facebook</a> <br class="u-hidden-medium-down">
                    or join the conversation in <a class="link--default" href="tg://join?invite=EafyERJSJZJ-nwH_139jLQ" target="_blank" rel="nofollow">Telegram</a>
                    and&nbsp;<a class="link--default" href="https://www.reddit.com/r/Minter/" target="_blank" rel="nofollow">Reddit</a>
                </p>
            </div>
        </div>
    </div>
</template>
