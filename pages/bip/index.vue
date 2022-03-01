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
        const bipPricePromise = getStatus()
            .then((status) => {
                this.bipPrice = status.bipPriceUsd;
                this.marketCap = status.marketCap;
            });

        const poolsPromise = Promise.all([
                getPool('USDCE', 'USDTE'),
                getPool('BEE', 'MUSD'),
                getPool('HUB', 'HUBABUBA'),
                getPool('HUB', 'USDTE'),
                getPool('TON', 'BIP'),
                getPool('SHIB', 'BIP'),
                getPool('METAINDEX', 'BIP'),
                getPool('HUB', 'BIP'),
                getPool('BNB', 'BIP'),
                getPool('BIP', 'USDTE'),
                getPool('UNIBSC', 'BIP'),
                getPool('DOGEBSC', 'BIP'),
                getPool('MATICBSC', 'BIP'),
                getPool('CAKEBSC', 'BIP'),
                getPool('BNB', 'HUB'),
                getPool('DOTBSC', 'BIP'),
                getPool('ALPACA', 'BIP'),
            ])
            .then((pools) => {
                this.pools = pools;
                this.hubPrice = pools[3].amount1 / pools[3].amount0;
            });

        return Promise.all([
            bipPricePromise,
            poolsPromise,
        ]);
    },
    head() {
        const title = 'Minter — Internet of Money';
        const description = 'Minter is a single decentralized network allowing anyone to buy, sell, send, and earn digital assets such as BTC, ETH, USDT, BIP, and much more.';
        // const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

        return {
            title: title + ' | Minter Network',
            meta: [
                { hid: 'og-title', name: 'og:title', content: title },
                { hid: 'description', name: 'description', content: description },
                { hid: 'og-description', name: 'og:description', content: description },
                { hid: 'og-image', name: 'og:image', content: `/bipx/images/bipx-meta.png` },
            ],
            link: [
                { rel: 'canonical', href: `${HOST}/bip`},
                { rel: 'stylesheet', href: '/bipx/style.css?2', hid: 'bipx-style'},
                { rel: 'stylesheet', href: '/bipx/style320.css?2', media: '(max-width: 760px)', hid: 'bipx-style320'},
            ],
        };
    },
    data() {
        return {
            bipPrice: 0,
            marketCap: 0,
            hubPrice: 0,
            pools: [],
        };
    },
    mounted() {
        // move landing styles under global styles
        const style = document.querySelector('[data-hid="bipx-style"]');
        const style320 = document.querySelector('[data-hid="bipx-style320"]');
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
        usdPrice(bipValue) {
            return bipValue * (this.bipPrice || 0);
        },
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
        <div class="promo-top">
            <div>Minter 3 Tokenomics Update Coming Spring 2022. <a href="https://www.minter.network/torronet" target="_blank">Learn more</a></div>
        </div>
        <div class="u-container u-container--full index-language lang-wrap">
            <language class="" :locales='[{"code":"","name":"English"},{"code":"ru","name":"Russian"}]' lang="" :push="true"/>
        </div>
        <header>
            <div class="top_r">
                <div class="logo"><a href="#"><img src="/img/minter-logo-white.svg" width="155" height="48" alt="Minter"/></a></div>
                <h1>Internet of Money</h1>
                <div class="top_e">Minter is a single decentralized network allowing anyone to buy, sell, send, and earn digital assets such as BTC, ETH, USDT, BIP, and much more.</div>
                <p><b>Buy BIP on:</b></p>
                <nuxt-link class="btn btn-img" to="/how-to-buy-and-sell-bip" v-track-click="'buy-bip'"><img src="/bipx/images/logos/minter_w.png" srcset="/bipx/images/logos/minter_w@2x.png 2x, /bipx/images/logos/minter_w@3x.png 3x" />Minter</nuxt-link>
                <a class="btn btn_c2 btn-img" href="https://v2.info.uniswap.org/pair/0xb1700c93ddc26ce1d59441c24daef1035444d7b7" target="_blank" v-track-click="'buy-bipx'"><img src="/bipx/images/logos/ethereum.svg" />Ethereum</a>
                <a class="btn btn_c2 btn-img" href="https://pancakeswap.finance/info/pool/0xf51e1b34be6f2ddac9d3f4e6186b772ae4ae3855" target="_blank" v-track-click="'buy-bipx'"><img src="/bipx/images/logos/bsc.svg" />BSC</a>
                <!--<a class="btn btn_c2 btn_nomargin" href="https://minterteam.medium.com/bipx-usdt-farming-at-0-2-giveaway-fa2c30a09e18#9cb4" target="_blank" v-track-click="'airdrop'">Get Airdrop</a>-->
            </div>
            <div class="top_l m-l-40"><img src="/bipx/images/header-bip.png" srcset="/bipx/images/header-bip@2x.png 2x, /bipx/images/header-bip@3x.png 3x" /></div>
        </header>
        <div class="bipx" id="bipx">
            <div class="bipx_l">
                <div class="bipx_t">What Is BIP and BIPx?</div>
                <div class="bipx_e">BIP is Minter Network’s native token, while BIPx is its wrapped version on Ethereum and Binance Smart Chain. Being a DPoS blockchain, Minter is validated through BIP stake delegation.</div>
                <div class="bipx_a">
                    <a class="bipx_cmc" href="https://coinmarketcap.com/currencies/minter-network/" target="_blank">CMC</a>
                    <a class="bipx_coi" href="https://www.coingecko.com/en/coins/bip" target="_blank">CoinGecko</a>
                </div>
            </div>
            <div class="bipx_r"><img src="/bipx/images/bipx.png" srcset="/bipx/images/bipx@2x.png 2x, /bipx/images/bipx@3x.png 3x" alt="" role="presentation"/></div>
        </div>
        <div class="figures" id="earn">
            <h2>Earn with Minter</h2>
            <div class="figures_flx">
                <div class="figure">
                    <span>Yield Farming</span>
                    Up to 365% APY
                </div>
                <div class="figure">
                    <span>BIP Staking</span>
                    40% APY
                </div>
                <div class="figure">
                    <span>Liquidity Yield</span>
                    0.2% of each trade
                </div>
                <div class="figure">
                    <span>Mainnet Launch</span>
                    May 15, 2019
                </div>
                <div class="figure">
                    <span>Market Cap</span>
                    ${{ prettyRound(marketCap) }}
                </div>
                <div class="figure">
                    <span>Circulating Supply</span>
                    51%
                </div>
            </div>
        </div>
        <div class="minter" id="features">
            <div class="minter_t">Network Features</div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/minter1.svg" /></div>
                <div class="minter_li_t">Fast transactions</div>
                <span>5 seconds</span> with final blocks
            </div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/minter2.svg" /></div>
                <div class="minter_li_t">Low fees fixed in USD</div>
                <span>$0.01</span> per transfer, <span>$0.03</span> + <span>0.2%</span> per swap, payable in any liquid coin or token
            </div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/minter3.svg" /></div>
                <div class="minter_li_t">Cross-chain swaps</div>
                Send cross-chain transfers with swaps. <br />For example, BUSD on Binance Smart Chain for USDC on Ethereum
            </div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/minter4.svg" /></div>
                <div class="minter_li_t">Easy access</div>
                Make decentralized deposits and withdrawals, easily
            </div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/minter5.svg" /></div>
                <div class="minter_li_t">Limit orders</div>
                Place limit orders powered by a unique implementation at the core level of Minter blockchain
            </div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/minter6.svg" /></div>
                <div class="minter_li_t">Custom tokens and pools</div>
                Create your own tokens and liquidity <br />pools in a couple of clicks
            </div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/minter7.svg" alt=""/></div>
                <div class="minter_li_t">Global integration</div>
                Enjoy all benefits of integration with Ethereum and Binance Smart Chain and later, with other popular networks
            </div>
        </div>
        <div class="minter_bot">Trade in most cryptocurrencies, tokens, and digital assets within a single network. <span>All decentralized.</span></div>
        <div class="minter_sup">
            <div class="minter_l"><img src="/bipx/images/minter-sup.png" srcset="/bipx/images/minter-sup@2x.png 2x, /bipx/images/minter-sup@3x.png 3x" alt=""/></div>
            <div class="minter_r">
                <div class="minter_sup_t">Minter supports trading and cross-chain transfers of</div>
                BTC, ETH, USDT, USDС, 1INCH, TON COIN, SHIB, METAVERSE INDEX, DAI, PAX, BUSD, BIP, HUB, and many more.
            </div>
        </div>

        <!--<div class="simple-div">
            <p>Trade top cryptocurrencies within a single network. <b>All Decentralized. Low Fees. Fast Transactions.</b></p>
        </div>
        <div class="compare compare_tokens" id="tokens">
            <div class="compare_tab">
                <div class="compare_ths">
                    <div class="compare_1_2">Name</div>
                    <div class="compare_3">Price</div>
                    <div class="compare_4">24%</div>
                    <div class="compare_5">Market Cap</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="https://explorer-static.minter.network/coins/2064.png" /></div>
                    <div class="compare_2">Bitcoin <span class="ticker">BTC</span></div>
                    <div class="compare_3">$41,670.17</div>
                    <div class="compare_4"><span class="price_down">0.28%</span></div>
                    <div class="compare_5">$788,643,019,700</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="/bipx/images/logos/1inch@2x.png" /></div>
                    <div class="compare_2">1inch Network <span class="ticker">1INCH</span></div>
                    <div class="compare_3">$41,670.17</div>
                    <div class="compare_4"><span class="price_up">0.28%</span></div>
                    <div class="compare_5">$788,643,019,700</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="https://explorer-static.minter.network/coins/3403.png" /></div>
                    <div class="compare_2">Metaverse Index <span class="ticker">MVI</span></div>
                    <div class="compare_3">$41,670.17</div>
                    <div class="compare_4"><span class="price_down">0.28%</span></div>
                    <div class="compare_5">$788,643,019,700</div>
                </div>
            </div>
        </div>-->

        <div class="compare" id="compare">
            <div class="compare_t">Compare speed, fees, convenience</div>
            <div class="compare_tab">
                <div class="compare_ths">
                    <div class="compare_1_2">DEX</div>
                    <div class="compare_3">Pool fee</div>
                    <div class="compare_4">Tx speed</div>
                    <div class="compare_5">Tx fee</div>
                    <div class="compare_6">Transactions</div>
                    <div class="compare_7">Fee coin</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="/img/minter-logo-circle.svg" width="24" height="24" /></div>
                    <div class="compare_2">Minter</div>
                    <div class="compare_3">0.2%</div>
                    <div class="compare_4">5 sec</div>
                    <div class="compare_5">$0.007</div>
                    <div class="compare_6">1 (<a href="https://explorer.minter.network/transactions/Mt2b9425c1cb91640a8e0dd2207fcc8de8480480b692f4c18fd60f344cbe69b117" target="_blank">Tx</a>)</div>
                    <div class="compare_7">ANY</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="/bipx/images/logos/pancakeswap.png" srcset="/bipx/images/logos/pancakeswap@2x.png 2x, /bipx/images/logos/pancakeswap@3x.png 3x" /></div>
                    <div class="compare_2">PancakeSwap</div>
                    <div class="compare_3">0.25%</div>
                    <div class="compare_4">6 sec</div>
                    <div class="compare_5">$0.27</div>
                    <div class="compare_6">2 (<a href="https://bscscan.com/tx/0xc4655f75d9935e65380046f52e02722f9388273330a3d1ce48593cce7de71c08" target="_blank">Tx</a>, <a href="https://bscscan.com/tx/0xc063cab353d6ca021afe23ee6860787d6cbd286f94f7a8c50434f96dcf1e3d2f" target="_blank">Tx</a>)</div>
                    <div class="compare_7">BNB</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="/bipx/images/logos/uniswap.png" srcset="/bipx/images/logos/uniswap@2x.png 2x, /bipx/images/logos/uniswap@3x.png 3x" /></div>
                    <div class="compare_2">Uniswap</div>
                    <div class="compare_3">0.3%</div>
                    <div class="compare_4">16 sec</div>
                    <div class="compare_5">$11.4</div>
                    <div class="compare_6">2 (<a href="https://etherscan.io/tx/0x0dc22e02dabda0b5dda7cbc4a997025c6d41af034b8e5b0ab1c002c8f1254485" target="_blank">Tx</a>, <a href="https://etherscan.io/tx/0x191302cbaba0c3ddec945f2a1365f9ca5347790b8f73cf3b69aead37fce77792" target="_blank">Tx</a>)</div>
                    <div class="compare_7">ETH</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="/bipx/images/logos/1inch.png" srcset="/bipx/images/logos/1inch@2x.png 2x, /bipx/images/logos/1inch@3x.png 3x" /></div>
                    <div class="compare_2">1INCH</div>
                    <div class="compare_3">0.3%</div>
                    <div class="compare_4">71 sec</div>
                    <div class="compare_5">$9.6</div>
                    <div class="compare_6">2 (<a href="https://etherscan.io/tx/0x2918f27fffb09b889a4ca1c34133cb85c21124b8b0feaafc54e6f7ff3abd70bc" target="_blank">Tx</a>, <a href="https://etherscan.io/tx/0xbbee60884c8039e8783b3159008787fb99883380ac49b47f4e3015330b8ac2fb" target="_blank">Tx</a>)</div>
                    <div class="compare_7">ETH</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="/bipx/images/logos/sushiswap.png" srcset="/bipx/images/logos/sushiswap@2x.png 2x, /bipx/images/logos/sushiswap@3x.png 3x" /></div>
                    <div class="compare_2">SushiSwap</div>
                    <div class="compare_3">0.3%</div>
                    <div class="compare_4">62 sec</div>
                    <div class="compare_5">$9.7</div>
                    <div class="compare_6">2 (<a href="https://etherscan.io/tx/0x54d39d6c7388e1dda1813dc847f0b0067adc815b5ae4859a0bbf0061d678e26b" target="_blank">Tx</a>, <a href="https://etherscan.io/tx/0xc596e8b983dcdea03baa1c49965650e1cf1c2927fc786d17917b18c0e52f9ed7" target="_blank">Tx</a>)</div>
                    <div class="compare_7">ETH</div>
                </div>
            </div>
        </div>
        <div class="compare" id="compare_orders">
            <div class="compare_t">Compare limit orders</div>
            <div class="compare_tab">
                <div class="compare_ths">
                    <div class="compare_1_2">DEX</div>
                    <div class="compare_4">Tx speed</div>
                    <div class="compare_5">Tx fee</div>
                    <div class="compare_6">On-Chain</div>
                    <div class="compare_7">Fee coin</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="/img/minter-logo-circle.svg" width="24" height="24" /></div>
                    <div class="compare_2">Minter</div>
                    <div class="compare_4">5 sec</div>
                    <div class="compare_5"><a href="https://explorer.minter.network/transactions/Mteddd4fae853bb7af419d253f1b7227d5d69c9dfd0c669c3bdfcd509d9710d652" target="_blank" rel="nofollow">$0.1</a></div>
                    <div class="compare_6">Yes</div>
                    <div class="compare_7">ANY</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="/bipx/images/logos/ethereum.svg" height="24px" /></div>
                    <div class="compare_2">Ethereum (via 1INCH)</div>
                    <div class="compare_4">30 sec</div>
                    <div class="compare_5"><a href="https://etherscan.io/tx/0xd96a1d5e30ae4bdd79dccc5a7155678fa655f8dceb9a3aa61334f3d1629e42d5" target="_blank" rel="nofollow">$33.3</a></div>
                    <div class="compare_6">No</div>
                    <div class="compare_7">Only ETH</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="/bipx/images/logos/bsc.svg" height="24px" /></div>
                    <div class="compare_2">BSC (via 1INCH)</div>
                    <div class="compare_4">6 sec</div>
                    <div class="compare_5"><a href="https://bscscan.com/tx/0xb1e8099b6cc7d04137f4ad15f3390e0a4e6a7a72f19bd42969ed25e64ca23f58" target="_blank" rel="nofollow">$0.41</a></div>
                    <div class="compare_6">No</div>
                    <div class="compare_7">Only BNB</div>
                </div>
            </div>
        </div>
        <div class="farmings" id="yf" v-if="pools.length">
            <div class="farmings_t">Yield farming on Minter</div>
            <div class="farming">
                <div class="farming_top">
                    <div class="farming_icos"><img src="https://explorer-static.minter.network/coins/1902.png" /><img src="https://explorer-static.minter.network/coins/0.png" /></div>
                    <div class="farming_t">HUB / BIP</div>
                </div>
                <div class="farming_param">
                    <div>Total value locked</div>
                    <div>${{ prettyRound(usdPrice(pools[7].liquidityBip)) }}</div>
                </div>
                <div class="farming_param">
                    <div>Farming APR</div>
                    <div>36.5%</div>
                </div>
                <div class="farming_param">
                    <div>Staking APY</div>
                    <div>{{ pretty(apy(pools[7])) }}%</div>
                </div>
            </div>
            <div class="farming">
                <div class="farming_top">
                    <div class="farming_icos"><img src="https://explorer-static.minter.network/coins/0.png" /><img src="https://explorer-static.minter.network/coins/1993.png" /></div>
                    <div class="farming_t">BIP / USDTE</div>
                </div>
                <div class="farming_param">
                    <div>Total value locked</div>
                    <div>${{ prettyRound(usdPrice(pools[9].liquidityBip)) }}</div>
                </div>
                <div class="farming_param">
                    <div>Farming APR</div>
                    <div>36.5%</div>
                </div>
                <div class="farming_param">
                    <div>Staking APY</div>
                    <div>{{ pretty(apy(pools[9])) }}%</div>
                </div>
            </div>
            <div class="farming">
                <div class="farming_top">
                    <div class="farming_icos"><img src="https://explorer-static.minter.network/coins/2107.png" /><img src="https://explorer-static.minter.network/coins/1902.png" /></div>
                    <div class="farming_t">BNB / HUB</div>
                </div>
                <div class="farming_param">
                    <div>Total value locked</div>
                    <div>${{ prettyRound(usdPrice(pools[14].liquidityBip)) }}</div>
                </div>
                <div class="farming_param">
                    <div>Farming APR</div>
                    <div>36.5%</div>
                </div>
                <div class="farming_param">
                    <div>Staking APY</div>
                    <div>{{ pretty(apy(pools[14])) }}%</div>
                </div>
            </div>
            <div class="farming">
                <div class="farming_top">
                    <div class="farming_icos"><img src="https://explorer-static.minter.network/coins/3483.png" /><img src="https://explorer-static.minter.network/coins/0.png" /></div>
                    <div class="farming_t">DOTBSC / BIP</div>
                </div>
                <div class="farming_param">
                    <div>Total value locked</div>
                    <div>${{ prettyRound(usdPrice(pools[15].liquidityBip)) }}</div>
                </div>
                <div class="farming_param">
                    <div>Farming APR</div>
                    <div>124.1%</div>
                </div>
                <div class="farming_param">
                    <div>Staking APY</div>
                    <div>{{ pretty(apy(pools[15])) }}%</div>
                </div>
            </div>
            <div class="farming">
                <div class="farming_top">
                    <div class="farming_icos"><img src="https://explorer-static.minter.network/coins/3493.png" /><img src="https://explorer-static.minter.network/coins/0.png" /></div>
                    <div class="farming_t">ALPACA / BIP</div>
                </div>
                <div class="farming_param">
                    <div>Total value locked</div>
                    <div>${{ prettyRound(usdPrice(pools[16].liquidityBip)) }}</div>
                </div>
                <div class="farming_param">
                    <div>Farming APR</div>
                    <div>124.1%</div>
                </div>
                <div class="farming_param">
                    <div>Staking APY</div>
                    <div>{{ pretty(apy(pools[16])) }}%</div>
                </div>
            </div>
            <div class="farming farming_all">
                <a href="https://explorer.minter.network/farming" target="_blank">View all</a>
            </div>
        </div>
        <div class="staking" id="staking">
            <div class="minter_t">Staking</div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/staking1.svg" /></div>
                <div class="minter_li_t">Delegate</div>
                Delegate your BIP to the validators of the network to get rewards in BIP (about 40% APR)
            </div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/staking2.svg" /></div>
                <div class="minter_li_t">Provide liquidity</div>
                Mine BTC, ETH, USDT, USDC, 1INCH, BIP, HUB, and many more by providing liquidity. 0.2% of each trade goes directly to LPs
            </div>
        </div>
        <div class="wallets" id="wallets">
            <div class="wallets_t">Wallets</div>
            <div class="wallets_i"><img src="/bipx/images/wallets.png" srcset="/bipx/images/wallets@2x.png 2x" alt="" role="presentation" /></div>
            <div class="wallets_r">
                <div class="wallet">
                    <div class="wallet_i"><img src="/bipx/images/logos/bipwallet.svg" /></div>
                    <div class="wallet_t">Bip Wallet</div>
                    <div class="wallet_e">User-friendly and feature-rich wallet <br />released as an application for mobile <br />devices</div>
                    <div class="wallet_a">
                        <a class="wallet_andr" href="https://minter.link/ios" target="_blank">iOS</a>
                        <a class="wallet_ios" href="https://minter.link/android" target="_blank">Android</a>
                    </div>
                </div>
                <div class="wallet">
                    <div class="wallet_i"><img src="/bipx/images/logos/webwallet.svg" /></div>
                    <div class="wallet_t"><a href="https://wallet.bip.to/" target="_blank">Web Wallet</a></div>
                    <div class="wallet_e">BIP Wallet’s basic web version. Includes all essential functionality for managing your coins: receive, send, and delegate</div>
                </div>
            </div>
            <div class="wallet">
                <div class="wallet_i"><img src="/img/index-wallet-minter.svg" width="48" height="48"/></div>
                <div class="wallet_t"><a href="https://wallet.minter.org/" target="_blank">Minter Wallet</a></div>
                <div class="wallet_e">The most simple solution to receive and send funds. You will only need an e-mail to get started</div>
            </div>
            <div class="wallet">
                <div class="wallet_i"><img src="/img/index-wallet-console.svg" width="48" height="48" alt="" role="presentation"/></div>
                <div class="wallet_t"><a href="https://console.minter.network/" target="_blank">Console</a></div>
                <div class="wallet_e">This wallet has the most features: besides the standard functions of the basic wallet, you can also work with checks, create coins and tokens, launch masternodes, set up and manage MultiSig addresses and liquidity pools, and broadcast the transactions signed off-line</div>
            </div>
        </div>
        <div class="minter_roadmap" id="roadmap">
            <div class="minter_roadmap_l">
                <div class="minter_roadmap_t">Roadmap</div>
                <p>In light of the changes that leading blockchains have recently made in their tokenomics, Minter Team is proposing a large-scale update of the network. Its goal is to improve the economic model and implement deflationary and counter-inflationary mechanisms, stimulating the strengthening of BIP.</p>
                <p>The Minter team has started to design mechanisms outlined below. We plan to gradually roll them out in Q1 and Q2 2022.</p>
                <a class="btn btn_c2" href="https://minterteam.medium.com/minter-3-bip-tokenomics-update-c6e81264e33c" target="_blank" v-track-click="'roadmap'">Read More</a>
            </div>
            <div class="minter_roadmap_r">
                <img src="/bipx/images/map.png" srcset="/bipx/images/map@2x.png 2x" alt="Minter roadmap"/>
            </div>
        </div>
        <div class="completed" id="completed">
            <div class="completed_t">Completed in 2021</div>
            <div class="completed_timeline">
                <div class="completed_outer">
                    <div class="completed_card" id="timeline_1">
                        <div class="completed_info">
                            <div class="completed_title">Minter 2 Launch</div>
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
                            <div class="completed_title">Token Burn</div>
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
                            <div class="completed_title">BIPX Token Launch</div>
                            <p>BIPx is a wrapped version of BIP on Ethereum and Binance Smart Chain. BIPx unlocks the best of global decentralized finance (DeFi) and helps users earn with just one of the Minter wallets at hand.</p>
                            <p class="timeline_links">
                                <a href="https://coinmarketcal.com/en/event/token-launch-71586" target="_blank" rel="nofollow">Calendar Event</a>
                                <a href="https://minterteam.medium.com/how-to-make-money-on-defi-with-bipx-17905b034285" target="_blank" rel="nofollow">Read More</a>
                            </p>
                        </div>
                    </div>
                    <div class="completed_card" id="timeline_4">
                        <div class="completed_info">
                            <div class="completed_title">HONEE Wallet Launch</div>
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
                            <div class="completed_title">Listing of popular cryptos on Minter</div>
                            <p>Launch of the Minter Hub bridge has made it possible to move tokens between the networks. As of the end of 2021, support has been added for the following top coins:<br>
                            BTC, ETH, BNB, USDT, USDС, 1INCH, TON COIN, SHIB, METAVERSE INDEX, DAI, PAX, BUSD, BIP, HUB, and more.</p>
                            <p class="timeline_links">
                                <a href="https://minterteam.medium.com/listing-tokens-on-minter-ce70f26e1a08" target="_blank" rel="nofollow">Read More</a>
                            </p>
                        </div>
                    </div>
                    <div class="completed_card" id="timeline_6">
                        <div class="completed_info">
                            <div class="completed_title">Minter 2.6 Update</div>
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
                            <div class="completed_title">Minter Hub 2 Launch</div>
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
        <div class="tech" id="tech">
            <div class="tech_t">Tech side</div>
            <div class="tech_e">In our docs, we’ve covered everything you need to know in order to start maintaining the Minter network, build services and applications on top of it, or integrate it into your organization’s operations.</div>
            <div class="tech_a">
                <a class="tech_git" href="https://github.com/MinterTeam" target="_blank">GitHub</a>
                <a class="tech_api" href="https://www.minter.network/docs#node-api" target="_blank">API</a>
                <a class="tech_sdk" href="https://www.minter.network/docs#minter-sdks" target="_blank">SDK</a>
                <a class="tech_doc" href="https://www.minter.network/docs" target="_blank">Docs</a>
                <a class="tech_cons" href="https://console.minter.network/" target="_blank">Console</a>
            </div>
        </div>
        <div class="social" id="follow">
            <div class="social_t">Social media</div>
            <div class="social_e">Follow all of our news, announcements, and content updates across social networks and instant messengers.</div>
            <div class="social_as">
                <div class="social_a social_md"><a href="https://medium.com/@MinterTeam" target="_blank">Medium</a></div>
                <div class="social_a social_tw"><a href="https://twitter.com/MinterTeam" target="_blank">Twitter</a></div>
                <div class="social_a social_rd"><a href="https://www.reddit.com/r/Minter/" target="_blank">Reddit</a></div>
                <div class="social_a social_tc"><a href="tg://resolve?domain=MinterTeam" target="_blank">Telegram Channel</a></div>
                <div class="social_a social_tg"><a href="tg://join?invite=EafyERJSJZJ-nwH_139jLQ" target="_blank">Telegram Group</a></div>
                <div class="social_a social_fb"><a href="https://www.facebook.com/MinterNetwork" target="_blank">Facebook</a></div>
            </div>
        </div>
        <div class="discover" id="hub">
            <div class="discover_t">Discover HUB token</div>
            <div class="discover_top">
                <div class="discover_img"><img src="/bipx/images/discover.svg" /></div>
                <div class="discover_th">Current price <span>${{ pretty(hubPrice) }}</span></div>
                <div class="discover_th">Start price <span>$0.11</span></div>
                <div class="discover_th">Max supply <span>1 000 000</span></div>
                <div class="discover_th">Pools <span><a href="https://explorer.minter.network/pools/HUB/USDTE" target="_blank">Minter</a> <a href="https://v2.info.uniswap.org/pair/0x3796fee2b555da1356cdcd3e1861263b351a58a0" target="_blank">Ethereum</a></span></div>
                <div class="discover_go"><a class="btn" href="https://minter.network/hub" target="_blank" v-track-click="'bipx-white-paper'">Read More</a></div>
            </div>
            <!--<div class="discover_chart"><img src="/bipx/images/chart.svg" /></div>-->
            <div class="discover_e">
                <p><a href="https://etherscan.io/token/0x8e9A29e7Ed21DB7c5B2E1cd75e676dA0236dfB45" target="_blank">HUB</a> is the native token of the Minter Hub blockchain that’s bridging Minter with Ethereum and Binance Smart Chain. HUB is a PoS token, so oracles receive 1% on the fees charged for cross-chain transfers. HUB also serves as reserve for DEX pools both on Minter and Ethereum/Binance Smart Chain.</p>
                <p>For example, Uniswap v3 <a href="https://info.uniswap.org/#/pools/0x27878ae7f961a126755042ee8e5c074ea971511f" target="_blank">HUB-USDT</a>, Uniswap v2 <a href="https://v2.info.uniswap.org/pair/0x3796fee2b555da1356cdcd3e1861263b351a58a0" target="_blank">HUB-USDT</a>, Minter <a href="https://explorer.minter.network/pools/HUB/BIP" target="_blank">HUB-BIP</a>.</p>
            </div>
        </div>
        <Footer class="footer--transparent"/>
    </div>
</template>
