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
        // Footer,
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
        const title = 'Кросс-чейн мост в глобальную крипто-ликвидность';
        const description = 'Minter Hub — это блокчейн, соединяющий Minter, Ethereum и Binance Smart Chain. Скоро будут добавлены Polkadot, Cardano, Solana и другие популярные сети.';
        // const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

        return {
            title: title + ' | Minter Network',
            meta: [
                { hid: 'og-title', name: 'og:title', content: title },
                { hid: 'description', name: 'description', content: description },
                { hid: 'og-description', name: 'og:description', content: description },
                { hid: 'og-image', name: 'og:image', content: `/hub/images/meta.png` },
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
            // bipPrice: 0,
            hubPrice: 0,
            // pools: [],
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
        <div class="promo-top">
            <img src="/hub/images/hub-promo-icon.svg" />
            <div>Запуск Minter Hub 2 состоится <b>2 декабря 2021</b>.</div>
        </div>
        <div class="bg_top">
            <header>
                <div class="logo"><img src="/hub/images/logo.svg" /></div>
                <div class="lang"><language class="" :locales='[{"code":"","name":"English"},{"code":"ru","name":"Russian"}]' lang="ru" :push="true"/></div>
            </header>
            <div class="home_top">
                <h1>Кросс-чейн мост в глобальную крипто-ликвидность. Большое обновление 2 декабря</h1>
                <p>Minter Hub — это блокчейн, соединяющий Minter, Ethereum и Binance Smart Chain. Скоро будут добавлены Solana, Cardano, Polygon, Terra, Tron и другие популярные сети. Запуск Minter Hub 2 состоится 2 декабря 2021 года.</p>
                <a class="btn" href="https://app.1inch.io/#/1/swap/USDT/0x8e9A29e7Ed21DB7c5B2E1cd75e676dA0236dfB45" target="_blank" v-track-click="'hub-buyhub'">Купить HUB в Ethereum</a>
                <a class="btn btn_alt" href="https://console.minter.network/buy?coin=HUB" target="_blank" v-track-click="'hub-buyhubminter'">Купить HUB в Minter</a>
            </div>
        </div>
        <div class="wrap figures">
            <h2>В цифрах</h2>
            <div class="figures_flx">
                <div class="figure">
                    <span>Запуск</span>
                    Апрель 2021
                </div>
                <div class="figure">
                    <span>Скорость</span>
                    20–60 сек.
                </div>
                <div class="figure">
                    <span>Оракулов</span>
                    11
                </div>
                <div class="figure">
                    <span>Объем кросс-чейн переводов</span>
                    Более $10 000 000
                </div>
                <div class="figure">
                    <span>Эмиссия</span>
                    1 000 000 HUB
                </div>
                <div class="figure">
                    <span>Награды в пулах с HUB</span>
                    До 365% годовых
                </div>
                <div class="figure">
                    <span>Вознаграждения за стейкинг</span>
                    До 1% со всех кросс-чейн транзакций
                </div>
            </div>
        </div>
        <div class="how">
            <h2>Как это работает</h2>
            <p>Minter Hub — это отдельный блокчейн со своими валидаторами (оракулами), которые подключены ко всем сетям сразу (Minter, Ethereum, BSC) и имеют доступ к мультисиг-кошелькам в каждой из них.</p>
            <p>Оракулы блокируют монеты в одной сети и выпускают «зеркалированные» версии в другой.</p>
        </div>
        <div class="oracles">
            <h2>Оракулы</h2>
            <p>Minter Hub рассчитан на 16 оракулов и PoS-консенсус, что означает залог стейка для голосований по блокам. Однако в случае необходимости решение об изменении правил и кода сети может быть принято оракулами блокчейна.</p>
            <p>Кросс-чейн переводы — это новая эра суверенных блокчейнов. Переводы позволяют не просто общаться сетям, а делать надежные, быстрые и безопасные децентрализованные транзакции. Никто не может отменить, изменить или цензурировать данные переводы.</p>
        </div>
        <div class="wrap speedcost">
            <h2>Скорость и стоимость</h2>
            <p>Например, транзакции Minter ⇔ Ethereum в среднем занимают <b>20–60 секунд</b>, что достаточно быстро для переводов между сетями. В то же время истинно децентрализованный процессинг требует уплаты больших комиссий. В Ethereum кросс-чейн комиссии взимаются за подпись каждого оракула; помимо этого, <b>1%</b> начисляется оракулам Minter Hub за предоставляемые услуги.</p>
        </div>
        <div class="products">
            <h2>Продукты</h2>
            <div class="products_flx">
                <div class="product">
                    <div class="product_img"><img src="/hub/images/minter.svg" /></div>
                    <p>Minter — маркетплейс цифровых активов, где каждый может купить, продать, отправить или потратить BTC, ETH, BIP, USDC и другие</p>
                    <a class="btn btn_c2" href="https://www.minter.network/ru" v-track-click="'hub-minter'" target="_blank">Подробнее</a>
                </div>
                <div class="product">
                    <div class="product_img"><img src="/hub/images/honee.svg" /></div>
                    <p>Honee — это крипто-кошелек, который помогает зарабатывать. Стадия альфа-тестирования начинается во вторник, 28 сентября 2021 г.</p>
                    <a class="btn btn_c2" href="https://honee.app/" v-track-click="'hub-honee'" target="_blank">Подробнее</a>
                </div>
            </div>
        </div>
        <div class="hubtoken_bg">
            <div class="wrap hubtoken">
                <div class="hubtoken_top">
                    <div class="hubtoken_img"><img src="/hub/images/hub.svg" /></div>
                    <div class="hubtoken_t"><span>Токен HUB</span> Базовый токен сети Minter Hub называется HUB и выпущен в объеме 1 000 000 единиц.</div>
                </div>
                <p>На данный момент, HUB представляет собой ERC-20 токен в сети Ethereum и токен в сети Minter, без каких-либо ограничений и локов, то есть полностью свободный для обращения.</p>
                <p>Увеличение (дополнительная эмиссия) количества токенов невозможно. Сжигание и локи осуществляются по голосованию оракулов Minter Hub.</p>
            </div>
        </div>
        <div class="wrap">
            <h2>Текущее распределение HUB</h2>
            <div class="figures_flx">
                <div class="figure">
                    <span>Фонд</span>
                    948 442 токена
                </div>
                <div class="figure">
                    <span>Сообщество Minter</span>
                    51 558 токенов
                </div>
            </div>
            <div class="currenthub_txt">
                <p>В будущем токены со стороны фонда могут быть проданы инвесторам или клиентам, выданы в качестве наград или в счет оплаты за услуги. Мы видим следующий перечень потенциальных участников блокчейна и держателей токенов HUB:</p>
                <ul class="list">
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
        </div>
        <div class="wrap">
            <div class="tokenomics1">
                <h2>Токеномика</h2>
                <p>В этом году мы видим три основных варианта применения токенов HUB, позволяющих создать долгосрочный баланс сил и растущую экономику блокчейна: Стейкинг, Скидки на комиссии & Подсказки.</p>
            </div>
            <div class="tokenomics2">
                <div class="tokenomics_top">
                    <div class="tokenomics_ico"><img src="/hub/images/tokenomics2.svg" /></div>
                    <div class="tokenomics_t">Стейкинг</div>
                </div>
                <p>Держатели HUB могут стейковать свои токены у оракулов и получать до 1% со всех кросс-чейн переводов, совершенных через Minter Hub. Например, когда пользователь отправляет 100 USDT из Minter в Ethereum, 1 USDT выплачивается оракулам пропорционально их стейку в Minter Hub.</p>
                <p>В свою очередь оракулы Minter Hub должны стейковать HUB, чтобы гарантировать честность обработки транзакций и формировать блоки. За это они получают до 1% комиссии за все переводы между сетями, которой затем делятся со своими стейкерами.</p>
            </div>
            <div class="tokenomics3">
                <div class="tokenomics_top">
                    <div class="tokenomics_ico"><img src="/hub/images/tokenomics3.svg" /></div>
                    <div class="tokenomics_t">Скидки держателям HUB</div>
                </div>
                <p>Принимая во внимание, что 1% может быть высокой платой для профессиональных игроков с большими оборотами, но при этом сохраняя долгосрочный интерес оракулов при поддержании сети Minter Hub, мы собираемся внедрить следующую систему скидок для держателей HUB.</p>
                <p>Токен HUB позволит снизить комиссии на переводы между Minter, Ethereum и Binance Smart Chain. Так как по одной сид-фразе управляются сразу три адреса, было предложено понижать комиссию для держателей HUB на любом из них. В базовом варианте комиссия составляет 1% за любой из переводов между сетями, но наличие токенов (просто HODL) теперь даст следующую скидку:</p>
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
                    <div class="tokenomics_t">Подсказки</div>
                </div>
                <p>Важнейшим же элементом токеномики станут подсказки о трейдах и доходных операциях, которые исполняются с помощью Minter Hub. Подсказки будут получать все участники сообщества, которые имеют на своем адресе в любой из сетей хотя бы 1 HUB. Таким образом, мы поможем ответить на главный вопрос DeFi-рынка: «Как зарабатывать?».</p>
                <p>Отличительной особенностью децентрализованных финансов в целом является возможность пользователей следить за действиями различных адресов, а значит, и копировать их успешные транзакции. До сегодняшнего дня так называемый «социальный трейдинг» был доступен только в закрытых приложениях или клубах, и в основном в области торгов. Мы же намерены предложить пользователям подсказки по всему спектру финансовых услуг — от торговли и управления ликвидностью до кредитов и вкладов.</p>
            </div>
        </div>
        <div class="wrap pricing">
            <h2>Ценообразование</h2>
            <p>Начальную эмиссию в <b>50 000 токенов</b> сообщество получило <b>бесплатно</b>.</p>
            <p>В первые же дни члены сообщества запустили торги пары <a href="https://v2.info.uniswap.org/pair/0x3796fee2b555da1356cdcd3e1861263b351a58a0" target="_blank" v-track-click="'hub-hubpool'">HUB-USDT</a> в Uniswap, установив стартовую цену на отметке $0.10. Первый трейд состоялся <a href="https://etherscan.io/tx/0x9e1e7f6e22022c03bb9e95505126c21644ce3f15b3b5ea1dbbd6d744151faa41" target="_blank">27 октября 2020 г.</a>, за $1 были куплены 9 HUB.</p>
            <div class="pricing_flx">
                <div class="pricing_cur">Цена сейчас: <span>${{ pretty(hubPrice) }}</span></div>
                <div class="pricing_buy"><a class="btn" href="https://app.1inch.io/#/1/swap/USDT/0x8e9A29e7Ed21DB7c5B2E1cd75e676dA0236dfB45" target="_blank" v-track-click="'hub-buyhub'">Купить HUB</a></div>
            </div>
            <p>Команда не исключает, что поддержит листинги и интеграции в том или ином виде, в том числе наградами в токенах HUB. Но сама не будет инициировать подобную деятельность, предоставив сообществу полную свободу действий.</p>
        </div>
        <div class="investors">
            <h2>Инвесторы</h2>
            <p>С момента первых анонсов Minter Hub фонд (держатель токенов) стал получать предложения от инвесторов, заинтересованных в долгосрочном участии в протоколе. Речь идет как о венчурных фондах, так и об ориентированных только на блокчейн-проекты.</p>
            <p>Мы планируем продавать лишь небольшие пакеты токенов, не более чем 5% на один фонд, и обязательно с локапом или вестингом на 3–7 лет. Чем больше срок, тем выше скидка в момент покупки.</p>
            <p>Говоря об «инвесторах», здесь и далее мы подразумеваем только квалифицированные и соблюдающие регуляционные правила в области криптовалют своих стран юридические лица.</p>
        </div>
        <div class="technologies wrap">
            <div class="technologies_top">
                <div>
                    <h2>Технологии</h2>
                    <p>Minter Hub разработан на базе Cosmos SDK,  а также доработанного решения Peggy от команды Cosmos.</p>
                </div>
            </div>
            <p>Код проекта доступен в публичном репозитории:  <a href="https://github.com/MinterTeam/minter-hub" target="_blank">https://github.com/MinterTeam/minter-hub</a>.</p>
            <p>Minter Hub поддерживается валидаторами, которые запускают на своих серверах:</p>
            <ul class="list">
                <li>Ноду Minter</li>
                <li>Ноду Ethereum</li>
                <li>Ноду Minter Hub</li>
                <li>Ethereum Orchestrator — ПО, отслеживающее события в сети Ethereum и транслирующее их в Minter Hub. Также отвечает за отправку транзакций вывода в Ethereum</li>
                <li>Minter Orchestrator — ПО, отслеживающее события в сети Minter и транслирующее их в Minter Hub. Также отвечает за отправку транзакций вывода в Minter</li>
            </ul>
            <p>Зеркалируемые токены блокируются на мультисиг-аккаунтах валидаторов Minter Hub до запроса их вывода.</p>
        </div>
        <div class="bg_bot">
            <footer>
                <div class="logo_bot"><img src="/hub/images/minter.svg" alt=""></div>
                <div class="copy">Copyright © 2019-2021 Minter Development Foundation. All rights reserved.</div>
                <div class="bot_cont">
                    75 Broadway, Suite 202, San Francisco, CA, 94111 <br>
                    For correspondence: 548 Market St #32852, San Francisco, CA 94104-5401 <br>
                    <a href="mailto:hello@minter.org">hello@minter.org</a>
                </div>
                <div class="clear"></div>
            </footer>
        </div>
    </div>
</template>
