<script>
    import {getStatus} from "~/api/status.js";
    import {prettyRound} from "~/assets/utils";

    export default {
        prettyRound,
        data() {
            return {
                stats: null,
            };
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
        <div class="footer__container u-container" v-if="stats">
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
                <div class="footer__stats-value">{{ $options.prettyRound(stats.numberOfBlocks) }}</div>
            </div>
            <div class="footer__stats-item">
                <div class="footer__stats-key">Transactions</div>
                <div class="footer__stats-value">{{ $options.prettyRound(stats.txTotalCount) }}</div>
            </div>
            <div class="footer__stats-item">
                <div class="footer__stats-key">BIPs mined</div>
                <div class="footer__stats-value">{{ $options.prettyRound(stats.bipEmission) }}</div>
            </div>
        </div>
    </footer>
</template>
