<script>
import {getPool, getStatus} from '~/api/explorer.js';
import {prettyRound, pretty, getApy} from '~/assets/utils.js';
import {HOST} from '~/assets/variables.js';
import trackClick from '~/assets/v-track-click.js';
import Language from '~/layouts/_language.vue';
import Footer from '~/layouts/_footer.vue';

export default {
    layout: 'simple',
    components: {
        Language,
        Footer,
    },
    directives: {
        trackClick,
    },
    fetchOnServer: false,

    fetch() {
        const poolsPromise = Promise.all([
                getPool('HUB', 'USDTE'),
            ])
            .then((pools) => {
                this.pools = pools;
                this.hubPrice = pools[0].amount1 / pools[0].amount0;
            });

        return Promise.all([
            bipPricePromise,
            poolsPromise,
        ]);
    },

    head() {
        const title = 'Blockchain for earning crypto';
        const description = 'Minter is a single decentralized network allowing anyone to buy, sell, send, and earn digital assets.';
        // const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

        return {
            title: title + ' | Minter Network',
            meta: [
                { hid: 'og-title', name: 'og:title', content: title },
                { hid: 'description', name: 'description', content: description },
                { hid: 'og-description', name: 'og:description', content: description },
                { hid: 'og-image', name: 'og:image', content: `/newnetwork/images/meta.png` },
            ],
            link: [
                { rel: 'canonical', href: `${HOST}/bip`},
                { rel: 'stylesheet', href: '/newnetwork/style.css', hid: 'newnetwork-style'},
                { rel: 'stylesheet', href: '/newnetwork/style320.css', media: 'screen and (max-width: 1020px)', hid: 'newnetwork-style320'},
            ],
        };
    },
    data() {
        return {
            hubPrice: 0,
            pools: [],
        };
    },
    mounted() {
        // move landing styles under global styles
        const style = document.querySelector('[data-hid="newnetwork-style"]');
        const style320 = document.querySelector('[data-hid="newnetwork-style320"]');
        if (!style || !style320) {
            return;
        }
        style.parentNode.removeChild(style);
        style320.parentNode.removeChild(style320);
        document.head.appendChild(style);
        document.head.appendChild(style320);
    },
    methods: {
        pretty,
        prettyRound,
        apy(pool) {
            if (!pool) {
                return 0;
            }
            return getApy(pool.tradeVolumeBip1D, pool.liquidityBip);
        },
    },
};
</script>

<template>
    <div class="wrap">
        <!--<div class="promo-top">
            <div><b>Minter 3</b>: Tokenomics Update Coming on April 12, 2022. <a href="https://www.minter.network/torronet" target="_blank">Learn more</a></div>
        </div>-->
        <!--<div class="top-banner">
            <div class="top-banner-content">
                <div class="top-banner-text">Withdraw your <span>BNB</span> from centralised exchanges before it’s too late!</div>
                <div class="top-banner-link"><a href="/ru/earn/bnb-yf" target="_blank">Learn how to earn in Minter DEX 120% APR</a></div>
            </div>
            <div class="top-banner-button">
                <a href="https://console.minter.network/hub?coin=BNB&chainId=56" target="_blank" class="btn btn-banner">Deposit BNB Now!</a>
            </div>
        </div>-->
        <header>
            <div class="container">
                <div class="top-bar">
                    <div class="logo"><a href="/"><img src="/img/minter-logo-circle.svg" alt="Minter Network"/> Minter</a></div>
                    <div class="menu">
                        <div class="menu-link">
                            <span class="menu-link-a">Products</span>
                            <div class="sub-menu">
                                <div class="sub-menu-item">
                                    <a href="https://console.minter.network/" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/wallet-minter.svg" alt="Minter DEX">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Minter DEX</h4>
                                            <p>Buy, sell, send, and earn digital assets fully desentalized. Low fees fixed in US dollars, fast transactions, onchain limit orders.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/hub" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/hub-logo.svg" alt="Minter HUB">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Minter HUB</h4>
                                            <p>Minter Hub is a bridge to global crypto liquidity, a standalone sidechain with the unique cross-chain smart contracts technology.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://honee.app/" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/honee.svg" alt="Honee Wallet">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Honee Wallet</h4>
                                            <p>The simplest crypto wallet that helps you earn.</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="menu-link">
                            <span class="menu-link-a">Network</span>
                            <div class="sub-menu">
                                <div class="sub-menu-item">
                                    <a href="https://explorer.minter.network/validators" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_validators.svg" alt="Minter Validators">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Validators</h4>
                                            <p>Аctivity statuses, uptime, total supply, BIP stats, quantity and speed of blocks and transactions per 24 hours, validators, as well as network fees paid daily.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://explorer.minter.network/" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_explorer.svg" alt="Minter Explorer">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Explorer</h4>
                                            <p>Explorer of transactions, blocks, and addresses.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://status.minter.network/" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_status.svg" alt="Minter Status">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Status</h4>
                                            <p>Summarized information about the network.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://console.minter.network/" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_console.svg" alt="Minter Console">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Console</h4>
                                            <p>This wallet has the most features: besides the standard functions of the basic wallet, you can also work with checks, create coins, launch masternodes, set up and manage MultiSig addresses.</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="menu-link">
                            <span class="menu-link-a">Devs</span>
                            <div class="sub-menu">
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/docs" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_docs.svg" alt="Minter Docs">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Docs</h4>
                                            <p>Blockchain specifications, instructions on starting a node, detailed descriptions of all entities.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/docs#node-api" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_api.svg" alt="Minter API">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>API</h4>
                                            <p>A one-stop shop for developers to access all resources available.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/docs#minter-sdks" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_sdk.svg" alt="Minter SDK">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>SDK</h4>
                                            <p>Detailed descriptions of all entities (coins, transactions, checks, MultiSig addresses, etc.), fees, validators, and links to all SDKs.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://github.com/MinterTeam/" target="_blank" rel="nofollow">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_github.svg" alt="Minter GitHub">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>GitHub</h4>
                                            <p>Source code of Minter team repositories on the GitHub platform. Node, wallets, multiple SDKs and APIs.</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="menu-link">
                            <a href="https://explorer.minter.network/validators" target="_blank" class="menu-link-a">Validators</a>
                        </div>
                        <div class="menu-link">
                            <a href="#social" rel="nofollow" class="menu-link-a">Community</a>
                        </div>
                        <div class="menu-link">
                            <a href="https://minterteam.medium.com/" target="_blank" rel="nofollow" class="menu-link-a">Blog</a>
                        </div>
                        <language class="" :locales='[{"code":"","name":"English"},{"code":"ru","name":"Russian"}]' lang="" :push="true"/>
                        <div class="hamburger-menu">
                            <input id="menu__toggle" type="checkbox" />
                            <label class="menu__btn" for="menu__toggle">
                                <span></span>
                            </label>
                            <div class="menu__box">
                                <h4>Products</h4>
                                <div class="sub-menu-item">
                                    <a href="https://console.minter.network/" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/wallet-minter.svg" alt="Minter DEX">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Minter DEX</h4>
                                            <p>Buy, sell, send, and earn digital assets fully desentalized. Low fees fixed in US dollars, fast transactions, onchain limit orders.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/hub" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/hub-logo.svg" alt="Minter HUB">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Minter HUB</h4>
                                            <p>Minter Hub is a bridge to global crypto liquidity, a standalone sidechain with the unique cross-chain smart contracts technology.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://honee.app/" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/honee.svg" alt="Honee Wallet">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Honee Wallet</h4>
                                            <p>The simplest crypto wallet that helps you earn.</p>
                                        </div>
                                    </a>
                                </div>
                                <hr>
                                <h4>Network</h4>
                                <div class="sub-menu-item">
                                    <a href="https://explorer.minter.network/validators" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_validators.svg" alt="Minter Validators">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Validators</h4>
                                            <p>Аctivity statuses, uptime, total supply, BIP stats, quantity and speed of blocks and transactions per 24 hours, validators, as well as network fees paid daily.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://explorer.minter.network/" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_explorer.svg" alt="Minter Explorer">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Explorer</h4>
                                            <p>Explorer of transactions, blocks, and addresses.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://status.minter.network/" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_status.svg" alt="Minter Status">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Status</h4>
                                            <p>Summarized information about the network.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://console.minter.network/" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_console.svg" alt="Minter Console">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Console</h4>
                                            <p>This wallet has the most features: besides the standard functions of the basic wallet, you can also work with checks, create coins, launch masternodes, set up and manage MultiSig addresses.</p>
                                        </div>
                                    </a>
                                </div>
                                <hr>
                                <h4>Devs</h4>
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/docs" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_docs.svg" alt="Minter Docs">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Docs</h4>
                                            <p>Blockchain specifications, instructions on starting a node, detailed descriptions of all entities.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/docs#node-api" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_api.svg" alt="Minter API">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>API</h4>
                                            <p>A one-stop shop for developers to access all resources available.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/docs#minter-sdks" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_sdk.svg" alt="Minter SDK">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>SDK</h4>
                                            <p>Detailed descriptions of all entities (coins, transactions, checks, MultiSig addresses, etc.), fees, validators, and links to all SDKs.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://github.com/MinterTeam/" target="_blank" rel="nofollow">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_github.svg" alt="Minter GitHub">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>GitHub</h4>
                                            <p>Source code of Minter team repositories on the GitHub platform. Node, wallets, multiple SDKs and APIs.</p>
                                        </div>
                                    </a>
                                </div>
                                <hr>
                                <h4>Other</h4>
                                <div class="sub-menu-item">
                                    <a href="https://minterteam.medium.com/" target="_blank" rel="nofollow">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/social_md.svg" alt="Minter Blog">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Blog</h4>
                                            <p>Development announcements, monthly reports, reviews and useful guides.</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hello">
                    <div class="hello-content">
                        <h1>DeFi platform <br />for Earning Crypto</h1>
                        <div class="hello-buttons">
                            <a class="btn" href="https://console.minter.network/" target="_blank" v-track-click="'start-earning'">Start Earning</a>
                            <a class="btn btn-alt" href="https://www.minter.network/how-to-buy-and-sell-bip" target="_blank" v-track-click="'buy-bipx'">Buy and Stake BIP</a>
                            <a class="btn btn-alt" href="https://www.minter.network/docs#minter-sdks" target="_blank" v-track-click="'build-defi-apps'">Build DeFi Apps</a>
                        </div>
                        <p>Minter is a DeFi platform with DEX, smart contracts, and cross-chain liquidity. It delivers the simplest and most effective ways to create, earn, store, and exchange cryptos in a fully decentralized way. Minter is integrated with Ethereum and BNB Smart Chain to provide cross-chain transfers and swaps. It allows to build efficient DeFi apps via a rich set of SDK and API tools.</p>
                    </div>
                </div>
            </div>
            <div class="stat-bar">
                <div class="container">
                    <div class="stat-items">
                        <div class="stat-item">
                            <small>Mainnet Launch</small>
                            <div>May 15, 2019</div>
                        </div>
                        <div class="stat-item">
                            <small>Market Cap</small>
                            <div>$12 008 922</div>
                        </div>
                        <div class="stat-item">
                            <small>Circulating Supply</small>
                            <div>57%</div>
                        </div>
                        <div class="stat-item">
                            <small>BIP Staking Up To</small>
                            <div>~26% APY</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <section class="earn" id="earn">
            <div class="container">
                <h2>Earn crypto with Minter Tools</h2>
                <div class="earn-tools">
                    <div class="tool earn-1">
                        <img src="/newnetwork/images/bip-staking.svg" alt="BIP Staking">
                        <h3>BIP Staking</h3>
                        <p>Delegate BIP to validators and receive portion of fees and block rewards.</p>
                        <a href="https://www.minter.network/earn/delegation" target="_blank" class="btn btn-alt">Read More</a>
                    </div>
                    <div class="tool earn-2">
                        <img src="/newnetwork/images/farming.svg" alt="Farming">
                        <h3>Farming</h3>
                        <p>Get additional reward for the very fact of locking your assets.</p>
                        <a href="https://www.minter.network/earn/farm" target="_blank" class="btn btn-alt">Read More</a>
                    </div>
                    <div class="tool earn-3">
                        <img src="/newnetwork/images/trading.svg" alt="Trading">
                        <h3>Trading</h3>
                        <p>Day trading or the long run, you can have it all.</p>
                        <a href="https://www.minter.network/earn/trading" target="_blank" class="btn btn-alt">Read More</a>
                    </div>
                    <div class="tool earn-4">
                        <img src="/newnetwork/images/pl.svg" alt="Providing Liquidity">
                        <h3>Providing Liquidity</h3>
                        <p>Let other traders make operations using your funds.</p>
                        <a href="https://www.minter.network/earn/earn-liquidity-pools" target="_blank" class="btn btn-alt">Read More</a>
                    </div>
                    <div class="tool earn-5">
                        <img src="/newnetwork/images/arbitrage.svg" alt="Arbitrage">
                        <h3>Arbitrage</h3>
                        <p>Buy lower at one place, sell higher at another.</p>
                        <a href="https://www.minter.network/earn/arbitrage" target="_blank" class="btn btn-alt">Read More</a>
                    </div>
                    <div class="tool earn-6">
                        <img src="/newnetwork/images/hub-staking.svg" alt="HUB Staking">
                        <h3>HUB Staking</h3>
                        <p>Delegate HUB to oracles and receive portion of fees.</p>
                        <a href="https://www.minter.network/earn/hub-staking" target="_blank" class="btn btn-alt">Read More</a>
                    </div>
                </div>
            </div>
        </section>
        <section class="features" id="features">
            <div class="container">
                <h2>Network features</h2>
                <div class="features-content">
                    <div class="features-item">
                        <img src="/newnetwork/images/fb1.svg" class="features-item-bg">
                        <img src="/newnetwork/images/f1.svg" alt="Fast transactions">
                        <h3>Fast transactions</h3>
                        <p><b>5 seconds</b> with final blocks</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/fb2.svg" class="features-item-bg">
                        <img src="/newnetwork/images/f2.svg" alt="Low fees fixed in USD">
                        <h3>Low fees fixed in USD</h3>
                        <p><b>$0.01</b> per transfer, <b>$0.03</b> + <b>0.2%</b> per swap, payable in any liquid coin or token</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/fb4.svg" class="features-item-bg">
                        <img src="/newnetwork/images/f4.svg" alt="Fully Decentralized">
                        <h3>Fully Decentralized</h3>
                        <p>Make decentralized deposits and withdrawals, easily</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/fb5.svg" class="features-item-bg">
                        <img src="/newnetwork/images/f5.svg" alt="Limit Orders">
                        <h3>Limit Orders</h3>
                        <p>Place limit orders powered by a unique implementation at the core level of Minter blockchain</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/fb6.svg" class="features-item-bg">
                        <img src="/newnetwork/images/f6.svg" alt="Custom Tokens and Pools">
                        <h3>Custom Tokens & Pools</h3>
                        <p>Create your own tokens and liquidity pools in a couple of clicks</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/fb3.svg" class="features-item-bg">
                        <img src="/newnetwork/images/f3.svg" alt="Cross-Chain Swaps">
                        <h3>Cross-Chain Swaps</h3>
                        <p>Send cross-chain transfers with swaps. For example, BUSD on BNB Smart Chain for USDC on Ethereum</p>
                        <p class="coming-soon">Coming 2022</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/fb7.svg" class="features-item-bg">
                        <img src="/newnetwork/images/f7.svg" alt="Smart Contracts">
                        <h3>Smart Contracts</h3>
                        <p>Secure cross-chain smart contracts tailored to all users. Advanced mode for developers and non-dev mode for simple deployment.</p>
                        <p class="coming-soon">Coming 2022</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/fb8.svg" class="features-item-bg">
                        <img src="/newnetwork/images/f8.svg" alt="NFTs">
                        <h3>NFTs</h3>
                        <p>Create, sell, swap, and cross-chainNFTs with ease.</p>
                        <p class="coming-soon">Coming 2022</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/fb9.svg" class="features-item-bg">
                        <img src="/newnetwork/images/f9.svg" alt="Crypto Loans">
                        <h3>Crypto Loans</h3>
                        <p>Borrowing crypto through Minter is easy! Use your crypto as collateral to get a loan without impact to your credit score.</p>
                        <p class="coming-soon">Coming 2022</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="compare" id="compare">
            <div class="container">
                <h2>Compare speed, fees, convenience</h2>
                <div class="table m-b-200">
                    <table>
                        <thead>
                            <tr>
                                <th>DEX</th>
                                <th>Tx Speed</th>
                                <th>Tx Fee</th>
                                <th>Transactions</th>
                                <th>Fee Coin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="flextd"><a href="https://console.minter.network/" target="_blank"><img src="/img/minter-logo-circle.svg" width="24" height="24" /> Minter</a></td>
                                <td>5 sec</td>
                                <td>$0.03</td>
                                <td>1 (<a href="https://explorer.minter.network/transactions/Mtb9962f15b0740400b1965aacafd02ac5755a74eb1d8a5844ab971f0bcdd4c76e" target="_blank">Tx</a>)</td>
                                <td>ANY</td>
                            </tr>
                            <tr>
                                <td class="flextd"><a href="https://pancakeswap.finance/" target="_blank" rel="nofollow"><img src="/bipx/images/logos/pancakeswap.png" srcset="/bipx/images/logos/pancakeswap@2x.png 2x, /bipx/images/logos/pancakeswap@3x.png 3x" /> PancakeSwap</a></td>
                                <td>6 sec</td>
                                <td>$0.27</td>
                                <td>2 (<a href="https://bscscan.com/tx/0xc4655f75d9935e65380046f52e02722f9388273330a3d1ce48593cce7de71c08" target="_blank" rel="nofollow">Tx</a>, <a href="https://bscscan.com/tx/0xc063cab353d6ca021afe23ee6860787d6cbd286f94f7a8c50434f96dcf1e3d2f" target="_blank" rel="nofollow">Tx</a>)</td>
                                <td>BNB</td>
                            </tr>
                            <tr>
                                <td class="flextd"><a href="https://uniswap.org/" target="_blank" rel="nofollow"><img src="/bipx/images/logos/uniswap.png" srcset="/bipx/images/logos/uniswap@2x.png 2x, /bipx/images/logos/uniswap@3x.png 3x" /> Uniswap</a></td>
                                <td>16 sec</td>
                                <td>$11.4</td>
                                <td>2 (<a href="https://etherscan.io/tx/0x0dc22e02dabda0b5dda7cbc4a997025c6d41af034b8e5b0ab1c002c8f1254485" target="_blank" rel="nofollow">Tx</a>, <a href="https://etherscan.io/tx/0x191302cbaba0c3ddec945f2a1365f9ca5347790b8f73cf3b69aead37fce77792" target="_blank" rel="nofollow">Tx</a>)</td>
                                <td>ETH</td>
                            </tr>
                            <tr>
                                <td class="flextd"><a href="https://1inch.io/" target="_blank" rel="nofollow"><img src="/bipx/images/logos/1inch.png" srcset="/bipx/images/logos/1inch@2x.png 2x, /bipx/images/logos/1inch@3x.png 3x" /> 1INCH</a></td>
                                <td>71 sec</td>
                                <td>$9.6</td>
                                <td>2 (<a href="https://etherscan.io/tx/0x2918f27fffb09b889a4ca1c34133cb85c21124b8b0feaafc54e6f7ff3abd70bc" target="_blank" rel="nofollow">Tx</a>, <a href="https://etherscan.io/tx/0xbbee60884c8039e8783b3159008787fb99883380ac49b47f4e3015330b8ac2fb" target="_blank" rel="nofollow">Tx</a>)</td>
                                <td>ETH</td>
                            </tr>
                            <tr>
                                <td class="flextd"><a href="https://www.sushi.com/" target="_blank" rel="nofollow"><img src="/bipx/images/logos/sushiswap.png" srcset="/bipx/images/logos/sushiswap@2x.png 2x, /bipx/images/logos/sushiswap@3x.png 3x" /> SushiSwap</a></td>
                                <td>62 sec</td>
                                <td>$9.7</td>
                                <td>2 (<a href="https://etherscan.io/tx/0x54d39d6c7388e1dda1813dc847f0b0067adc815b5ae4859a0bbf0061d678e26b" target="_blank" rel="nofollow">Tx</a>, <a href="https://etherscan.io/tx/0xc596e8b983dcdea03baa1c49965650e1cf1c2927fc786d17917b18c0e52f9ed7" target="_blank" rel="nofollow">Tx</a>)</td>
                                <td>ETH</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h2>Compare limit orders</h2>
                <div class="table">
                    <table>
                        <thead>
                            <tr>
                                <th>DEX</th>
                                <th>Tx Speed</th>
                                <th>Tx Fee</th>
                                <th>On-chain</th>
                                <th>Fee Coin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="flextd"><a href="https://console.minter.network/" target="_blank"><img src="/img/minter-logo-circle.svg" width="24" height="24" /> Minter</a></td>
                                <td>5 sec</td>
                                <td><a href="https://explorer.minter.network/transactions/Mteddd4fae853bb7af419d253f1b7227d5d69c9dfd0c669c3bdfcd509d9710d652" target="_blank" rel="nofollow">$0.1</a></td>
                                <td><img src="/newnetwork/images/yes.svg" alt="yes" width="24" height="24" /></td>
                                <td>ANY</td>
                            </tr>
                            <tr>
                                <td class="flextd"><a href="https://1inch.io/" target="_blank" rel="nofollow"><img src="/bipx/images/logos/ethereum.svg" height="24px" /> Ethereum (via 1INCH)</a></td>
                                <td>30 sec</td>
                                <td><a href="https://etherscan.io/tx/0xd96a1d5e30ae4bdd79dccc5a7155678fa655f8dceb9a3aa61334f3d1629e42d5" target="_blank" rel="nofollow">$33.3</a></td>
                                <td><img src="/newnetwork/images/no.svg" alt="no" width="24" height="24" /></td>
                                <td>Only ETH</td>
                            </tr>
                            <tr>
                                <td class="flextd"><a href="https://1inch.io/" target="_blank" rel="nofollow"><img src="/bipx/images/logos/bsc.svg" height="24px" /> BSC (via 1INCH)</a></td>
                                <td>6 sec</td>
                                <td><a href="https://bscscan.com/tx/0xb1e8099b6cc7d04137f4ad15f3390e0a4e6a7a72f19bd42969ed25e64ca23f58" target="_blank" rel="nofollow">$0.41</a></td>
                                <td><img src="/newnetwork/images/no.svg" alt="no" width="24" height="24" /></td>
                                <td>Only BNB</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section class="wallets" id="wallets">
            <div class="container">
                <h2>Wallets</h2>
                <div class="wallets-block">
                    <div class="wallet-image">
                        <img src="/newnetwork/images/phone.png" srcset="/newnetwork/images/phone@2x.png 2x" alt="Minter Wallets" />
                    </div>
                    <div class="wallets-content">
                        <div class="wallet-item">
                            <img src="/newnetwork/images/wallet-bip.svg" alt="Bip Wallet">
                            <h4>Bip Wallet</h4>
                            <p>User-friendly and feature-rich wallet released as an application for mobile devices</p>
                            <div class="wallet-links">
                                <a href="https://minter.link/ios" target="_blank" class="wallet_ios">iOS</a>
                                <a href="https://minter.link/android" target="_blank" class="wallet_android">Android</a>
                            </div>
                        </div>
                        <div class="wallet-item">
                            <img src="/newnetwork/images/wallet-web.svg" alt="Minter Web Wallet">
                            <h4><a href="https://wallet.bip.to/" target="_blank">Web Wallet</a></h4>
                            <p>BIP Wallet’s basic web version. Includes all essential functionality for managing your coins: receive, send, and delegate</p>
                        </div>
                        <div class="wallet-item">
                            <img src="/newnetwork/images/wallet-minter.svg" alt="Minter Wallet">
                            <h4><a href="https://wallet.minter.org/" target="_blank">Minter Wallet</a></h4>
                            <p>The most simple solution to receive and send funds. You will only need an e-mail to get started</p>
                        </div>
                        <div class="wallet-item">
                            <img src="/newnetwork/images/wallet-console.svg" alt="Console">
                            <h4><a href="https://console.minter.network/" target="_blank">Console</a></h4>
                            <p>This wallet has the most features: besides the standard functions of the basic wallet, you can also work with checks, create coins and tokens, launch masternodes, set up and manage MultiSig addresses and liquidity pools, and broadcast the transactions signed off-line</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="roadmap" id="roadmap">
            <div class="container">
                <div class="roadmap-block">
                    <div class="roadmap-content">
                        <h2>Roadmap</h2>
                        <p>In light of the changes that leading blockchains have recently made in their tokenomics, Minter Team is proposing a large-scale update of the network. Its goal is to improve the economic model and implement deflationary and counter-inflationary mechanisms, stimulating the strengthening of BIP.</p>
                        <p>The Minter team has started to design mechanisms outlined below. We plan to gradually roll them out in Q1 and Q2 2022.</p>
                        <a href="https://minterteam.medium.com/minter-3-bip-tokenomics-update-c6e81264e33c" target="_blank" rel="nofollow" class="btn btn-alt">Read More</a>
                    </div>
                    <div class="roadmap-image">
                        <img src="/newnetwork/images/map.svg" alt="Minter Roadmap">
                    </div>
                </div>
                <div class="coming" id="coming">
                    <h3>Coming in 2022–2023</h3>
                    <ul>
                        <li>Smart Contracts</li>
                        <li>NFTs</li>
                        <li>Crypto Loans</li>
                        <li>Honee Crypto Wallet Release</li>
                        <li>DApp for Cross-Chain Transfers</li>
                        <li>SDK for Metaverse Items and NFTs</li>
                        <li>MultiSwap/MultiTransaction Functionality</li>
                    </ul>
                </div>
                <div class="completed" id="completed">
                    <h3>Completed in 2021</h3>
                    <div class="completed_timeline">
                        <div class="completed_outer">
                            <div class="completed_card" id="timeline_1">
                                <div class="completed_info">
                                    <h4>Minter 2 Launch</h4>
                                    <p>The Minter network had a major upgrade on April 12, 2021. Its main goal was to lay down a unique infrastructure for decentralized trading, cross-chain transfers, and DeFi earning opportunities (for liquidity providers, traders, lenders, and borrowers alike).</p>
                                    <p>This upgrade has brought Minter closer than ever to fulfilling its original vision for an efficient, blockchain-powered Internet of Money architecture.</p>
                                    <p class="timeline_links">
                                        <a href="https://coinmarketcal.com/en/event/minter-2-launch-58690" target="_blank" rel="nofollow">Calendar Event</a>
                                        <a href="https://minterteam.medium.com/minter-2-on-chain-automated-market-maker-with-order-book-e29b19fc365f" target="_blank" rel="nofollow">Read More</a>
                                    </p>
                                </div>
                            </div>
                            <div class="completed_card" id="timeline_2">
                                <div class="completed_info">
                                    <h4>Token Burn</h4>
                                    <p>On May 15, 2021, MDF (Minter Development Foundation) burned 385 000 000 BIP, or 9.3% of current supply (~$8,000,000 at the time).</p>
                                    <p>That volume was forever removed from circulation and therefore will never enter the market.</p>
                                    <p>Deflationary mechanisms such as limited supply, burn of coins, and gradual decrease of rewards for generating new blocks have proved efficient in strengthening the tokenomics of many blockchains.</p>
                                    <p class="timeline_links">
                                        <a href="https://coinmarketcal.com/en/event/300-million-bip-burn-66859" target="_blank" rel="nofollow">Calendar Event</a>
                                        <a href="https://minterteam.medium.com/a-385-million-bip-burn-dedicated-to-launch-day-8426f93881aa" target="_blank" rel="nofollow">Read More</a>
                                    </p>
                                </div>
                            </div>
                            <div class="completed_card" id="timeline_3">
                                <div class="completed_info">
                                    <h4>BIPX Token Launch</h4>
                                    <p>BIPx is a wrapped version of BIP on Ethereum and BNB Smart Chain. BIPx unlocks the best of global decentralized finance (DeFi) and helps users earn with just one of the Minter wallets at hand.</p>
                                    <p class="timeline_links">
                                        <a href="https://coinmarketcal.com/en/event/token-launch-71586" target="_blank" rel="nofollow">Calendar Event</a>
                                        <a href="https://minterteam.medium.com/how-to-make-money-on-defi-with-bipx-17905b034285" target="_blank" rel="nofollow">Read More</a>
                                    </p>
                                </div>
                            </div>
                            <div class="completed_card" id="timeline_4">
                                <div class="completed_info">
                                    <h4>HONEE Wallet Launch</h4>
                                    <p>The alpha launch of HONEE, the simplest crypto wallet that helps users earn.</p>
                                    <p class="timeline_links">
                                        <a href="https://coinmarketcal.com/en/event/honee-wallet-launch-88666" target="_blank" rel="nofollow">Calendar Event</a>
                                        <a href="https://medium.com/@honeeapp/honee-crypto-wallet-that-helps-users-earn-e6ae3088963d" target="_blank" rel="nofollow">Read More</a>
                                        <a href="https://honee.app/" target="_blank">Try HONEE</a>
                                    </p>
                                </div>
                            </div>
                            <div class="completed_card" id="timeline_5">
                                <div class="completed_info">
                                    <h4>Listing of popular cryptos on Minter</h4>
                                    <p>Launch of the Minter Hub bridge has made it possible to move tokens between the networks. As of the end of 2021, support has been added for the following top coins:<br>
                                    BTC, ETH, BNB, USDT, USDС, 1INCH, TON COIN, SHIB, METAVERSE INDEX, DAI, PAX, BUSD, BIP, HUB, and more.</p>
                                    <p class="timeline_links">
                                        <a href="https://minterteam.medium.com/listing-tokens-on-minter-ce70f26e1a08" target="_blank" rel="nofollow">Read More</a>
                                    </p>
                                </div>
                            </div>
                            <div class="completed_card" id="timeline_6">
                                <div class="completed_info">
                                    <h4>Minter 2.6 Update</h4>
                                    <p>With this update, Minter has revolutionized DeFi protocols by introducing On-Chain Automated Market Maker with Order Book (AMMOB).</p>
                                    <p>Being a decentralized assets marketplace, Minter now lets its users place and execute limit orders in order to buy or sell any crypto at a pre-determined rate. Limit orders are located inside the liquidity pools themselves.</p>
                                    <p class="timeline_links">
                                        <a href="https://coinmarketcal.com/en/event/minter-update-95562" target="_blank" rel="nofollow">Calendar Event</a>
                                        <a href="https://t.me/MinterTeam/635" target="_blank" rel="nofollow">Read More</a>
                                    </p>
                                </div>
                            </div>
                            <div class="completed_card" id="timeline_7">
                                <div class="completed_info">
                                    <h4>Minter Hub 2 Launch</h4>
                                    <p>
                                        <ul>
                                            <li><b>Easy modular connection</b> <br>unlocks access to assets, liquidity, and DeFi tools on other blockchains without the need to re-write the code. The new release already has BSC integrated.</li>
                                            <li><b>Revamped cross-chain fees mechanism</b> <br>allows you to get cashback in cases when the actual fee turns out to be less than what you have already paid.</li>
                                            <li><b>Support for native ETH</b> <br>allows you to forget about converting into wETH.</li>
                                            <li><b>Discounts for HUB holders</b> <br>are as simple as it gets—hold the HUB token on your balance and move your tokens between the networks at a smaller fee.</li>
                                            <li><b>Cross-chain DeFi</b> <br>and its full-fledged interoperability with other chains allows you to make not only transfers, but also any other operations—including farming, staking, lotteries, loans, etc. And you can still pay the fee in any liquid coin on Minter Network.</li>
                                        </ul>
                                    </p>
                                    <p class="timeline_links">
                                        <a href="https://coinmarketcal.com/en/event/minter-hub-2-launch-95561" target="_blank" rel="nofollow">Calendar Event</a>
                                        <a href="https://t.me/minterdev/253" target="_blank" rel="nofollow">Read More</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="completed">
                    <h3>Completed in 2019–2020</h3>
                    <div class="completed-block">
                        <div class="completed-item" id="completed-item-1">
                            <small>15 May 2019</small>
                            <h4>Minter Mainnet Launch</h4>
                        </div>
                        <div class="completed-item" id="completed-item-2">
                            <small>6 March 2020</small>
                            <h4>Minter v1.1.0</h4>
                            <p>The first major update of the network after its launch, which included: limited coin supply, multisig wallets, console node management tool, redesigned database, code refactoring and optimization.</p>
                            <p class="timeline_links">
                                <a href="https://medium.com/@minterteam/minter-v1-1-0-d73281a95809" target="_blank" rel="nofollow">Read More</a>
                            </p>
                        </div>
                        <div class="completed-item" id="completed-item-3">
                            <small>23 March 2020</small>
                            <h4>Minter Link Protocol</h4>
                            <p>Minter Link is a protocol that allows the user to go to the mobile wallet application or to its web version with a pre-formed transaction that only needs to be signed.</p>
                            <p class="timeline_links">
                                <a href="https://github.com/MinterTeam/minter-link-protocol" target="_blank" rel="nofollow">Read More</a>
                            </p>
                        </div>
                        <div class="completed-item" id="completed-item-4">
                            <small>1 July 2020</small>
                            <h4>BIP Wallet 2.0</h4>
                            <p>After two weeks of open beta testing, the updated BIP Wallet 2.0 was released on July 1st. A completely redesigned interface with multiaddresses allows you to manage your funds more quickly and comfortably.</p>
                            <p class="timeline_links">
                                <a href="https://medium.com/@minterteam/bip-wallet-2-0-review-d019e933b0b6" target="_blank" rel="nofollow">Read More</a>
                            </p>
                        </div>
                        <div class="completed-item" id="completed-item-5">
                            <small>10 July 2020</small>
                            <h4>More than 32 projects on the Minter blockchain</h4>
                            <p>A little more than a year since the launch of the Minter mainnet, many projects were launched that work on the basis of or using the Minter blockchain.</p>
                            <p class="timeline_links">
                                <a href="https://vc.ru/crypto/140966-top-32-russkih-proekta-blokcheyna-minter-v-pervyy-god" target="_blank" rel="nofollow">Read More</a>
                            </p>
                        </div>
                        <div class="completed-item" id="completed-item-6">
                            <small>19 October 2020</small>
                            <h4>Minter 1.2</h4>
                            <p>The second important update of the Minter network included: archiving coins, changing the stake calculation formula, limiting the number of validators, on-chain BIP price, new voting transactions.</p>
                            <p class="timeline_links">
                                <a href="https://medium.com/@danillashin/minter-1-2-b015670c6ae4" target="_blank" rel="nofollow">Read More</a>
                            </p>
                        </div>
                        <div class="completed-item" id="completed-item-7">
                            <small>2 November 2020</small>
                            <h4>Minter Wallet</h4>
                            <p>Minter Wallet is a wallet where businesses can accrue loyalty points and rewards, and customers, use them.</p>
                            <p class="timeline_links">
                                <a href="https://medium.com/@minterteam/wallet-for-loyalty-rewards-platforms-minter-wallet-%CE%B2-65a7f87751cf" target="_blank" rel="nofollow">Read More</a>
                            </p>
                        </div>
                        <div class="completed-item" id="completed-item-8">
                            <small>End of 2020</small>
                            <h4>HUB token release</h4>
                            <p>Minter Hub is a blockchain bridging Minter, Ethereum, and BNB Smart Chain (BSC). Solana, Cardano, Polygon, Terra, Tron, and other popular networks will be interconnected in the near future.</p>
                            <p class="timeline_links">
                                <a href="https://minterteam.medium.com/hub-token-of-the-minter-hub-blockchain-69a3f2605ffd" target="_blank" rel="nofollow">Read More</a>
                            </p>
                        </div>
                        <div class="completed-item" id="completed-item-9">
                            <small>December 2020</small>
                            <h4>Pinpon release</h4>
                            <p>Pinpon is a platform for acquiring customers on social media via innovative draws. Pinpon uses blockchain technology as a new standard for data storage.</p>
                            <p class="timeline_links">
                                <a href="https://medium.com/gromorg/how-to-launch-a-promo-set-up-an-interaction-with-pinpon-9b1d68648109" target="_blank" rel="nofollow">Read More</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="tech" id="tech">
            <div class="container">
                <h2>Tech Side</h2>
                <p>In our docs, we’ve covered everything you need to know in order to start maintaining the Minter network, build services and applications on top of it, or integrate it into your organization’s operations.</p>
                <div class="tech_a">
                    <a class="tech_git" href="https://github.com/MinterTeam" target="_blank" rel="nofollow">GitHub</a>
                    <a class="tech_api" href="https://www.minter.network/docs#node-api" target="_blank">API</a>
                    <a class="tech_sdk" href="https://www.minter.network/docs#minter-sdks" target="_blank">SDK</a>
                    <a class="tech_doc" href="https://www.minter.network/docs" target="_blank">Docs</a>
                    <a class="tech_wp" href="https://www.minter.network/files/Minter_White_Paper.pdf" target="_blank">Whitepaper</a>
                    <a class="tech_cons" href="https://console.minter.network/" target="_blank">Console</a>
                </div>
            </div>
        </section>
        <section class="social" id="social">
            <div class="container">
                <h2>Social Media</h2>
                <p>Follow all of our news, announcements, and content updates across social networks and instant messengers.</p>
                <div class="social-links">
                    <div class="social-link"><img src="/newnetwork/images/social_md.svg" alt="Minter Medium"><a href="https://medium.com/@MinterTeam" target="_blank" rel="nofollow">Medium</a></div>
                    <div class="social-link"><img src="/newnetwork/images/social_rd.svg" alt="Minter Reddit"><a href="https://www.reddit.com/r/Minter/" target="_blank" rel="nofollow">Reddit</a></div>
                    <div class="social-link"><img src="/newnetwork/images/social_tw.svg" alt="Minter Twitter"><a href="https://twitter.com/MinterTeam" target="_blank" rel="nofollow">Twitter</a></div>
                    <!--<div class="social-link"><img src="/newnetwork/images/social_fb.svg" alt="Minter Facebook"><a href="https://www.facebook.com/MinterNetwork" target="_blank" rel="nofollow">Facebook</a></div>-->
                    <div class="social-link"><img src="/newnetwork/images/social_tc.svg" alt="Minter Telegram Channel"><a href="tg://resolve?domain=MinterTeam" target="_blank" rel="nofollow">Telegram Channel</a></div>
                    <div class="social-link"><img src="/newnetwork/images/social_tc.svg" alt="Minter Telegram Group"><a href="tg://join?invite=EafyERJSJZJ-nwH_139jLQ" target="_blank" rel="nofollow">Telegram Group</a></div>
                    <div class="social-link"><img src="/newnetwork/images/social_cmc.svg" alt="Minter CoinMarketCap"><a href="https://coinmarketcap.com/currencies/minter-network/" target="_blank" rel="nofollow">CoinMarketCap</a></div>
                    <div class="social-link"><img src="/newnetwork/images/social_cg.svg" alt="Minter CoinGecko"><a href="https://www.coingecko.com/en/coins/bip" target="_blank" rel="nofollow">CoinGecko</a></div>
                </div>
            </div>
        </section>
        <section class="hub" id="hub">
            <div class="container">
                <h2>Discover HUB Token</h2>
                <div class="discover-hub">
                    <div class="discover-img"><img src="/newnetwork/images/hub.svg" alt="Minter Hub token" /></div>
                    <div class="discover-th">Current price <span>${{ pretty(hubPrice) }}</span></div>
                    <div class="discover-th">Start price <span>$0.11</span></div>
                    <div class="discover-th">Max supply <span>1 000 000</span></div>
                    <div class="discover-th">Pools <span><a href="https://explorer.minter.network/pools/HUB/BNB" target="_blank">Minter</a> <a href="https://pancakeswap.finance/info/pool/0x45dfb47641109e2edb7fc4a0fb300b42c2d1f5b0" target="_blank" rel="nofollow">BNB Smart Chain</a></span></div>
                    <a class="btn" href="https://minter.network/hub" target="_blank" v-track-click="'hub'">Read More</a>
                </div>
                <p><a href="https://etherscan.io/token/0x8e9A29e7Ed21DB7c5B2E1cd75e676dA0236dfB45" target="_blank" rel="nofollow">HUB</a> is the native token of the Minter Hub blockchain that’s bridging Minter with Ethereum and BNB Smart Chain. HUB is a PoS token, so oracles receive 1% on the fees charged for cross-chain transfers. HUB also serves as reserve for DEX pools both on Minter and Ethereum/BNB Smart Chain.</p>
            </div>
            <Footer class="footer--transparent"/>
        </section>
    </div>
</template>
