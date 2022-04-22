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
        const title = 'Кросс-чейн смарт-контракты для крипто-заработка';
        const description = 'Minter Hub — это мост в глобальную криптоликвидность; отдельный блокчейн с уникальной технологией кросс-чейн смарт-контрактов для заработка криптовалют.';
        // const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

        return {
            title: title + ' | Minter Network',
            meta: [
                { hid: 'og-title', name: 'og:title', content: title },
                { hid: 'description', name: 'description', content: description },
                { hid: 'og-description', name: 'og:description', content: description },
                { hid: 'og-image', name: 'og:image', content: `/newnetwork/images/hub/meta_ru.png` },
            ],
            link: [
                { rel: 'canonical', href: `${HOST}/hub`},
                { rel: 'stylesheet', href: '/newnetwork/style.css', hid: 'newnetwork-style'},
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
        <div class="top-banner">
            <div class="top-banner-content">
                <div class="top-banner-text">Выводите свои <span>BNB</span> с бирж, пока не стало слишком поздно!</div>
                <div class="top-banner-link"><a href="/ru/earn/bnb-yf" target="_blank">Как зарабатывать в Minter DEX 120% годовых</a></div>
            </div>
            <div class="top-banner-button">
                <a href="https://console.minter.network/ru/hub" target="_blank" class="btn btn-banner">Перевести BNB</a>
            </div>
        </div>
        <header>
            <div class="container">
                <div class="top-bar">
                    <div class="logo"><a href="/"><img src="/newnetwork/images/hub.svg" alt="Minter Hub"/> Minter Hub</a></div>
                    <div class="menu">
                        <language class="" :locales='[{"code":"","name":"English"},{"code":"ru","name":"Russian"}]' lang="ru" :push="true"/>
                    </div>
                </div>
                <div class="hello">
                    <div class="hello-content">
                        <h1>Кросс-чейн смарт-контракты для крипто-заработка</h1>
                        <div class="hello-buttons">
                            <a class="btn" href="https://console.minter.network/ru" target="_blank" v-track-click="'start-earning'">Начать зарабатывать</a>
                            <a class="btn btn-alt-2" href="https://my.honee.app/ru/swap/HUB" target="_blank" v-track-click="'buy-hub'">Купить HUB</a>
                        </div>
                        <p>Minter Hub — это мост в глобальную криптоликвидность;<br>
                            отдельный блокчейн с уникальной технологией кросс-чейн смарт-контрактов для заработка криптовалют.</p>
                    </div>
                </div>
            </div>
            <div class="stat-bar">
                <div class="container">
                    <div class="stat-items">
                        <div class="stat-item">
                            <small>Запуск сети</small>
                            <div>Апрель 2021</div>
                        </div>
                        <div class="stat-item">
                            <small>Капитализация</small>
                            <div>$42 000 000</div>
                        </div>
                        <div class="stat-item">
                            <small>В свободном обороте</small>
                            <div>5%</div>
                        </div>
                        <div class="stat-item">
                            <small>Стейкинг HUB</small>
                            <div>До 1%</div>
                            <div class="stat-item-explanation">от всех кросс-чейн транзакций</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <section class="earn" id="earn">
            <div class="container">
                <h2>Инструменты для заработка</h2>
                <div class="earn-tools">
                    <div class="tool earn-1">
                        <img src="/newnetwork/images/hub-staking.svg" alt="Стейкинг HUB">
                        <h3>Стейкинг HUB</h3>
                        <p>Делегируйте HUB оракулам и получайте часть комиссий от кросс-чейн переводов моста.</p>
                        <a href="https://www.minter.network/ru/earn/hub-staking" target="_blank" class="btn btn-alt">Подробнее</a>
                    </div>
                    <div class="tool earn-2">
                        <img src="/newnetwork/images/farming.svg" alt="Фарминг">
                        <h3>Фарминг</h3>
                        <p>Получайте дополнительные ежедневные награды за блокировку своих активов.</p>
                        <a href="https://www.minter.network/earn/farm" target="_blank" class="btn btn-alt">Подробнее</a>
                    </div>
                    <div class="tool earn-3">
                        <img src="/newnetwork/images/hub/hubbnb.svg" alt="Пулы ликвидности">
                        <h3>Пулы ликвидности</h3>
                        <p>Позвольте другим трейдерам использовать ваши средства и получайте свою долю от каждой сделки.</p>
                        <a href="https://www.minter.network/earn/earn-liquidity-pools" target="_blank" class="btn btn-alt">Подробнее</a>
                    </div>
                    <div class="tool earn-4">
                        <img src="/newnetwork/images/hub/bridge.svg" alt="Кросс-чейн мост">
                        <h3>Кросс-чейн мост</h3>
                        <p>Пользователи, которые предоставляют ликвидность в кросс-чейн бридж будут зарабатывать на комиссиях, получаемых за кросс-чейн переводы и обмены.</p>
                        <div class="tool-soon">Ожидается в 2022</div>
                    </div>
                    <div class="tool earn-5">
                        <img src="/newnetwork/images/hub/single-asset.svg" alt="Краудпулинг">
                        <h3>Краудпулинг</h3>
                        <p>Предоставляйте только один из двух токенов в пул ликвидности, чтобы зарабатывать на нем.</p>
                        <div class="tool-soon">Ожидается в 2022</div>
                    </div>
                    <div class="tool earn-6">
                        <img src="/newnetwork/images/hub/smarts.svg" alt="Смарт-контракты">
                        <h3>Смарт-контракты</h3>
                        <p>Безопасные кросс-чейн смарт-контракты для всех. Расширенный режим для разработчиков и обычный — для простой развертки.</p>
                        <div class="tool-soon">Ожидается в 2022</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="half section-mob-reverse">
            <div class="container">
                <div class="half-content">
                    <div class="half-block">
                        <h2>Смарт-контракты</h2>
                        <p>Смарт-контракты будут на основе обычной эфирной ноды с доработанным консенсусом — валидаторами будут являться оракулы Хаба. EVM будет без доработок, соответственно все смарт-контракты могут быть задеплоены в сеть без изменений.</p>
                        <p>Функционал будет доступен в двух режимах: продвинутом для разработчиков и обычном для простой развертки.</p>
                    </div>
                    <div class="half-block half-block-img">
                        <img src="/newnetwork/images/hub/block-smarts.svg" alt="Смарт-контракты" id="block-img-smarts">
                    </div>
                </div>
            </div>
        </section>
        <section class="half">
            <div class="container">
                <div class="half-content">
                    <div class="half-block half-block-img">
                        <img src="/newnetwork/images/hub/block-how.svg" alt="Как это работает" id="block-img-how">
                    </div>
                    <div class="half-block">
                        <h2>Как это работает</h2>
                        <p>Minter Hub — это отдельный блокчейн со своими валидаторами (оракулами), которые подключены ко всем сетям сразу (Minter, Ethereum, BSC) и имеют доступ к мультисиг-кошелькам в каждой из них.</p>
                        <p>Оракулы блокируют монеты в одной сети и выпускают «зеркалированные» версии в другой.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="half section-mob-reverse">
            <div class="container">
                <div class="half-content">
                    <div class="half-block">
                        <h2>Оракулы</h2>
                        <p>Minter Hub рассчитан на 16 оракулов и PoS-консенсус, что означает залог стейка для голосований по блокам. Однако в случае необходимости решение об изменении правил и кода сети может быть принято оракулами блокчейна.</p>
                        <p>Кросс-чейн переводы — это новая эра суверенных блокчейнов. Переводы позволяют не просто общаться сетям, а делать надежные, быстрые и безопасные децентрализованные транзакции. Никто не может отменить, изменить или цензурировать данные переводы.</p>
                    </div>
                    <div class="half-block half-block-img">
                        <img src="/newnetwork/images/hub/block-oracles.svg" alt="Оракулы" id="block-img-oracles">
                    </div>
                </div>
            </div>
        </section>
        <section class="speed">
            <div class="container">
                <h2>Скорость и стоимость</h2>
                <p>Например, транзакции Minter ⇔ Ethereum в среднем занимают <b>20–60 секунд</b>, что достаточно быстро для переводов между сетями. В то же время истинно децентрализованный процессинг требует уплаты больших комиссий. В Ethereum кросс-чейн комиссии взимаются за подпись каждого оракула; помимо этого, <b>1%</b> начисляется оракулам Minter Hub за предоставляемые услуги.</p>
            </div>
        </section>
        <section class="products">
            <div class="container">
                <h2>Продукты</h2>
                <div class="products-block">
                    <div class="product">
                        <h3><img src="/newnetwork/images/wallet-minter.svg" alt="Minter" class="product-logo">Minter DEX</h3>
                        <p>Minter — маркетплейс цифровых активов, где каждый может купить, продать, отправить или потратить BTC, ETH, BIP, USDC и другие</p>
                        <a href="https://www.minter.network/ru" target="_blank" class="btn btn-alt">Подробнее</a>
                        <img src="/newnetwork/images/hub/p1.svg" alt="Minter DEX" class="product-bg" id="p1">
                    </div>
                    <div class="product">
                        <h3><img src="/newnetwork/images/honee.svg" alt="Honee" class="product-logo">Honee</h3>
                        <p>Honee — это крипто-кошелек, который помогает зарабатывать. Стадия альфа-тестирования начинается во вторник, 28 сентября 2021 г.</p>
                        <a href="https://honee.app/ru" target="_blank" class="btn btn-alt">Подробнее</a>
                        <img src="/newnetwork/images/hub/p2.svg" alt="Minter DEX" class="product-bg" id="p2">
                    </div>
                    <div class="product">
                        <h3><img src="/newnetwork/images/hub-logo.svg" alt="Minter" class="product-logo">DApp кросс-чейн моста</h3>
                        <p>Веб-интерфейс, позволяющий быстро и децентрализованно перемещать токены между сетями</p>
                        <div class="product-soon">Ожидается в 2022</div>
                        <img src="/newnetwork/images/hub/p3.svg" alt="DApp кросс-чейн моста" class="product-bg" id="p3">
                    </div>
                </div>
            </div>
        </section>
        <section class="half">
            <div class="container">
                <div class="half-content">
                    <div class="half-block half-block-img">
                        <img src="/newnetwork/images/hub/block-listing.svg" alt="Кросс-чейн листинг токенов" id="block-img-listing">
                    </div>
                    <div class="half-block">
                        <h2>Кросс-чейн листинг токенов</h2>
                        <p>Токен ERC-20 или BEP-20 любого существующего проекта может быть включен в список кросс-чейн токенов. Существует три основных способа кросс-чейн листинга токенов из Ethereum или Binance Smart Chain в Minter.</p>
                        <a href="https://minterteam.medium.com/%D0%BA%D1%80%D0%BE%D1%81%D1%81-%D1%87%D0%B5%D0%B9%D0%BD-%D0%BB%D0%B8%D1%81%D1%82%D0%B8%D0%BD%D0%B3-%D1%82%D0%BE%D0%BA%D0%B5%D0%BD%D0%BE%D0%B2-%D0%B8%D0%B7-ethereum-%D0%B2-minter-6dffe984e116" target="_blank" rel="nofollow" class="btn btn-alt">Подробнее</a>
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
                            <h2>Токен HUB</h2>
                            <p>Базовый токен сети Minter Hub называется HUB и выпущен в объеме 1 000 000 единиц.</p>
                        </div>
                    </div>
                    <p>На данный момент, HUB представляет собой ERC-20 токен в сети Ethereum и токен в сети Minter, без каких-либо ограничений и локов, то есть полностью свободный для обращения.</p>
                    <p>Увеличение (дополнительная эмиссия) количества токенов невозможно. Сжигание и локи осуществляются по голосованию оракулов Minter Hub.</p>
                </div>
                <h2>Текущее распределение HUB</h2>
                <div class="hub-distribution">
                    <div class="hub-distribution-block">
                        <span>Фонд</span>
                        950 000 токенов
                    </div>
                    <div class="hub-distribution-block">
                        <span>Сообщество Minter</span>
                        50 000 токенов
                    </div>
                </div>
                <p>В будущем токены со стороны фонда могут быть проданы инвесторам или клиентам, выданы в качестве наград или в счет оплаты за услуги. Мы видим следующий перечень потенциальных участников блокчейна и держателей токенов HUB:</p>
                <ul>
                    <li>Команда</li>
                    <li>Инвесторы (с вестингом 3–5 лет в смарт-контрактах)</li>
                    <li>Оракулы</li>
                    <li>Члены сообщества</li>
                    <li>Партнеры (маркетинговые, юридические, биржевые)</li>
                    <li>Маркет-мейкеры</li>
                </ul>
                <p>В 2021-м в дополнение к текущим 50 000 токенам, обращаемым в сообществе, добавятся еще максимум 50 000. Конкретные же планы по распределению эмиссии будут разрабатываться фондом и командой в начале 2022 года, когда пройдут основные этапы запуска моста и интеграции с блокчейнами.</p>
                <p>Данная практика уже является стандартом для DeFi-проектов, например, Uniswap или 1inch, которые первые объемы эмиссии распределяют бесплатно среди участников сообщества и клиентов, а последующие — между командой, инвесторами, партнерами и другими полезными участниками.</p>
            </div>
        </section>
        <section class="footer-section">
            <div class="container">
                <Footer class="footer--transparent"/>
                </div>
        </section>
    </div>
</template>
