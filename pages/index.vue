<script>
    export default {
        // head() {
        //     const title = 'Get paid with Minter';
        //     const description = 'By embracing a new approach of routing transfers via the trustless network, we let anyone in the world use the Internet of Money';
        //     // const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;
        //
        //     return {
        //         title: title,
        //         meta: [
        //             { hid: 'og-title', name: 'og:title', content: title },
        //             { hid: 'description', name: 'description', content: description },
        //             { hid: 'og-description', name: 'og:description', content: description },
        //             // { hid: 'og-image', name: 'og:image', content: `/img/social-share-wallet${localeSuffix}.png` },
        //         ],
        //     };
        // },
    }
</script>

<template>
    <div class="u-container index-section">
        <section class="index-intro">
            <img class="index-intro__logo" src="/img/minter-logo.svg" alt="Minter" width="133" height="42">
            <h1 class="index-intro__title u-h1">Create coins and run <span class="u-display-ib">blockchain services</span></h1>
            <a class="index-intro__button button button--main" href="https://github.com/MinterTeam" target="_blank" rel="nofollow">Start Now</a>
        </section>
        <hr class="hr--divider">
        <div class="u-grid u-grid--large u-grid--vertical-margin--large">
            <div class="u-cell u-cell--medium--1-2">
                <img class="index-feature__icon" src="/img/feature-tools.svg" alt="" role="presentation">
                <h2 class="index-feature__title u-h3">Comprehensive Toolset</h2>
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
                <img class="index-feature__icon" src="/img/feature-consensus.svg" alt="" role="presentation">
                <h2 class="index-feature__title u-h3">Trustworthy Consensus Algorithm</h2>
                <p class="index-feature__description">Network’s native utility token is called <a class="link--default" href="https://www.coingecko.com/en/coins/bip" target="_blank" rel="nofollow">BIP</a> and mined by <a class="link--default" href="https://github.com/MinterTeam/minter-go-node" target="_blank" rel="nofollow">validators</a> (Tendermint-based DPoS)</p>
            </div>
            <div class="u-cell u-cell--medium--1-2">
                <img class="index-feature__icon" src="/img/feature-speed.svg" alt="" role="presentation">
                <h2 class="index-feature__title u-h3">Blazingly Fast Speed</h2>
                <p class="index-feature__description">Transactions are final in <a class="link--default" href="https://explorer.minter.network" target="_blank">5 seconds</a> and&nbsp;cost less than a cent. </p>
            </div>
            <div class="u-cell u-cell--medium--1-2">
                <img class="index-feature__icon" src="/img/feature-open.svg" alt="" role="presentation">
                <h2 class="index-feature__title u-h3">Open & Free Code</h2>
                <p class="index-feature__description">Everything is crowdsourced and published in&nbsp;<a class="link--default" href="https://github.com/MinterTeam" target="_blank" rel="nofollow">GitHub</a> with open licenses.</p>
            </div>
        </div>
        <hr class="hr--divider">
        <div class="">
            <img class="index-feature__icon" src="/img/feature-community.svg" alt="" role="presentation">
            <h2 class="index-feature__title u-h3">Helpful Community</h2>
            <p class="index-feature__description">
                Subscribe to <a class="link--default" href="tg://resolve?domain=MinterTeam" target="_blank" rel="nofollow">Telegram</a>,
                <a class="link--default" href="https://medium.com/@MinterTeam" target="_blank" rel="nofollow">Medium</a>,
                <a class="link--default" href="https://twitter.com/MinterTeam" target="_blank" rel="nofollow">Twitter</a>,
                <a class="link--default" href="https://www.facebook.com/MinterNetwork" target="_blank" rel="nofollow">Facebook</a> <br>
                or join the conversation in <a class="link--default" href="tg://join?invite=EafyERJSJZJ-nwH_139jLQ" target="_blank" rel="nofollow">Telegram</a>
                and&nbsp;<a class="link--default" href="https://www.reddit.com/r/Minter/" target="_blank" rel="nofollow">Reddit</a>
            </p>
        </div>
    </div>
</template>