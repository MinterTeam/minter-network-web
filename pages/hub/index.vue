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
        // const bipPricePromise = getStatus()
        //     .then((status) => {
        //         this.bipPrice = status.bipPriceUsd;
        //     });

        const poolsPromise = Promise.all([
                // getPool('USDCE', 'USDTE'),
                getPool('HUB', 'MUSD'),
                // getPool('HUB', 'HUBABUBA'),
            ])
            .then((pools) => {
                // this.pools = pools;
                this.hubPrice = pools[0].amount1 / pools[0].amount0;
            });

        return Promise.all([
            // bipPricePromise,
            poolsPromise,
        ]);
    },
    head() {
        const title = 'Cross-Chain Bridge to Global Crypto Liquidity';
        const description = 'Minter Hub is a blockchain bridging Minter, Ethereum, and Binance Smart Chain (BSC). Polkadot, Cardano, Solana, and other popular networks will be interconnected in the near future.';
        // const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

        return {
            title: title + ' | Minter Network',
            meta: [
                { hid: 'og-title', name: 'og:title', content: title },
                { hid: 'description', name: 'description', content: description },
                { hid: 'og-description', name: 'og:description', content: description },
                // { hid: 'og-image', name: 'og:image', content: `/bipx/images/bipx-meta.png` },
            ],
            link: [
                { rel: 'canonical', href: `${HOST}/hub`},
                { rel: 'stylesheet', href: '/hub/style.css', hid: 'hub-style'},
                { rel: 'stylesheet', href: '/hub/style320.css', media: 'screen and (max-width: 730px)', hid: 'hub-style320'},
            ],
        };
    },
    data() {
        return {
            bipPrice: 0,
            hubPrice: 0,
            pools: [],
        };
    },
    mounted() {
        // move landing styles under global styles
        const style = document.querySelector('[data-hid="hub-style"]');
        const style320 = document.querySelector('[data-hid="hub-style320"]');
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
        // apy(pool) {
        //     return getApy(pool.tradeVolumeBip1D, pool.liquidityBip);
        // },
    },
};
</script>

<template>
    <div class="page--hub">
        <div class="bg_top">
            <header>
                <div class="logo"><img src="/hub/images/logo.svg" /></div>
                <div class="lang"><language class="" :locales='[{"code":"","name":"English"},{"code":"ru","name":"Russian"}]' lang="" :push="true"/></div>
            </header>
            <div class="home_top">
                <h1>Cross-Chain Bridge to Global Crypto Liquidity</h1>
                <p>Minter Hub is a blockchain bridging Minter, Ethereum, and Binance Smart Chain (BSC). Polkadot, Cardano, Solana, and other popular networks will be interconnected in the near future.</p>
                <a class="btn" href="https://app.1inch.io/#/1/swap/USDT/0x8e9A29e7Ed21DB7c5B2E1cd75e676dA0236dfB45" target="_blank" v-track-click="'buyhub'">Buy HUB on Ethereum</a>
                <a class="btn btn_alt" href="https://console.minter.network/buy?coin=HUB" target="_blank" v-track-click="'buyhubminter'">Buy HUB on Minter</a>
            </div>
        </div>
        <div class="wrap figures">
            <h2>In Figures</h2>
            <div class="figures_flx">
                <div class="figure">
                    <span>Launch</span>
                    April 2021
                </div>
                <div class="figure">
                    <span>Transaction Speed</span>
                    20–60 seconds
                </div>
                <div class="figure">
                    <span>Oracles</span>
                    11
                </div>
                <div class="figure">
                    <span>Cross-Chain Volume</span>
                    Over $10 000 000
                </div>
                <div class="figure">
                    <span>HUB Token Supply</span>
                    1 000 000 HUB
                </div>
                <div class="figure">
                    <span>HUB Pools’ Rewards</span>
                    Up to 146% APY
                </div>
                <div class="figure">
                    <span>Staking Rewards</span>
                    Up to 1% from all cross-chain transactions
                </div>
            </div>
        </div>
        <div class="how">
            <h2>How It Works</h2>
            <p>Minter Hub is a standalone blockchain with its own validators (oracles) that are connected to all networks at once (Minter, Ethereum, BSC) and have access to the multi-signature wallets on each.</p>
            <p>Oracles lock the coin on one network and issue its ‘mirrored’ version on the other.</p>
        </div>
        <div class="oracles">
            <h2>Oracles</h2>
            <p>Minter Hub was designed to have 16 oracles and run on the PoS consensus, which means using stake as collateral in order to vote on blocks. If necessary, however, the decision on changing the rules and code can be made by blockchain’s oracles.</p>
            <p>Cross-chain transfers are the new era of sovereign blockchains. They ensure not only the communication among the networks, but also reliable, fast, and secure decentralized transactions that no one can cancel, alter, or censor.</p>
        </div>
        <div class="wrap speedcost">
            <h2>Speed and Cost</h2>
            <p>For example, Minter ⇔ Ethereum transactions take an average <b>20–60 seconds</b>, which is pretty fast for cross-chain transfers. At the same time, it is quite expensive as truly decentralized processing requires a large amount of fees. On Ethereum, cross-chain fees are charged for each oracle’s signature, and on top of that, <b>1%</b> goes to Minter Hub oracles as a service fee.</p>
        </div>
        <div class="products">
            <h2>Products</h2>
            <div class="products_flx">
                <div class="product">
                    <div class="product_img"><img src="/hub/images/minter.svg" /></div>
                    <p>Minter, a digital assets marketplace allowing anyone to buy, sell, send, and spend BTC, ETH, BIP, USDC, and more</p>
                    <a class="btn btn_c2" href="https://www.minter.network/" v-track-click="'minter'">Learn More</a>
                </div>
                <div class="product">
                    <div class="product_img"><img src="/hub/images/honee.svg" /></div>
                    <p>Honee, a wallet that makes crypto money easier for everyone—from students to small businesses</p>
                    <!--<a class="btn btn_c2" href="#">Learn More</a>-->
                </div>
            </div>
        </div>
        <div class="hubtoken_bg">
            <div class="wrap hubtoken">
                <div class="hubtoken_top">
                    <div class="hubtoken_img"><img src="/hub/images/hub.svg" /></div>
                    <div class="hubtoken_t"><span>HUB Token</span> HUB is the Minter Hub network’s native token, whose supply is 1,000,000 units.</div>
                </div>
                <p>At the moment, HUB is minted on the Ethereum (ERC-20) and Minter networks with no lock-up periods or any other limitations, meaning the token is completely free to circulate.</p>
                <p>It is impossible to increase the number of tokens (exceed the maximum supply). If tokens need to be burned or released, Minter Hub oracles take a vote.</p>
            </div>
        </div>
        <div class="wrap">
            <h2>Current HUB distribution</h2>
            <div class="figures_flx">
                <div class="figure">
                    <span>Fund</span>
                    948,442 tokens
                </div>
                <div class="figure">
                    <span>Minter community</span>
                    51,558 tokens
                </div>
            </div>
            <div class="currenthub_txt">
                <p>In the future, tokens on the fund’s part can be sold to investors or customers, accrued as rewards, or credited as payment for services. Below is the list of prospective blockchain participants and HUB token holders as we see it:</p>
                <ul class="list">
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
        </div>
        <div class="wrap">
            <div class="tokenomics1">
                <h2>Tokenomics</h2>
                <p>In 2021, we see three main use cases for HUB tokens to create a growing blockchain economy and long-term balance of power: Staking, Fee Discounts & Tips.</p>
            </div>
            <div class="tokenomics2">
                <div class="tokenomics_top">
                    <div class="tokenomics_ico"><img src="/hub/images/tokenomics2.svg" /></div>
                    <div class="tokenomics_t">Staking</div>
                </div>
                <p>HUB holders may stake their tokens with oracles and receive up to 1% on all cross-chain transfers made via Minter Hub. For example, when someone transfers 100 USDT from Minter network to Ethereum, 1 USDT is paid out to oracles proportionally to their stake in Minter Hub.</p>
                <p>In turn, Minter Hub oracles need to stake HUBs for transactions to be processed fairly and blocks to be formed. For that, they receive 1% of the fees charged for all transfers between the networks and share that income with their stakers.</p>
            </div>
            <div class="tokenomics3">
                <div class="tokenomics_top">
                    <div class="tokenomics_ico"><img src="/hub/images/tokenomics3.svg" /></div>
                    <div class="tokenomics_t">Discounts for HUB Holders</div>
                </div>
                <p>Bearing in mind that the 1-percent cross-chain transfer fee could be high for professional players who trade in big volumes, we also realize that oracles need to be interested in maintaining the Minter Hub network in the long run. That is why we are going to introduce the following discount system for HUB holders.</p>
                <p>The HUB token will reduce fees for cross-chain transfers across Minter, Ethereum, and Binance Smart Chain. Since all three addresses are managed by one seed phrase, it was proposed to lower the fees for those who hold HUB on any of them. By default, the fee is 1% for any transfer between the networks, but the availability of tokens (regular HODLing) will give the following discounts:</p>
                <div class="tokenomics_lists">
                    <div class="tokenomics_list"><div><span>1 HUB</span> -10%</div></div>
                    <div class="tokenomics_list"><div><span>2 HUB</span> -20%</div></div>
                    <div class="tokenomics_list"><div><span>4 HUB</span> -30%</div></div>
                    <div class="tokenomics_list"><div><span>8 HUB</span> -40%</div></div>
                    <div class="tokenomics_list"><div><span>16 HUB</span> -50%</div></div>
                    <div class="tokenomics_list active"><div><span>32 HUB</span> -60%</div></div>
                </div>
            </div>
            <div class="tokenomics4">
                <div class="tokenomics_top">
                    <div class="tokenomics_ico"><img src="/hub/images/tokenomics4.svg" /></div>
                    <div class="tokenomics_t">Tips</div>
                </div>
                <p>An important element of tokenomics will be tips about trades and profitable operations carried out using Minter Hub. Any community member will receive tips if they have at least 1 HUB on their address on any of the networks. That way, we’ll help answer the main question of the DeFi market: “How to make money?”</p>
                <p>A distinctive feature of decentralized finance in general is the ability of users to monitor the actions of various addresses and copy successful transactions. Until now, the so-called “social trading” was only available in closed apps or clubs and mainly in the field of trading. We plan to offer tips across the entire spectrum of financial services—from trading and liquidity management to loans and deposits.</p>
            </div>
        </div>
        <div class="wrap pricing">
            <h2>Pricing</h2>
            <p>The initial supply of <b>50,000 tokens</b> was distributed to the community <b>for free</b>.</p>
            <p>In the very first days, community members launched trading in the <a href="https://v2.info.uniswap.org/pair/0x3796fee2b555da1356cdcd3e1861263b351a58a0" target="_blank" v-track-click="'hubpool'">HUB-USDT</a> pair on Uniswap, setting the starting price at $0.10. The first trade took place <a href="https://etherscan.io/tx/0x9e1e7f6e22022c03bb9e95505126c21644ce3f15b3b5ea1dbbd6d744151faa41" target="_blank">October 27, 2020</a>, when 9 HUBs were bought for $1.</p>
            <div class="pricing_flx">
                <div class="pricing_cur">Current Price <span>${{ pretty(hubPrice) }}</span></div>
                <div class="pricing_buy"><a class="btn" href="https://app.1inch.io/#/1/swap/USDT/0x8e9A29e7Ed21DB7c5B2E1cd75e676dA0236dfB45" target="_blank" v-track-click="'buyhub'">Buy HUB</a></div>
            </div>
            <p>The team does not exclude that it will support listings and integrations in one form or another, including rewards in HUB tokens. But it will not initiate such activities, giving the community complete freedom of action.</p>
        </div>
        <div class="investors">
            <h2>Investors</h2>
            <p>Since the first announcements of Minter Hub, the fund (token holder) has been receiving offers from investors interested in long-term participation in the protocol. We are talking about both venture funds and those focused exclusively on blockchain projects.</p>
            <p>We plan to sell only small portions of tokens, no more than 5% per fund, and always with a lock-up or vesting period of 3–7 years. The longer the period, the higher the discount at the time of purchase.</p>
            <p>Speaking of investors, we mean only qualified legal entities that comply with all laws and regulations in the field of cryptocurrencies in their respective jurisdictions.</p>
        </div>
        <div class="technologies wrap">
            <div class="technologies_top">
                <div>
                    <h2>Technologies</h2>
                    <p>Minter Hub is based on Cosmos SDK and a modified Peggy solution that’s developed by the Cosmos team.</p>
                </div>
            </div>
            <p>The project’s code can be accessed in a public repository: <a href="https://github.com/MinterTeam/minter-hub" target="_blank">https://github.com/MinterTeam/minter-hub</a>.</p>
            <p>Minter Hub is supported by oracles. Here is what they launch on their servers:</p>
            <ul class="list">
                <li>Minter node</li>
                <li>Ethereum node</li>
                <li>Minter Hub node</li>
                <li>Ethereum Orchestrator, software that monitors the events on the Ethereum network and broadcasts them onto Minter Hub. It’s also responsible for sending withdrawal transactions to Ethereum</li>
                <li>Minter Orchestrator, software that monitors the events on the Minter network and broadcasts them onto Minter Hub. It’s also responsible for sending withdrawal transactions to Minter</li>
            </ul>
            <p>Mirrored coins are locked on the MultiSig accounts of Minter Hub validators up until they are requested to be withdrawn.</p>
        </div>
        <div class="bg_bot">
            <footer>
                <div class="logo_bot"><img src="/hub/images/minter.svg" /></div>
                <div class="copy">Copyright © 2019-2021 Minter Development Foundation. All rights reserved.</div>
                <div class="bot_cont">
                    75 Broadway, Suite 202, San Francisco, CA, 94111<br />
                    For correspondence: 548 Market St #32852, San Francisco, CA 94104-5401<br />
                    <a href="mailto:hello@minter.org">hello@minter.org</a>
                </div>
                <div class="clear"></div>
            </footer>
        </div>
    </div>
</template>
