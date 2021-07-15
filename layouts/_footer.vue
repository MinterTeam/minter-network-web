<script>
    import {getStatus} from "~/api/status.js";
    import {prettyRound} from "~/assets/utils";
    import {HISTORY_BLOCK_COUNT} from '~/assets/variables.js';

    export default {
        prettyRound,
        data() {
            return {
                stats: null,
            };
        },
        computed: {
            currentYear() {
                return (new Date()).getFullYear();
            },
            numberOfBlocks() {
                return this.stats ? this.stats.numberOfBlocks + HISTORY_BLOCK_COUNT : '';
            },
            txTotalCount() {
                return this.stats ? this.stats.txTotalCount : '';
            },
        },
        beforeMount() {
            getStatus()
                .then((statsData) => {
                    this.stats = statsData;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    }
</script>

<template>
    <footer class="footer">
        <div class="u-container">
            <div class="footer__stat-container" v-if="stats">
                <div class="footer__stats-item">
                    <div class="footer__stats-key">Since</div>
                    <div class="footer__stats-value">May 15, 2019</div>
                </div>
                <div class="footer__stats-item">
                    <div class="footer__stats-key">Coins created</div>
                    <div class="footer__stats-value">{{ $options.prettyRound(stats.customCoinsCount) }}</div>
                </div>
                <div class="footer__stats-item">
                    <div class="footer__stats-key">Blocks</div>
                    <div class="footer__stats-value">{{ $options.prettyRound(numberOfBlocks) }}</div>
                </div>
                <div class="footer__stats-item">
                    <div class="footer__stats-key">Transactions</div>
                    <div class="footer__stats-value">{{ $options.prettyRound(txTotalCount) }}</div>
                </div>
                <div class="footer__stats-item">
                    <div class="footer__stats-key">BIP mined</div>
                    <div class="footer__stats-value">{{ $options.prettyRound(stats.bipEmission) }}</div>
                </div>
            </div>

            <div class="footer__container">
                <img class="footer__logo" src="/img/minter-logo-white.svg" width="95" height="30" alt="Minter">
            </div>
            <div class="footer__copyright-container u-mt-10">
                <p class="footer__copyright">
                    Copyright © 2019-{{ currentYear }} Minter Development Foundation.
                    <span class="u-display-ib">All rights reserved.</span>
                </p>
                <p class="footer__copyright">
                    75 Broadway, Suite 202, San&nbsp;Francisco, CA, 94111 <br>
                    For correspondence: 548 Market St #32852, San&nbsp;Francisco, CA&nbsp;94104-5401 <br>
                    <a class="link--default" href="mailto:hello@minter.org">hello@minter.org</a>
                </p>
            </div>

            <div class="footer__menu">
                <div class="footer__menu-item">
                    <a class="footer__link u-h link--hover" href="/legal/terms.pdf" target="_blank">Terms</a>
                </div>
                <div class="footer__menu-item">
                    <a class="footer__link u-h link--hover" href="/legal/privacy.pdf" target="_blank">Privacy</a>
                </div>
                <div class="footer__menu-item">
                    <a class="footer__link u-h link--hover" href="https://help.minter.network" target="_blank">Help</a>
                </div>
                <div class="footer__menu-item">
                    <a class="footer__link u-h link--hover" href="mailto:hello@minter.org" target="_blank" rel="noopener">Contact</a>
                </div>
                <div class="footer__menu-item">
                    <a class="footer__link u-h link--hover" href="https://kit.minter.org" target="_blank">Media kit</a>
                </div>
            </div>
        </div>
    </footer>
</template>
