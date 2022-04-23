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
        const title = 'Cross-Chain Smart Contracts for Earning Crypto';
        const description = 'Minter Hub is a bridge to global crypto liquidity, a standalone blockchain with the unique cross-chain smart contracts technology for earning crypto.';
        // const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

        return {
            title: title + ' | Minter Network',
            meta: [
                { hid: 'og-title', name: 'og:title', content: title },
                { hid: 'description', name: 'description', content: description },
                { hid: 'og-description', name: 'og:description', content: description },
                { hid: 'og-image', name: 'og:image', content: `/newnetwork/images/hub/meta_en.png` },
            ],
            link: [
                { rel: 'canonical', href: `${HOST}/hub`},
                { rel: 'stylesheet', href: '/newnetwork/hub.css', hid: 'newnetwork-hub-style'},
                { rel: 'stylesheet', href: '/newnetwork/hub320.css', media: 'screen and (max-width: 732px)', hid: 'newnetwork-hub-style320'},
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
        const style = document.querySelector('[data-hid="newnetwork-hub-style"]');
        const style320 = document.querySelector('[data-hid="newnetwork-hub-style320"]');
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
                    <div class="logo"><a href="/"><img src="/newnetwork/images/hub.svg" alt="Minter Hub"/> Minter Hub</a></div>
                    <div class="menu">
                        <language class="" :locales='[{"code":"","name":"English"},{"code":"ru","name":"Russian"}]' lang="" :push="true"/>
                    </div>
                </div>
                <div class="hello">
                    <div class="hello-content">
                        <h1>Cross-Chain Smart Contracts for Earning Crypto</h1>
                        <div class="hello-buttons">
                            <a class="btn" href="https://console.minter.network/" target="_blank" v-track-click="'start-earning'">Start Earning</a>
                            <a class="btn btn-alt-2" href="https://my.honee.app/swap/HUB" target="_blank" v-track-click="'buy-hub'">Buy HUB</a>
                        </div>
                        <p>Minter Hub is a bridge to global crypto liquidity, a standalone blockchain with the unique cross-chain smart contracts technology for earning crypto.</p>
                    </div>
                </div>
            </div>
            <div class="stat-bar">
                <div class="container">
                    <div class="stat-items">
                        <div class="stat-item">
                            <small>Mainnet Launch</small>
                            <div>April 2021</div>
                        </div>
                        <div class="stat-item">
                            <small>Market Cap</small>
                            <div>$42 000 000</div>
                        </div>
                        <div class="stat-item">
                            <small>Circulating Supply</small>
                            <div>5%</div>
                        </div>
                        <div class="stat-item">
                            <small>HUB Staking</small>
                            <div>Up to 1%</div>
                            <div class="stat-item-explanation">from all cross-chain transactions</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <section class="earn" id="earn">
            <div class="container">
                <h2>Earn crypto with Minter Hub Tools</h2>
                <div class="earn-tools">
                    <div class="tool earn-1">
                        <img src="/newnetwork/images/hub-staking.svg" alt="HUB Staking">
                        <h3>HUB Staking</h3>
                        <p>Delegate HUB to oracles and receive portion of fees.</p>
                        <a href="https://www.minter.network/earn/hub-staking" target="_blank" class="btn btn-alt">Read More</a>
                    </div>
                    <div class="tool earn-2">
                        <img src="/newnetwork/images/farming.svg" alt="Farming">
                        <h3>Farming</h3>
                        <p>Get additional reward for the very fact of locking your assets.</p>
                        <a href="https://www.minter.network/earn/farm" target="_blank" class="btn btn-alt">Read More</a>
                    </div>
                    <div class="tool earn-3">
                        <img src="/newnetwork/images/hub/hubbnb.svg" alt="Liquidity Pools">
                        <h3>Liquidity Pools</h3>
                        <p>Let other traders make operations using your funds—and get your share out of each trade.</p>
                        <a href="https://www.minter.network/earn/earn-liquidity-pools" target="_blank" class="btn btn-alt">Read More</a>
                    </div>
                    <div class="tool earn-4">
                        <img src="/newnetwork/images/hub/bridge.svg" alt="Cross-chain Bridge">
                        <h3>Cross-chain Bridge</h3>
                        <p>Users who provide liquidity to the cross-chain bridge will earn on the commissions received for cross-chain transfers and swaps.</p>
                        <div class="tool-soon">Coming 2022</div>
                    </div>
                    <div class="tool earn-5">
                        <img src="/newnetwork/images/hub/single-asset.svg" alt="Crowd Pools">
                        <h3>Crowd Pools</h3>
                        <p>Into a pair of two tokens, provide only the one that you have.</p>
                        <div class="tool-soon">Coming 2022</div>
                    </div>
                    <div class="tool earn-6">
                        <img src="/newnetwork/images/hub/smarts.svg" alt="Smart Contracts">
                        <h3>Smart Contracts</h3>
                        <p>Secure cross-chain smart contracts tailored to all users. Advanced mode for developers and non-dev mode for simple deployment.</p>
                        <div class="tool-soon">Coming 2022</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="half section-mob-reverse">
            <div class="container">
                <div class="half-content">
                    <div class="half-block">
                        <h2>Smart Contracts</h2>
                        <p>Smart contracts will be based on a regular Ethereum node with a modified consensus—the Hub’s oracles will act as validators. The EVM itself will be without modifications, so all smart contracts can be deployed to the network without changes.</p>
                        <p>The smart contracts will come in two modes: an advanced one for developers and a non-dev one for simple deployment.</p>
                    </div>
                    <div class="half-block half-block-img">
                        <img src="/newnetwork/images/hub/block-smarts.svg" alt="Smart Contracts" id="block-img-smarts">
                    </div>
                </div>
            </div>
        </section>
        <section class="half">
            <div class="container">
                <div class="half-content">
                    <div class="half-block half-block-img">
                        <img src="/newnetwork/images/hub/block-how.svg" alt="How It Works" id="block-img-how">
                    </div>
                    <div class="half-block">
                        <h2>How It Works</h2>
                        <p>Minter Hub is a standalone blockchain with its own validators (oracles) that are connected to all networks at once (Minter, Ethereum, BSC) and have access to the multi-signature wallets on each.</p>
                        <p>Oracles lock the coin on one network and issue its ‘mirrored’ version on the other.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="half section-mob-reverse">
            <div class="container">
                <div class="half-content">
                    <div class="half-block">
                        <h2>Oracles</h2>
                        <p>Minter Hub was designed to have 16 oracles and run on the PoS consensus, which means using stake as collateral in order to vote on blocks. If necessary, however, the decision on changing the rules and code can be made by blockchain’s oracles.</p>
                        <p>Cross-chain transfers are the new era of sovereign blockchains. They ensure not only the communication among the networks, but also reliable, fast, and secure decentralized transactions that no one can cancel, alter, or censor.</p>
                    </div>
                    <div class="half-block half-block-img">
                        <img src="/newnetwork/images/hub/block-oracles.svg" alt="Oracles" id="block-img-oracles">
                    </div>
                </div>
            </div>
        </section>
        <section class="speed">
            <div class="container">
                <h2>Speed and Cost</h2>
                <p>For example, Minter ⇔ Ethereum transactions take an average <b>20–60 seconds</b>, which is pretty fast for cross-chain transfers. At the same time, it is quite expensive as truly decentralized processing requires a large amount of fees. On Ethereum, cross-chain fees are charged for each oracle’s signature, and on top of that, <b>1%</b> goes to Minter Hub oracles as a service fee.</p>
            </div>
        </section>
        <section class="products">
            <div class="container">
                <h2>Products</h2>
                <div class="products-block">
                    <div class="product">
                        <h3><img src="/newnetwork/images/wallet-minter.svg" alt="Minter DEX" class="product-logo">Minter DEX</h3>
                        <p>Minter, a digital assets marketplace allowing anyone to buy, sell, send, and spend BTC, ETH, BIP, USDC, and more</p>
                        <a href="https://www.minter.network/" target="_blank" class="btn btn-alt">Learn More</a>
                        <img src="/newnetwork/images/hub/p1.svg" alt="Minter DEX" class="product-bg" id="p1">
                    </div>
                    <div class="product">
                        <h3><img src="/newnetwork/images/honee.svg" alt="Honee" class="product-logo">Honee</h3>
                        <p>Honee, a wallet that makes crypto money easier for everyone—from students to small businesses</p>
                        <a href="https://honee.app/" target="_blank" class="btn btn-alt">Learn More</a>
                        <img src="/newnetwork/images/hub/p2.svg" alt="Honee" class="product-bg" id="p2">
                    </div>
                    <div class="product">
                        <h3><img src="/newnetwork/images/hub-logo.svg" alt="Minter" class="product-logo">Cross-chain bridge DApp</h3>
                        <p>A web interface letting you move tokens across the networks in a user-oriented environment</p>
                        <div class="product-soon">Coming 2022</div>
                        <img src="/newnetwork/images/hub/p3.svg" alt="Cross-chain bridge DApp" class="product-bg" id="p3">
                    </div>
                </div>
            </div>
        </section>
        <section class="half">
            <div class="container">
                <div class="half-content">
                    <div class="half-block half-block-img">
                        <img src="/newnetwork/images/hub/block-listing.svg" alt="Cross-Chain Listing of Tokens" id="block-img-listing">
                    </div>
                    <div class="half-block">
                        <h2>Cross-Chain Listing of Tokens</h2>
                        <p>Any existing project’s ERC-20 token can be included in the list of cross-chain tokens. There are three main ways to make a cross-chain listing of an Ethereum token on Minter.</p>
                        <a href="https://minterteam.medium.com/cross-chain-listing-of-ethereums-erc-20-tokens-on-minter-e85e9f3bb028" target="_blank" rel="nofollow" class="btn btn-alt">Read More</a>
                    </div>
                </div>
            </div>
        </section>
        <section class="hub-section">
            <div class="container">
                <div class="hubtoken">
                    <div class="hubtoken-top">
                        <div class="hubtoken-img">
                            <img src="/newnetwork/images/hub-logo.svg">
                        </div>
                        <div class="hubtoken-text">
                            <h2>HUB Token</h2>
                            <p>HUB is the Minter Hub network’s native token, whose supply is 1,000,000 units.</p>
                        </div>
                    </div>
                    <p>At the moment, HUB is minted on the Ethereum (ERC-20) and Minter networks with no lock-up periods or any other limitations, meaning the token is completely free to circulate.</p>
                    <p>It is impossible to increase the number of tokens (exceed the maximum supply). If tokens need to be burned or released, Minter Hub oracles take a vote.</p>
                </div>
                <h2>Current HUB distribution</h2>
                <div class="hub-distribution">
                    <div class="hub-distribution-block">
                        <span>Fund</span>
                        950,000 tokens
                    </div>
                    <div class="hub-distribution-block">
                        <span>Minter community</span>
                        50,000 tokens
                    </div>
                </div>
                <p>In the future, tokens on the fund’s part can be sold to investors or customers, accrued as rewards, or credited as payment for services. Below is the list of prospective blockchain participants and HUB token holders as we see it:</p>
                <ul>
                    <li>Team</li>
                    <li>Investors (with smart contract-based vesting of 3–5 years)</li>
                    <li>Oracles</li>
                    <li>Members of the community</li>
                    <li>Partners (marketing, legal, exchange)</li>
                    <li>Market makers</li>
                </ul>
                <p>In addition to the 50,000 tokens already in circulation, an additional 50,000 tokens (max.) may be issued in 2021. The fund and the team will jointly develop a specific supply distribution roadmap in the beginning of 2022 once the bridge’s main launch stages have been completed and blockchains, integrated.</p>
                <p>It’s already become standard practice for DeFi projects—e.g., Uniswap and 1inch—to distribute initial supply to the community and customers for free and subsequent issuance, to the team, investors, partners, and other useful participants.</p>
            </div>
        </section>
        <section class="footer-section">
            <div class="container">
                <Footer class="footer--transparent"/>
                </div>
        </section>
    </div>
</template>
