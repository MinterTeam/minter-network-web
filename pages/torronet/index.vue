<script>
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
    head() {
        const title = 'Minter 3';
        const description = 'Grand tokenomics update. Implementation of the best blockchain industry’s practices.';
        // const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

        return {
            title: title + ' | Minter Network',
            meta: [
                { hid: 'og-title', name: 'og:title', content: title },
                { hid: 'description', name: 'description', content: description },
                { hid: 'og-description', name: 'og:description', content: description },
                { hid: 'og-image', name: 'og:image', content: `/torronet/images/meta.jpeg` },
            ],
            link: [
                { rel: 'canonical', href: `${HOST}/torronet`},
                { rel: 'stylesheet', href: '/torronet/style.css', hid: 'torronet-style'},
                { rel: 'stylesheet', href: '/torronet/style320.css', media: 'screen and (max-width: 1020px)', hid: 'torronet-style320'},
            ],
        };
    },
    mounted() {
        // move landing styles under global styles
        const style = document.querySelector('[data-hid="torronet-style"]');
        const style320 = document.querySelector('[data-hid="torronet-style320"]');
        if (!style || !style320) {
            return;
        }
        style.parentNode.removeChild(style);
        style320.parentNode.removeChild(style320);
        document.head.appendChild(style);
        document.head.appendChild(style320);
    },
};
</script>

<template>
    <div class="wrap">
        <div class="u-container u-container--full index-language lang-wrap">
            <language class="" :locales='[{"code":"","name":"English"},{"code":"ru","name":"Russian"}]' lang="" :push="true"/>
        </div>
        <header>
            <div class="container">
                <div class="hello">
                    <div class="hello-content">
                        <div class="logo"><a href="#"><img src="/img/minter-logo-circle.svg" width="60" height="60" alt="Minter 3"/></a></div>
                        <div class="torronet">Minter 3</div>
                        <h1>Grand <br />Tokenomics Update</h1>
                        <p>Implementation of the best blockchain industry’s practices. Minter 3 Tokenomics Update Coming <b>Spring 2022</b>.</p>
                        <a class="btn" href="https://www.minter.network/how-to-buy-and-sell-bip" target="_blank" v-track-click="'buy-bipx'">Buy and Stake BIP</a>
                    </div>
                    <img class="hello-image" src="/torronet/images/hero-image.png" srcset="/torronet/images/hero-image@2x.png 2x" />
                </div>
            </div>
        </header>

        <section class="stats">
            <div class="container">
                <div class="stats-content">
                    <div class="stats-item">
                        <div class="stats-value">$14,354,516</div>
                        <h4>Market cap</h4>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">$27,485,793</div>
                        <h4>Fully diluted market cap</h4>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">May 15, 2019</div>
                        <h4>Mainnet launch</h4>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">10,000,000,000</div>
                        <h4>Max. supply</h4>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">5,427,996,860 (54%)</div>
                        <h4>Circulating supply</h4>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">1,125,772,062 (21%)</div>
                        <h4>Free float</h4>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">47</div>
                        <h4>Active validators</h4>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">12,747</div>
                        <h4>Active stakers</h4>
                    </div>
                </div>
            </div>
        </section>

        <section class="drivers">
            <div class="container">
                <h2>BIP Growth Drivers</h2>
                <div class="drivers-content">
                    <div class="drivers-item">
                        <img src="/torronet/images/d1.svg" alt="Dynamic Mining">
                        <h3>Dynamic Mining</h3>
                        <p>BIP’s price drops when the supply of coins on the market exceeds the demand. To make this less impactful, we introduce a block reward balancer that reacts by reducing block rewards when the BIP price falls, helping to avoid further BIP surplus. At the same time, when the BIP price goes up, the balancer increases the rewards to maximize staking outcome.</p>
                    </div>
                    <div class="drivers-item">
                        <img src="/torronet/images/d2.svg" alt="Auto-Redelegation">
                        <h3>Auto-Redelegation</h3>
                        <p>Currently, all delegation rewards are sent to addresses of delegators about once every hour. Auto-redelegation will change things in a way that all rewards will be automatically delegated, increasing the stake as well as the rewards. To claim rewards, the user will need to make a regular unbond transaction, specifying the number of coins they need.</p>
                    </div>
                    <div class="drivers-item">
                        <img src="/torronet/images/d3.svg" alt="Burning by Balancer">
                        <h3>Burning by Balancer</h3>
                        <p>If the price of BIP goes down, it doesn’t slow down the mining of new coins, meaning the deadline for reaching total supply doesn’t change. In this case, undistributed rewards (down to the base value) will be burned via being sent to the 0th address.</p>
                    </div>
                    <div class="drivers-item">
                        <img src="/torronet/images/d4.svg" alt="Burning of Ticker Fees">
                        <h3>Burning of Ticker Fees</h3>
                        <p>When creating a new coin or token, the issuer pays the fee that depends on the length of the ticker—the shorter, the cheaper. Instead of being distributed to validators and their delegators, this fee will now be sent to the 0th address and burned, taking the coins out of free circulation.</p>
                    </div>
                    <div class="drivers-item">
                        <img src="/torronet/images/d5.svg" alt="BIP Buyback">
                        <h3>BIP Buyback</h3>
                        <p>When swaps are made within liquidity pools, BIP is bought back and later burned. We’ll increase the in-pool fee from .2% to .3% (market average). Liquidity providers will still be earning .2% on swaps within pools, while the remaining .1% will go towards BIP buyback and burn.</p>
                    </div>
                    <div class="drivers-item">
                        <img src="/torronet/images/d6.svg" alt="3-Year BIP Lock">
                        <h3>3-Year BIP Lock</h3>
                        <p>A new staking option will be offered to users with Minter 3 Upgrade. They will be able to send their BIP into delegation with a 3-year lock and receive 3x rewards. At the same time, fees collected by validators will not increase. To apply this feature, users won’t need to unbond their stakes.</p>
                    </div>
                    <div class="drivers-item">
                        <img src="/torronet/images/d7.svg" alt="Stake Transfer">
                        <h3>Stake Transfer</h3>
                        <p>We will introduce a MoveStake transaction that transfers the stake to a new validator. The transfer will take 7 days.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="text">
            <div class="container">
                <p><b>All measures above share a single goal, which is to stimulate BIP shortage.</b><br />
                Even if demand <i>remains the same</i> while there is a <i>decrease</i> in supply, prices tend to <i>rise</i>.</p>
                <a class="btn" href="https://www.minter.network/how-to-buy-and-sell-bip" target="_blank" v-track-click="'buy-bipx'">Buy and Stake BIP</a>
            </div>
        </section>

        <Footer class="footer--transparent"/>
    </div>
</template>
