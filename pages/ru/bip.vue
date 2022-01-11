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
        const title = 'Minter — интернет денег';
        const description = 'Единая децентрализованная сеть, позволяющая любому пользователю покупать, продавать, отправлять и зарабатывать такие цифровые активы, как BTC, ETH, BIP, USDT и многие другие.';
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
            <div>Обновление токеномики Minter 3 уже весной 2022 г. <a href="https://minterteam.medium.com/minter-3-%D0%BE%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%82%D0%BE%D0%BA%D0%B5%D0%BD%D0%BE%D0%BC%D0%B8%D0%BA%D0%B8-bip-6a6da7a18fe7" target="_blank" rel="nofollow">Подробнее</a></div>
        </div>
        <div class="u-container u-container--full index-language lang-wrap">
            <language class="" :locales='[{"code":"","name":"English"},{"code":"ru","name":"Russian"}]' lang="ru" :push="true"/>
        </div>
        <header>
            <div class="top_r">
                <div class="logo"><a href="#"><img src="/img/minter-logo-white.svg" width="155" height="48" alt="Minter"/></a></div>
                <h1>Интернет денег</h1>
                <div class="top_e">Minter — это единая децентрализованная сеть, позволяющая любому пользователю покупать, продавать, отправлять и зарабатывать такие цифровые активы, как BTC, ETH, BIP, USDT и многие другие.</div>
                <p><b>Купить BIP в:</b></p>
                <nuxt-link class="btn btn-img" to="/how-to-buy-and-sell-bip" v-track-click="'buy-bip'"><img src="/bipx/images/logos/minter_w.png" srcset="/bipx/images/logos/minter_w@2x.png 2x, /bipx/images/logos/minter_w@3x.png 3x" />Minter</nuxt-link>
                <a class="btn btn_c2 btn-img" href="https://v2.info.uniswap.org/pair/0xb1700c93ddc26ce1d59441c24daef1035444d7b7" target="_blank" v-track-click="'buy-bipx'"><img src="/bipx/images/logos/uniswap_w.png" srcset="/bipx/images/logos/uniswap_w@2x.png 2x, /bipx/images/logos/uniswap_w@3x.png 3x" />Uniswap</a>
                <a class="btn btn_c2 btn-img" href="https://pancakeswap.finance/info/pool/0xf51e1b34be6f2ddac9d3f4e6186b772ae4ae3855" target="_blank" v-track-click="'buy-bipx'"><img src="/bipx/images/logos/pancakeswap.png" srcset="/bipx/images/logos/pancakeswap@2x.png 2x, /bipx/images/logos/pancakeswap@3x.png 3x" />Pancake</a>
                <!--<a class="btn btn_c2 btn_nomargin" href="https://minterteam.medium.com/bipx-usdt-%D1%84%D0%B0%D1%80%D0%BC%D0%B8%D0%BD%D0%B3-0-2-%D0%BB%D0%BE%D1%82%D0%B5%D1%80%D0%B5%D1%8F-2d91d98fba71#0d32" target="_blank" v-track-click="'airdrop'">Airdrop</a>-->
            </div>
            <div class="top_l m-l-40"><img src="/bipx/images/header-bip.png" srcset="/bipx/images/header-bip@2x.png 2x, /bipx/images/header-bip@3x.png 3x" /></div>
        </header>
        <div class="bipx" id="bipx">
            <div class="bipx_l">
                <div class="bipx_t">Что такое BIP и BIPx?</div>
                <div class="bipx_e">BIP — это нативный токен сети Minter, а его обернутая версия в Ethereum и Binance Smart Chain называется BIPx. Minter — DPoS-блокчейн, который валидируется при помощи заделегированных BIP.</div>
                <div class="bipx_a">
                    <a class="bipx_cmc" href="https://coinmarketcap.com/currencies/minter-network/" target="_blank">CMC</a>
                    <a class="bipx_coi" href="https://www.coingecko.com/en/coins/bip" target="_blank">CoinGecko</a>
                </div>
            </div>
            <div class="bipx_r"><img src="/bipx/images/bipx.png" srcset="/bipx/images/bipx@2x.png 2x, /bipx/images/bipx@3x.png 3x" alt="" role="presentation"/></div>
        </div>
        <div class="figures" id="earn">
            <h2>Заработок в Minter</h2>
            <div class="figures_flx">
                <div class="figure">
                    <span>Программы фарминга</span>
                    До 365% годовых
                </div>

                <div class="figure">
                    <span>BIP стейкинг</span>
                    40% годовых
                </div>
                <div class="figure">
                    <span>Предоставление ликидности</span>
                    0.2% от каждого трейда
                </div>
                <div class="figure">
                    <span>Запуск сети</span>
                    15 мая 2019
                </div>
                <div class="figure">
                    <span>Капитализация</span>
                    ${{ prettyRound(marketCap) }}
                </div>
                <div class="figure">
                    <span>Монет в циркуляции</span>
                    51%
                </div>
            </div>
        </div>
        <div class="minter" id="features">
            <div class="minter_t">Преимущества сети</div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/minter1.svg" /></div>
                <div class="minter_li_t">Быстрые транзакции</div>
                <span>5 секунд</span> с финальными блоками
            </div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/minter2.svg" /></div>
                <div class="minter_li_t">Низкие комиссии в USD</div>
                <span>$0.01</span> за перевод, <span>$0.03</span> + <span>0.2%</span> за обмен, оплата в любых ликвидных монетах или токенах
            </div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/minter3.svg" /></div>
                <div class="minter_li_t">Кросс-чейн переводы</div>
                Кросс-чейн переводы с обменом. <br />Например, BUSD из Binance Smart Chain на USDC в Ethereum
            </div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/minter4.svg" /></div>
                <div class="minter_li_t">Доступ без преград</div>
                Децентрализованные ввод и вывод, которые легко делать
            </div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/minter5.svg" /></div>
                <div class="minter_li_t">Лимитные ордера</div>
                Лимитные ордера, основанные на уникальной реализации в ядре блокчейна Minter
            </div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/minter6.svg" /></div>
                <div class="minter_li_t">Кастомные токены и пулы</div>
                Создание собственных токенов и пулов ликвидности в несколько кликов
            </div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/minter7.svg" alt=""/></div>
                <div class="minter_li_t">Глобальная интеграция</div>
                Преимущества интеграции с блокчейнами Ethereum и Binance Smart Chain, а в будущем — и другими
            </div>
        </div>
        <div class="minter_bot">Торгуйте большинством криптовалют, токенов и цифровых активов в рамках одной сети. <span>Все — децентрализованно.</span></div>
        <div class="minter_sup">
            <div class="minter_l"><img src="/bipx/images/minter-sup.png" srcset="/bipx/images/minter-sup@2x.png 2x, /bipx/images/minter-sup@3x.png 3x" alt=""/></div>
            <div class="minter_r">
                <div class="minter_sup_t">Minter поддерживает трейдинг и переводы между сетями для</div>
                BTC, ETH, USDT, USDС, 1INCH, TON COIN, SHIB, METAVERSE INDEX, DAI, PAX, BUSD, BIP, HUB и многих других.
            </div>
        </div>
        <div class="compare" id="compare">
            <div class="compare_t">Сравните скорость, комиссии, удобство</div>
            <div class="compare_tab">
                <div class="compare_ths">
                    <div class="compare_1_2">DEX</div>
                    <div class="compare_3">Комиссия пула</div>
                    <div class="compare_4">Скорость</div>
                    <div class="compare_5">Стоимость</div>
                    <div class="compare_6">Необходимо транзакций</div>
                    <div class="compare_7">Комиссии в</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="/img/minter-logo-circle.svg" width="24" height="24" /></div>
                    <div class="compare_2">Minter</div>
                    <div class="compare_3">0.2%</div>
                    <div class="compare_4">5 сек.</div>
                    <div class="compare_5">$0.007</div>
                    <div class="compare_6">1 (<a href="https://explorer.minter.network/transactions/Mt2b9425c1cb91640a8e0dd2207fcc8de8480480b692f4c18fd60f344cbe69b117" target="_blank">Tx</a>)</div>
                    <div class="compare_7">Любой монете</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="/bipx/images/logos/pancakeswap.png" srcset="/bipx/images/logos/pancakeswap@2x.png 2x, /bipx/images/logos/pancakeswap@3x.png 3x" /></div>
                    <div class="compare_2">PancakeSwap</div>
                    <div class="compare_3">0.25%</div>
                    <div class="compare_4">6 сек.</div>
                    <div class="compare_5">$0.27</div>
                    <div class="compare_6">2 (<a href="https://bscscan.com/tx/0xc4655f75d9935e65380046f52e02722f9388273330a3d1ce48593cce7de71c08" target="_blank">Tx</a>, <a href="https://bscscan.com/tx/0xc063cab353d6ca021afe23ee6860787d6cbd286f94f7a8c50434f96dcf1e3d2f" target="_blank">Tx</a>)</div>
                    <div class="compare_7">BNB</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="/bipx/images/logos/uniswap.png" srcset="/bipx/images/logos/uniswap@2x.png 2x, /bipx/images/logos/uniswap@3x.png 3x" /></div>
                    <div class="compare_2">Uniswap</div>
                    <div class="compare_3">0.3%</div>
                    <div class="compare_4">16 сек.</div>
                    <div class="compare_5">$11.4</div>
                    <div class="compare_6">2 (<a href="https://etherscan.io/tx/0x0dc22e02dabda0b5dda7cbc4a997025c6d41af034b8e5b0ab1c002c8f1254485" target="_blank">Tx</a>, <a href="https://etherscan.io/tx/0x191302cbaba0c3ddec945f2a1365f9ca5347790b8f73cf3b69aead37fce77792" target="_blank">Tx</a>)</div>
                    <div class="compare_7">ETH</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="/bipx/images/logos/1inch.png" srcset="/bipx/images/logos/1inch@2x.png 2x, /bipx/images/logos/1inch@3x.png 3x" /></div>
                    <div class="compare_2">1INCH</div>
                    <div class="compare_3">0.3%</div>
                    <div class="compare_4">71 сек.</div>
                    <div class="compare_5">$9.6</div>
                    <div class="compare_6">2 (<a href="https://etherscan.io/tx/0x2918f27fffb09b889a4ca1c34133cb85c21124b8b0feaafc54e6f7ff3abd70bc" target="_blank">Tx</a>, <a href="https://etherscan.io/tx/0xbbee60884c8039e8783b3159008787fb99883380ac49b47f4e3015330b8ac2fb" target="_blank">Tx</a>)</div>
                    <div class="compare_7">ETH</div>
                </div>
                <div class="compare_tds">
                    <div class="compare_1"><img src="/bipx/images/logos/sushiswap.png" srcset="/bipx/images/logos/sushiswap@2x.png 2x, /bipx/images/logos/sushiswap@3x.png 3x" /></div>
                    <div class="compare_2">SushiSwap</div>
                    <div class="compare_3">0.3%</div>
                    <div class="compare_4">62 сек.</div>
                    <div class="compare_5">$9.7</div>
                    <div class="compare_6">2 (<a href="https://etherscan.io/tx/0x54d39d6c7388e1dda1813dc847f0b0067adc815b5ae4859a0bbf0061d678e26b" target="_blank">Tx</a>, <a href="https://etherscan.io/tx/0xc596e8b983dcdea03baa1c49965650e1cf1c2927fc786d17917b18c0e52f9ed7" target="_blank">Tx</a>)</div>
                    <div class="compare_7">ETH</div>
                </div>
            </div>
        </div>
        <div class="farmings" id="yf" v-if="pools.length">
            <div class="farmings_t">Программы фарминга в Minter</div>
            <div class="farming">
                <div class="farming_top">
                    <div class="farming_icos"><img src="https://explorer-static.minter.network/coins/1902.png" /><img src="https://explorer-static.minter.network/coins/0.png" /></div>
                    <div class="farming_t">HUB / BIP</div>
                </div>
                <div class="farming_param">
                    <div>Всего в ликвидности (TVL)</div>
                    <div>${{ prettyRound(usdPrice(pools[7].liquidityBip)) }}</div>
                </div>
                <div class="farming_param">
                    <div>Доходность фарминга (APR)</div>
                    <div>36.5%</div>
                </div>
                <div class="farming_param">
                    <div>Доходность стейкинга (APY)</div>
                    <div>{{ pretty(apy(pools[7])) }}%</div>
                </div>
            </div>
            <div class="farming">
                <div class="farming_top">
                    <div class="farming_icos"><img src="https://explorer-static.minter.network/coins/2107.png" /><img src="https://explorer-static.minter.network/coins/0.png" /></div>
                    <div class="farming_t">BNB / BIP</div>
                </div>
                <div class="farming_param">
                    <div>Всего в ликвидности (TVL)</div>
                    <div>${{ prettyRound(usdPrice(pools[8].liquidityBip)) }}</div>
                </div>
                <div class="farming_param">
                    <div>Доходность фарминга (APR)</div>
                    <div>36.5%</div>
                </div>
                <div class="farming_param">
                    <div>Доходность стейкинга (APY)</div>
                    <div>{{ pretty(apy(pools[8])) }}%</div>
                </div>
            </div>
            <div class="farming farming_all">
                <a href="https://explorer.minter.network/farming" target="_blank">Смотреть все</a>
            </div>
        </div>
        <div class="staking" id="staking">
            <div class="minter_t">Стейкинг</div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/staking1.svg" /></div>
                <div class="minter_li_t">Делегируйте</div>
                Делегируйте BIP валидаторам сети, чтобы получать BIP в качестве награды (около 40% годовых)
            </div>
            <div class="minter_li">
                <div class="minter_li_i"><img src="/bipx/images/staking2.svg" /></div>
                <div class="minter_li_t">Предоставляйте ликвидность</div>
                Добывайте BTC, ETH, USDT, USDC, 1INCH, BIP, HUB и многие другие, предоставляя ликвидность в пулы. Награда составляет 0.2% от каждого обмена
            </div>
        </div>
        <div class="wallets" id="wallets">
            <div class="wallets_t">Кошельки</div>
            <div class="wallets_i"><img src="/bipx/images/wallets.png" srcset="/bipx/images/wallets@2x.png 2x" alt="" role="presentation" /></div>
            <div class="wallets_r">
                <div class="wallet">
                    <div class="wallet_i"><img src="/bipx/images/logos/bipwallet.svg" /></div>
                    <div class="wallet_t">Bip Wallet</div>
                    <div class="wallet_e">Удобный и многогранный <br />кошелек-приложение для мобильных <br />устройств</div>
                    <div class="wallet_a">
                        <a class="wallet_andr" href="https://minter.link/ios" target="_blank">iOS</a>
                        <a class="wallet_ios" href="https://minter.link/android" target="_blank">Android</a>
                    </div>
                </div>
                <div class="wallet">
                    <div class="wallet_i"><img src="/bipx/images/logos/webwallet.svg" /></div>
                    <div class="wallet_t"><a href="https://wallet.bip.to/" target="_blank">Web Wallet</a></div>
                    <div class="wallet_e">Базовая веб-версия Bip Wallet. Включает весь ключевой функционал по управлению монетами: получение, отправка, делегирование</div>
                </div>
            </div>
            <div class="wallet">
                <div class="wallet_i"><img src="/img/index-wallet-minter.svg" width="48" height="48"/></div>
                <div class="wallet_t"><a href="https://wallet.minter.org/" target="_blank">Minter Wallet</a></div>
                <div class="wallet_e">Самое простое решение для получения и отправки средств. Чтобы начать, достаточно иметь электронную почту</div>
            </div>
            <div class="wallet">
                <div class="wallet_i"><img src="/img/index-wallet-console.svg" width="48" height="48" alt="" role="presentation"/></div>
                <div class="wallet_t"><a href="https://console.minter.network/" target="_blank">Console</a></div>
                <div class="wallet_e">Этот кошелек предлагает наиболее широкий спектр действий: помимо стандартного функционала, вы получаете возможность работать с чеками, выпускать монеты и токены, запускать и настраивать мастерноды, создавать MultiSig-адреса и пулы ликвидности и управлять ими, а также отправлять транзакции, подписанные офлайн</div>
            </div>
        </div>
        <div class="minter_roadmap" id="roadmap">
            <div class="minter_roadmap_l">
                <div class="minter_roadmap_t">Дорожная карта</div>
                <p>Учитывая недавние корректировки ведущими блокчейнами собственных токеномик, команда Minter предлагает осуществить крупный апдейт сети, нацеленный на улучшение экономической модели Minter, внедрить дефляционные и противоинфляционные механизмы, которые станут стимулом укрепления BIP.</p>
                <p>Команда Minter приступила к разработке перечисленных ниже механизмов. Мы планируем поэтапно внедрять эти обновления, с 1-го по 2-й квартал 2022 года.</p>
                <a class="btn btn_c2" href="https://minterteam.medium.com/minter-3-%D0%BE%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%82%D0%BE%D0%BA%D0%B5%D0%BD%D0%BE%D0%BC%D0%B8%D0%BA%D0%B8-bip-6a6da7a18fe7" target="_blank" v-track-click="'roadmap'">Подробнее</a>
            </div>
            <div class="minter_roadmap_r">
                <img src="/bipx/images/map.png" srcset="/bipx/images/map@2x.png 2x" alt="Minter roadmap"/>
            </div>
        </div>
        <div class="completed" id="completed">
            <div class="completed_t">Завершено в 2021</div>
            <div class="completed_timeline">
                <div class="completed_outer">
                    <div class="completed_card" id="timeline_1">
                        <div class="completed_info">
                            <div class="completed_title">Запуск Minter 2</div>
                            <p>12 апреля 2021 года в сети Minter было проведено масштабное обновление. Его основной целью было создание уникальной инфраструктуры для децентрализованной торговли, межсетевых переводов и возможностей заработка в DeFi (для поставщиков ликвидности, трейдеров, кредиторов и заемщиков).</p>
                            <p>Minter как никогда приблизился к реализации своего первоначального видения эффективной архитектуры Интернета денег на основе блокчейна.</p>
                            <p class="timeline_links">
                                <a href="https://coinmarketcal.com/en/event/minter-2-launch-58690" target="_blank" rel="nofollow">Событие в календаре</a>
                                <a href="https://daniillashin.medium.com/minter-2-on-chain-automated-market-maker-with-order-book-5c98869682c9" target="_blank" rel="nofollow">Подробнее</a>
                            </p>
                        </div>
                    </div>
                    <div class="completed_card" id="timeline_2">
                        <div class="completed_info">
                            <div class="completed_title">Сжигание</div>
                            <p>15 мая 2021 года MDF (Minter Development Foundation) сожгла 385 000 000 BIP, или 9.3% от текущего предложения (~8 млн долларов США на тот момент).</p>
                            <p>Этот объем был навсегда изъят из обращения и никогда не попадет в рынок.</p>
                            <p>Дефляционные механизмы, такие как ограниченное предложение, сжигание монет и постепенное уменьшение вознаграждения за создание новых блоков, доказали свою эффективность в укреплении токеномики многих блокчейнов.</p>
                            <p class="timeline_links">
                                <a href="https://coinmarketcal.com/en/event/300-million-bip-burn-66859" target="_blank" rel="nofollow">Событие в календаре</a>
                                <a href="https://minterteam.medium.com/%D1%81%D0%B6%D0%B8%D0%B3%D0%B0%D0%BD%D0%B8%D0%B5-385-%D0%BC%D0%B8%D0%BB%D0%BB%D0%B8%D0%BE%D0%BD%D0%BE%D0%B2-bip-%D0%BA%D0%BE-%D0%B4%D0%BD%D1%8E-%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA%D0%B0-%D1%81%D0%B5%D1%82%D0%B8-6a56ef33a235" target="_blank" rel="nofollow">Подробнее</a>
                            </p>
                        </div>
                    </div>
                    <div class="completed_card" id="timeline_3">
                        <div class="completed_info">
                            <div class="completed_title">Выпуск токена BIPX</div>
                            <p>BIPx — это обернутая версия BIP в Ethereum и Binance Smart Chain. BIPx открывает лучшие возможности глобальных децентрализованных финансов (DeFi) и помогает пользователям зарабатывать в любом из кошельков Minter.</p>
                            <p class="timeline_links">
                                <a href="https://coinmarketcal.com/en/event/token-launch-71586" target="_blank" rel="nofollow">Событие в календаре</a>
                                <a href="https://minterteam.medium.com/%D0%BA%D0%B0%D0%BA-bipx-%D0%BF%D0%BE%D0%BC%D0%BE%D0%B6%D0%B5%D1%82-%D0%B7%D0%B0%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%82%D1%8C-%D0%B2-defi-9e54b5e625fa" target="_blank" rel="nofollow">Подробнее</a>
                            </p>
                        </div>
                    </div>
                    <div class="completed_card" id="timeline_4">
                        <div class="completed_info">
                            <div class="completed_title">Релиз HONEE Wallet</div>
                            <p>Альфа-запуск HONEE — простейшего крипто-кошелька, помогающего зарабатывать.</p>
                            <p class="timeline_links">
                                <a href="https://coinmarketcal.com/en/event/honee-wallet-launch-88666" target="_blank" rel="nofollow">Событие в календаре</a>
                                <a href="https://zen.yandex.ru/media/id/61485e9a943d3a04b62ca078/honee-kriptokoshelek-pomogaiuscii-tebe-zarabatyvat-614863e6e8623024eb221a6b" target="_blank" rel="nofollow">Подробнее</a>
                                <a href="https://honee.app/ru" target="_blank">Попробуйте HONEE</a>
                            </p>
                        </div>
                    </div>
                    <div class="completed_card" id="timeline_5">
                        <div class="completed_info">
                            <div class="completed_title">Листинг популярных криптовалют в Minter</div>
                            <p>Запуск моста Minter Hub позволил перемещать токены между сетями. На конец 2021 года была добавлена поддержка следующих популярных монет:<br>
                            BTC, ETH, BNB, USDT, USDС, 1INCH, TON COIN, SHIB, METAVERSE INDEX, DAI, PAX, BUSD, BIP, HUB и других.</p>
                            <p class="timeline_links">
                                <a href="https://minterteam.medium.com/%D0%BB%D0%B8%D1%81%D1%82%D0%B8%D0%BD%D0%B3-%D1%82%D0%BE%D0%BA%D0%B5%D0%BD%D0%BE%D0%B2-%D0%B2-minter-c7f4bc797e7d" target="_blank" rel="nofollow">Подробнее</a>
                            </p>
                        </div>
                    </div>
                    <div class="completed_card" id="timeline_6">
                        <div class="completed_info">
                            <div class="completed_title">Обновление Minter 2.6</div>
                            <p>Этим апдейтом Minter совершил революцию в области DeFi-протоколов, представив On-Chain Automated Market Maker with Order Book (AMMOB).</p>
                            <p>Будучи маркетплейсом децентрализованных активов, Minter теперь позволяет пользователям размещать и исполнять лимитные ордера, чтобы покупать или продавать любую криптовалюту по заранее установленному курсу. Лимитные ордера находятся внутри самих пулов ликвидности.</p>
                            <p class="timeline_links">
                                <a href="https://coinmarketcal.com/en/event/minter-update-95562" target="_blank" rel="nofollow">Событие в календаре</a>
                                <a href="https://t.me/MinterNetwork/2394" target="_blank" rel="nofollow">Подробнее</a>
                            </p>
                        </div>
                    </div>
                    <div class="completed_card" id="timeline_7">
                        <div class="completed_info">
                            <div class="completed_title">Запуск Minter Hub 2</div>
                            <p>
                                <ul>
                                    <li><b>Простое модульное подключение блокчейнов</b> <br>открывает доступ к активам, ликвидности и DeFi-инструментам других сетей без переписывания кода. Новый релиз уже содержит в себе интегрированный BSC.</li>
                                    <li><b>Переработанный механизм взимания комиссий</b> <br>за кросс-чейн переводы сокращает издержки. Система возвращает пользователю "кэшбек", если комиссия вышла меньше ожидаемой.</li>
                                    <li><b>Поддержка нативного ETH</b> <br>позволяет забыть о конвертации в wETH.</li>
                                    <li><b>Скидки для держателей HUB</b> <br>просты — держите токен HUB на балансе и платите меньшую комиссию за переводы токенов в другие сети.</li>
                                    <li><b>Кросс-чейн DeFi</b> <br>и полное взаимодействие с другими блокчейнами позволяют совершать не только переводы, но и любые другие операции, в том числе фарминг, стейкинг, лотереи, кредиты и так далее. А комиссию все так же можно оплатить любой ликвидной монетой в сети Minter.</li>
                                </ul>
                            </p>
                            <p class="timeline_links">
                                <a href="https://coinmarketcal.com/en/event/minter-hub-2-launch-95561" target="_blank" rel="nofollow">Событие в календаре</a>
                                <a href="https://t.me/minterdev/253" target="_blank" rel="nofollow">Подробнее</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tech" id="tech">
            <div class="tech_t">Техническая сторона</div>
            <div class="tech_e">В документации вы найдете все, чтобы начать работу с блокчейном Minter, разрабатывать на нем сервисы и приложения или интегрировать его во внутренние процессы вашей организации.</div>
            <div class="tech_a">
                <a class="tech_git" href="https://github.com/MinterTeam" target="_blank">GitHub</a>
                <a class="tech_api" href="https://www.minter.network/docs#node-api" target="_blank">API</a>
                <a class="tech_sdk" href="https://www.minter.network/docs#minter-sdks" target="_blank">SDK</a>
                <a class="tech_doc" href="https://www.minter.network/docs" target="_blank">Docs</a>
                <a class="tech_cons" href="https://console.minter.network/" target="_blank">Console</a>
            </div>
        </div>
        <div class="social" id="follow">
            <div class="social_t">Соцмедиа</div>
            <div class="social_e">Следите за всеми нашими новостями, объявлениями и новым контентом в социальных сетях и мессенджерах.</div>
            <div class="social_as">
                <div class="social_a social_md"><a href="https://medium.com/@MinterTeam" target="_blank">Medium</a></div>
                <div class="social_a social_tw"><a href="https://twitter.com/MinterTeam" target="_blank">Twitter</a></div>
                <div class="social_a social_rd"><a href="https://www.reddit.com/r/Minter/" target="_blank">Reddit</a></div>
                <div class="social_a social_tc"><a href="tg://resolve?domain=MinterNetwork" target="_blank">Telegram-канал</a></div>
                <div class="social_a social_tg"><a href="tg://join?invite=EafyEVD-HEOxDcv8YyaqNg" target="_blank">Telegram-группа</a></div>
                <div class="social_a social_fb"><a href="https://www.facebook.com/MinterNetwork" target="_blank">Facebook</a></div>
            </div>
        </div>
        <div class="discover" id="hub">
            <div class="discover_t">Откройте для себя токен HUB</div>
            <div class="discover_top">
                <div class="discover_img"><img src="/bipx/images/discover.svg" /></div>
                <div class="discover_th">Текущая цена <span>${{ pretty(hubPrice) }}</span></div>
                <div class="discover_th">Начальная цена <span>$0.11</span></div>
                <div class="discover_th">Макс. эмиссия <span>1 000 000</span></div>
                <div class="discover_th">Пулы <span><a href="https://explorer.minter.network/pools/HUB/USDTE" target="_blank">Minter</a> <a href="https://v2.info.uniswap.org/pair/0x3796fee2b555da1356cdcd3e1861263b351a58a0" target="_blank">Ethereum</a></span></div>
                <div class="discover_go"><a class="btn" href="https://minter.network/ru/hub" target="_blank" v-track-click="'bipx-white-paper'">Подробнее</a></div>
            </div>
            <!--<div class="discover_chart"><img src="/bipx/images/chart.svg" /></div>-->
            <div class="discover_e">
                <p><a href="https://etherscan.io/token/0x8e9A29e7Ed21DB7c5B2E1cd75e676dA0236dfB45" target="_blank">HUB</a> — это нативный токен в блокчейне Minter Hub, который, в свою очередь, является мостом, соединяющим Minter с Ethereum и Binance Smart Chain. HUB — это PoS-токен, и все оракулы получают 1% комиссии от переводов между сетями. HUB также служит резервом для пулов в Minter, Ethereum и Binance Smart Chain.</p>
                <p>Например, Uniswap v3 <a href="https://info.uniswap.org/#/pools/0x27878ae7f961a126755042ee8e5c074ea971511f" target="_blank">HUB-USDT</a>, Uniswap v2 <a href="https://v2.info.uniswap.org/pair/0x3796fee2b555da1356cdcd3e1861263b351a58a0" target="_blank">HUB-USDT</a>, Minter <a href="https://explorer.minter.network/pools/HUB/BIP" target="_blank">HUB-BIP</a>.</p>
            </div>
        </div>
        <Footer class="footer--transparent"/>
    </div>
</template>
