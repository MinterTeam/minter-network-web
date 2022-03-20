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
        const title = 'Блокчейн для заработка криптовалют';
        const description = 'Minter — это единая децентрализованная сеть, позволяющая каждому покупать, продавать, отправлять и зарабатывать цифровые активы';
        // const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

        return {
            title: title + ' | Minter Network',
            meta: [
                { hid: 'og-title', name: 'og:title', content: title },
                { hid: 'description', name: 'description', content: description },
                { hid: 'og-description', name: 'og:description', content: description },
                { hid: 'og-image', name: 'og:image', content: `/newnetwork/images/meta_ru.png` },
            ],
            link: [
                { rel: 'canonical', href: `${HOST}/bip`},
                { rel: 'stylesheet', href: '/newnetwork/style.css', hid: 'newnetwork-style'},
                { rel: 'stylesheet', href: '/newnetwork/style320.css', media: 'screen and (max-width: 1020px)', hid: 'newnetwork-style320'},
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
        const style = document.querySelector('[data-hid="newnetwork-style"]');
        const style320 = document.querySelector('[data-hid="newnetwork-style320"]');
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
        <div class="promo-top">
            <div><b>Minter 3</b>: Обновление токеномики уже весной 2022. <a href="https://www.minter.network/ru/torronet" target="_blank">Узнать больше</a></div>
        </div>
        <header>
            <div class="container">
                <div class="top-bar">
                    <div class="logo"><a href="/"><img src="/img/minter-logo-circle.svg" alt="Minter Network"/> Minter</a></div>
                    <div class="menu">
                        <div class="menu-link">
                            <span class="menu-link-a">Продукты</span>
                            <div class="sub-menu">
                                <div class="sub-menu-item">
                                    <a href="https://console.minter.network/ru" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/wallet-minter.svg" alt="Minter DEX">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Minter DEX</h4>
                                            <p>Покупайте, продавайте, отправляйте и зарабатывайте цифровые активы полностью децентрализованно. Низкие комиссии, фиксированные в долларах США, быстрые транзакции, оффчейн лимитные ордера.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/ru/hub" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/hub-logo.svg" alt="Minter HUB">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Minter HUB</h4>
                                            <p>Minter Hub — это мост в глобальную криптоликвидность, отдельный сайдчейн с уникальной технологией кросс-чейн смарт-контрактов.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://honee.app/ru" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/honee.svg" alt="Honee Wallet">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Honee Wallet</h4>
                                            <p>Простейший криптокошелек, помогающий вам зарабатывать.</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="menu-link">
                            <span class="menu-link-a">Сеть</span>
                            <div class="sub-menu">
                                <div class="sub-menu-item">
                                    <a href="https://explorer.minter.network/validators" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_validators.svg" alt="Minter Валидаторы">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Валидаторы</h4>
                                            <p>Статусы активности, время непрерывной работы, общая эмиссия, статистика BIP, количество и скорость блоков и транзакций за сутки, валидаторы, а также сетевые комиссии, уплаченные ежедневно.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://explorer.minter.network/" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_explorer.svg" alt="Minter Эксплорер">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Эксплорер</h4>
                                            <p>Обозреватель транзакций, блоков и адресов.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://status.minter.network/" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_status.svg" alt="Minter Статус">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Статус</h4>
                                            <p>Обобщенная информация о сети.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://console.minter.network/ru" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_console.svg" alt="Minter Консоль">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Консоль</h4>
                                            <p>Этот кошелек обладает наибольшим набором инструментов: помимо стандартного функционала базового кошелька, вы также можете работать с чеками, выпускать монеты, запускать мастерноды, а также создавать и управлять MultiSig-адресами.</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="menu-link">
                            <span class="menu-link-a">Разработчикам</span>
                            <div class="sub-menu">
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/ru/docs" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_docs.svg" alt="Minter Документация">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Документация</h4>
                                            <p>Спецификации блокчейна, инструкции по поднятию ноды, подробные описания всех сущностей.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/docs#node-api" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_api.svg" alt="Minter API">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>API</h4>
                                            <p>Все доступные ресурсы для разработчиков, собранные в одном месте.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/docs#minter-sdks" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_sdk.svg" alt="Minter SDK">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>SDK</h4>
                                            <p>Подробные описания всех сущностей (монеты, транзакции, чеки, MultiSig-адреса и т. д.), комиссии, валидаторы, ссылки на все SDK.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://github.com/MinterTeam/" target="_blank" rel="nofollow">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_github.svg" alt="Minter GitHub">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>GitHub</h4>
                                            <p>Исходный код репозиториев команды Minter на платформе GitHub. Нода, кошельки, численные SDK и API.</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="menu-link">
                            <a href="https://explorer.minter.network/validators" target="_blank" class="menu-link-a">Валидаторы</a>
                        </div>
                        <div class="menu-link">
                            <a href="#social" rel="nofollow" class="menu-link-a">Сообщество</a>
                        </div>
                        <div class="menu-link">
                            <a href="https://minterteam.medium.com/" target="_blank" rel="nofollow" class="menu-link-a">Блог</a>
                        </div>
                        <language class="" :locales='[{"code":"","name":"English"},{"code":"ru","name":"Russian"}]' lang="ru" :push="true"/>
                        <div class="hamburger-menu">
                            <input id="menu__toggle" type="checkbox" />
                            <label class="menu__btn" for="menu__toggle">
                                <span></span>
                            </label>
                            <div class="menu__box">
                                <h4>Продукты</h4>
                                <div class="sub-menu-item">
                                    <a href="https://console.minter.network/ru" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/wallet-minter.svg" alt="Minter DEX">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Minter DEX</h4>
                                            <p>Покупайте, продавайте, отправляйте и зарабатывайте цифровые активы полностью децентрализованно. Низкие комиссии, фиксированные в долларах США, быстрые транзакции, оффчейн лимитные ордера.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/ru/hub" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/hub-logo.svg" alt="Minter HUB">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Minter HUB</h4>
                                            <p>Minter Hub — это мост в глобальную криптоликвидность, отдельный сайдчейн с уникальной технологией кросс-чейн смарт-контрактов.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://honee.app/ru" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/honee.svg" alt="Honee Wallet">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Honee Wallet</h4>
                                            <p>Простейший криптокошелек, помогающий вам зарабатывать.</p>
                                        </div>
                                    </a>
                                </div>
                                <hr>
                                <h4>Сеть</h4>
                                <div class="sub-menu-item">
                                    <a href="https://explorer.minter.network/validators" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_validators.svg" alt="Minter Валидаторы">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Валидаторы</h4>
                                            <p>Статусы активности, время непрерывной работы, общая эмиссия, статистика BIP, количество и скорость блоков и транзакций за сутки, валидаторы, а также сетевые комиссии, уплаченные ежедневно.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://explorer.minter.network/" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_explorer.svg" alt="Minter Эксплорер">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Эксплорер</h4>
                                            <p>Обозреватель транзакций, блоков и адресов.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://status.minter.network/" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_status.svg" alt="Minter Статус">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Статус</h4>
                                            <p>Обобщенная информация о сети.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://console.minter.network/ru" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_console.svg" alt="Minter Консоль">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Консоль</h4>
                                            <p>Этот кошелек обладает наибольшим набором инструментов: помимо стандартного функционала базового кошелька, вы также можете работать с чеками, выпускать монеты, запускать мастерноды, а также создавать и управлять MultiSig-адресами.</p>
                                        </div>
                                    </a>
                                </div>
                                <hr>
                                <h4>Разработчикам</h4>
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/ru/docs" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_docs.svg" alt="Minter Документация">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Документация</h4>
                                            <p>Спецификации блокчейна, инструкции по поднятию ноды, подробные описания всех сущностей.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/docs#node-api" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_api.svg" alt="Minter API">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>API</h4>
                                            <p>Все доступные ресурсы для разработчиков, собранные в одном месте.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://www.minter.network/docs#minter-sdks" target="_blank">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_sdk.svg" alt="Minter SDK">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>SDK</h4>
                                            <p>Подробные описания всех сущностей (монеты, транзакции, чеки, MultiSig-адреса и т. д.), комиссии, валидаторы, ссылки на все SDK.</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="sub-menu-item">
                                    <a href="https://github.com/MinterTeam/" target="_blank" rel="nofollow">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/ic_github.svg" alt="Minter GitHub">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>GitHub</h4>
                                            <p>Исходный код репозиториев команды Minter на платформе GitHub. Нода, кошельки, численные SDK и API.</p>
                                        </div>
                                    </a>
                                </div>
                                <hr>
                                <h4>Другое</h4>
                                <div class="sub-menu-item">
                                    <a href="https://minterteam.medium.com/" target="_blank" rel="nofollow">
                                        <div class="sub-menu-item-image">
                                            <img src="/newnetwork/images/social_md.svg" alt="Minter Blog">
                                        </div>
                                        <div class="sub-menu-item-content">
                                            <h4>Блог</h4>
                                            <p>Анонсы разработок, ежемесячные отчеты, обзоры и полезные гайды.</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hello">
                    <div class="hello-content">
                        <h1>Блокчейн для заработка криптовалют</h1>
                        <div class="hello-buttons">
                            <a class="btn" href="https://console.minter.network/ru" target="_blank" v-track-click="'start-earning'">Начать зарабатывать</a>
                            <a class="btn btn-alt" href="https://www.minter.network/ru/how-to-buy-and-sell-bip" target="_blank" v-track-click="'buy-bipx'">Купить BIP</a>
                            <a class="btn btn-alt" href="https://www.minter.network/ru/earn" target="_blank" v-track-click="'read-guides'">Читать гайды</a>
                        </div>
                        <p>Minter — это единая децентрализованная сеть, позволяющая каждому покупать, продавать, отправлять и зарабатывать цифровые активы</p>
                    </div>
                </div>
            </div>
            <div class="stat-bar">
                <div class="container">
                    <div class="stat-items">
                        <div class="stat-item">
                            <small>Запуск сети</small>
                            <div>15 мая 2019 г.</div>
                        </div>
                        <div class="stat-item">
                            <small>Капитализация</small>
                            <div>$7 794 012</div>
                        </div>
                        <div class="stat-item">
                            <small>Циркулирующее предложение</small>
                            <div>56%</div>
                        </div>
                        <div class="stat-item">
                            <small>Стейкинг BIP</small>
                            <div>~35% APY</div>
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
                        <img src="/newnetwork/images/bip-staking.svg" alt="Стейкинг BIP">
                        <h3>Стейкинг BIP</h3>
                        <p>Делегируйте BIP валидаторам и получайте часть комиссий и вознаграждений за блоки.</p>
                        <a href="https://www.minter.network/ru/earn/delegation" target="_blank" class="btn btn-alt">Подробнее</a>
                    </div>
                    <div class="tool earn-2">
                        <img src="/newnetwork/images/farming.svg" alt="Фарминг">
                        <h3>Фарминг</h3>
                        <p>Получайте дополнительные ежедневные награды за блокировку своих активов.</p>
                        <a href="https://www.minter.network/ru/earn/farm" target="_blank" class="btn btn-alt">Подробнее</a>
                    </div>
                    <div class="tool earn-3">
                        <img src="/newnetwork/images/trading.svg" alt="Трейдинг">
                        <h3>Трейдинг</h3>
                        <p>Торговля любыми активами с помощью лимитных или маркет-ордеров.</p>
                        <a href="https://www.minter.network/earn/trading" target="_blank" class="btn btn-alt">Подробнее</a>
                    </div>
                    <div class="tool earn-4">
                        <img src="/newnetwork/images/pl.svg" alt="Предоставление ликвидности">
                        <h3>Предоставление ликвидности</h3>
                        <p>Позвольте другим трейдерам использовать ваши средства и получайте комиссию за их торговлю.</p>
                        <a href="https://www.minter.network/ru/earn/earn-liquidity-pools" target="_blank" class="btn btn-alt">Подробнее</a>
                    </div>
                    <div class="tool earn-5">
                        <img src="/newnetwork/images/arbitrage.svg" alt="Arbitrage">
                        <h3>Арбитраж</h3>
                        <p>Покупайте дешевле в одном месте, продавайте дороже в другом. Доступно рутирование, межпульный и межсетевой арбитраж.</p>
                        <a href="https://www.minter.network/ru/earn/arbitrage" target="_blank" class="btn btn-alt">Подробнее</a>
                    </div>
                    <div class="tool earn-6">
                        <img src="/newnetwork/images/hub-staking.svg" alt="Стейкинг HUB">
                        <h3>Стейкинг HUB</h3>
                        <p>Делегируйте HUB оракулам и получайте часть комиссий от кросс-чейн переводов.</p>
                        <a href="https://www.minter.network/ru/earn/hub-staking" target="_blank" class="btn btn-alt">Подробнее</a>
                    </div>
                </div>
            </div>
        </section>
        <section class="features" id="features">
            <div class="container">
                <h2>Особенности и преимущества сети</h2>
                <div class="features-content">
                    <div class="features-item">
                        <img src="/newnetwork/images/f1.svg" alt="Быстрые транзакции">
                        <h3>Быстрые транзакции</h3>
                        <p><b>5 секунд</b> с финальными блоками</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/f2.svg" alt="Низкие комиссии в USD">
                        <h3>Низкие комиссии в USD</h3>
                        <p><b>$0.01</b> за перевод, <b>$0.03</b> + <b>0.2%</b> за обмен. Оплата в любом ликвидном токене с пересчетом в доллары</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/f4.svg" alt="Легкий доступ">
                        <h3>Легкий доступ</h3>
                        <p>Совершайте децентрализованные ввод и вывод активов с легкостью</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/f5.svg" alt="Лимитные ордера">
                        <h3>Лимитные ордера</h3>
                        <p>Размещайте лимитные ордера благодаря уникальной имплементации на уровне ядра блокчейна Minter</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/f6.svg" alt="Кастомные токены и пулы">
                        <h3>Кастомные токены и пулы</h3>
                        <p>Выпускайте собственные токены и пулы ликвидности в пару кликов</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/f3.svg" alt="Кросс-чейн обмены">
                        <h3>Кросс-чейн обмены</h3>
                        <p>Совершайте кросс-чейн переводы с обменами. Например, BUSD из BNB Smart Chain на USDC в Ethereum</p>
                        <p class="coming-soon">Ожидается в 2022-м</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/f7.svg" alt="Смарт-контракты">
                        <h3>Смарт-контракты</h3>
                        <p>Безопасные кросс-чейн смарт-контракты для всех. Расширенный режим для разработчиков и обычный — для простой развертки</p>
                        <p class="coming-soon">Ожидается в 2022-м</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/f8.svg" alt="NFT">
                        <h3>NFT</h3>
                        <p>Легко выпускайте, продавайте, обменивайте и перемещайте NFT между сетями</p>
                        <p class="coming-soon">Ожидается в 2022-м</p>
                    </div>
                    <div class="features-item">
                        <img src="/newnetwork/images/f9.svg" alt="Криптокредиты">
                        <h3>Криптокредиты</h3>
                        <p>Занимать крипту через Minter — просто! Используйте свою криптовалюту как залог, чтобы получить кредит без влияния на вашу кредитную историю</p>
                        <p class="coming-soon">Ожидается в 2022-м</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="compare" id="compare">
            <div class="container">
                <h2>Сравните скорость, комиссии, удобство</h2>
                <div class="table m-b-200">
                    <table>
                        <thead>
                            <tr>
                                <th>DEX</th>
                                <th>Tx скорость</th>
                                <th>Tx комиссии</th>
                                <th>Транзакции</th>
                                <th>Токен комиссии</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="flextd"><a href="https://console.minter.network/" target="_blank"><img src="/img/minter-logo-circle.svg" width="24" height="24" /> Minter</a></td>
                                <td>5 секунд</td>
                                <td>$0.007</td>
                                <td>1 (<a href="https://explorer.minter.network/transactions/Mt2b9425c1cb91640a8e0dd2207fcc8de8480480b692f4c18fd60f344cbe69b117" target="_blank">Tx</a>)</td>
                                <td>Любой</td>
                            </tr>
                            <tr>
                                <td class="flextd"><a href="https://pancakeswap.finance/" target="_blank" rel="nofollow"><img src="/bipx/images/logos/pancakeswap.png" srcset="/bipx/images/logos/pancakeswap@2x.png 2x, /bipx/images/logos/pancakeswap@3x.png 3x" /> PancakeSwap</a></td>
                                <td>6 секунд</td>
                                <td>$0.27</td>
                                <td>2 (<a href="https://bscscan.com/tx/0xc4655f75d9935e65380046f52e02722f9388273330a3d1ce48593cce7de71c08" target="_blank" rel="nofollow">Tx</a>, <a href="https://bscscan.com/tx/0xc063cab353d6ca021afe23ee6860787d6cbd286f94f7a8c50434f96dcf1e3d2f" target="_blank" rel="nofollow">Tx</a>)</td>
                                <td>Только BNB</td>
                            </tr>
                            <tr>
                                <td class="flextd"><a href="https://uniswap.org/" target="_blank" rel="nofollow"><img src="/bipx/images/logos/uniswap.png" srcset="/bipx/images/logos/uniswap@2x.png 2x, /bipx/images/logos/uniswap@3x.png 3x" /> Uniswap</a></td>
                                <td>16 секунд</td>
                                <td>$11.4</td>
                                <td>2 (<a href="https://etherscan.io/tx/0x0dc22e02dabda0b5dda7cbc4a997025c6d41af034b8e5b0ab1c002c8f1254485" target="_blank" rel="nofollow">Tx</a>, <a href="https://etherscan.io/tx/0x191302cbaba0c3ddec945f2a1365f9ca5347790b8f73cf3b69aead37fce77792" target="_blank" rel="nofollow">Tx</a>)</td>
                                <td>Только ETH</td>
                            </tr>
                            <tr>
                                <td class="flextd"><a href="https://1inch.io/" target="_blank" rel="nofollow"><img src="/bipx/images/logos/1inch.png" srcset="/bipx/images/logos/1inch@2x.png 2x, /bipx/images/logos/1inch@3x.png 3x" /> 1INCH</a></td>
                                <td>71 секунда</td>
                                <td>$9.6</td>
                                <td>2 (<a href="https://etherscan.io/tx/0x2918f27fffb09b889a4ca1c34133cb85c21124b8b0feaafc54e6f7ff3abd70bc" target="_blank" rel="nofollow">Tx</a>, <a href="https://etherscan.io/tx/0xbbee60884c8039e8783b3159008787fb99883380ac49b47f4e3015330b8ac2fb" target="_blank" rel="nofollow">Tx</a>)</td>
                                <td>Только ETH</td>
                            </tr>
                            <tr>
                                <td class="flextd"><a href="https://www.sushi.com/" target="_blank" rel="nofollow"><img src="/bipx/images/logos/sushiswap.png" srcset="/bipx/images/logos/sushiswap@2x.png 2x, /bipx/images/logos/sushiswap@3x.png 3x" /> SushiSwap</a></td>
                                <td>62 секунды</td>
                                <td>$9.7</td>
                                <td>2 (<a href="https://etherscan.io/tx/0x54d39d6c7388e1dda1813dc847f0b0067adc815b5ae4859a0bbf0061d678e26b" target="_blank" rel="nofollow">Tx</a>, <a href="https://etherscan.io/tx/0xc596e8b983dcdea03baa1c49965650e1cf1c2927fc786d17917b18c0e52f9ed7" target="_blank" rel="nofollow">Tx</a>)</td>
                                <td>Только ETH</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h2>Сравните лимитные ордера</h2>
                <div class="table">
                    <table>
                        <thead>
                            <tr>
                                <th>DEX</th>
                                <th>Tx скорость</th>
                                <th>Tx комиссия</th>
                                <th>Ончейн</th>
                                <th>Токен комиссии</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="flextd"><a href="https://console.minter.network/" target="_blank"><img src="/img/minter-logo-circle.svg" width="24" height="24" /> Minter</a></td>
                                <td>5 секунд</td>
                                <td><a href="https://explorer.minter.network/transactions/Mteddd4fae853bb7af419d253f1b7227d5d69c9dfd0c669c3bdfcd509d9710d652" target="_blank" rel="nofollow">$0.1</a></td>
                                <td><img src="/newnetwork/images/yes.svg" alt="yes" width="24" height="24" /></td>
                                <td>Любой</td>
                            </tr>
                            <tr>
                                <td class="flextd"><a href="https://1inch.io/" target="_blank" rel="nofollow"><img src="/bipx/images/logos/ethereum.svg" height="24px" /> Ethereum (1INCH)</a></td>
                                <td>30 секунд</td>
                                <td><a href="https://etherscan.io/tx/0xd96a1d5e30ae4bdd79dccc5a7155678fa655f8dceb9a3aa61334f3d1629e42d5" target="_blank" rel="nofollow">$33.3</a></td>
                                <td><img src="/newnetwork/images/no.svg" alt="no" width="24" height="24" /></td>
                                <td>Только ETH</td>
                            </tr>
                            <tr>
                                <td class="flextd"><a href="https://1inch.io/" target="_blank" rel="nofollow"><img src="/bipx/images/logos/bsc.svg" height="24px" /> BSC (1INCH)</a></td>
                                <td>6 секунд</td>
                                <td><a href="https://bscscan.com/tx/0xb1e8099b6cc7d04137f4ad15f3390e0a4e6a7a72f19bd42969ed25e64ca23f58" target="_blank" rel="nofollow">$0.41</a></td>
                                <td><img src="/newnetwork/images/no.svg" alt="no" width="24" height="24" /></td>
                                <td>Только BNB</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section class="wallets" id="wallets">
            <div class="container">
                <h2>Кошельки</h2>
                <div class="wallets-block">
                    <div class="wallet-image">
                        <img src="/newnetwork/images/phone.png" srcset="/newnetwork/images/phone@2x.png 2x" alt="Minter Wallets" />
                    </div>
                    <div class="wallets-content">
                        <div class="wallet-item">
                            <img src="/newnetwork/images/wallet-bip.svg" alt="Bip Wallet">
                            <h4>Bip Wallet</h4>
                            <p>Удобный и многогранный кошелек-приложение для мобильных устройств</p>
                            <div class="wallet-links">
                                <a href="https://minter.link/ios" target="_blank" class="wallet_ios">iOS</a>
                                <a href="https://minter.link/android" target="_blank" class="wallet_android">Android</a>
                            </div>
                        </div>
                        <div class="wallet-item">
                            <img src="/newnetwork/images/wallet-web.svg" alt="Minter Web Wallet">
                            <h4><a href="https://wallet.bip.to/" target="_blank">Web Wallet</a></h4>
                            <p>Базовая веб-версия Bip Wallet. Включает весь ключевой функционал по управлению монетами: получение, отправка, делегирование</p>
                        </div>
                        <div class="wallet-item">
                            <img src="/newnetwork/images/wallet-minter.svg" alt="Minter Wallet">
                            <h4><a href="https://wallet.minter.org/" target="_blank">Minter Wallet</a></h4>
                            <p>Самое простое решение для получения и отправки средств. Чтобы начать, достаточно иметь электронную почту</p>
                        </div>
                        <div class="wallet-item">
                            <img src="/newnetwork/images/wallet-console.svg" alt="Console">
                            <h4><a href="https://console.minter.network/" target="_blank">Console</a></h4>
                            <p>Этот кошелек предлагает наиболее широкий спектр действий: помимо стандартного функционала, вы получаете возможность работать с чеками, выпускать монеты и токены, запускать и настраивать мастерноды, создавать MultiSig-адреса и пулы ликвидности и управлять ими, а также отправлять транзакции, подписанные офлайн</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="roadmap" id="roadmap">
            <div class="container">
                <div class="roadmap-block">
                    <div class="roadmap-content">
                        <h2>Дорожная карта</h2>
                        <p>Учитывая недавние корректировки ведущими блокчейнами собственных токеномик, команда Minter предлагает осуществить крупный апдейт сети, нацеленный на улучшение экономической модели Minter, внедрить дефляционные и противоинфляционные механизмы, которые станут стимулом укрепления BIP.</p>
                        <p>Команда Minter приступила к разработке перечисленных ниже механизмов. Мы планируем поэтапно внедрять эти обновления, с 1-го по 2-й квартал 2022 года.</p>
                        <a href="https://minterteam.medium.com/minter-3-bip-tokenomics-update-c6e81264e33c" target="_blank" rel="nofollow" class="btn btn-alt">Подробнее</a>
                    </div>
                    <div class="roadmap-image">
                        <img src="/newnetwork/images/map.svg" alt="дорожная карта Minter">
                    </div>
                </div>
                <div class="coming" id="coming">
                    <h3>Планы на 2022–2023 г.</h3>
                    <ul>
                        <li>Смарт-контракты</li>
                        <li>NFT</li>
                        <li>Криптокредиты</li>
                        <li>Релиз криптокошелька Honee</li>
                        <li>DApp для межсетевых переводов</li>
                        <li>SDK для Metaverse-предметов и NFT</li>
                        <li>Функционал мульти-обменов / мульти-транзакций</li>
                    </ul>
                </div>
                <div class="completed" id="completed">
                    <h3>Завершено в 2021</h3>
                    <div class="completed_timeline">
                        <div class="completed_outer">
                            <div class="completed_card" id="timeline_1">
                                <div class="completed_info">
                                    <h4>Запуск Minter 2</h4>
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
                                    <h4>Сжигание</h4>
                                    <p>15 мая 2021 года MDF (Minter Development Foundation) сожгла <b>385 000 000 BIP</b>, или 9.3% от текущего предложения (~8 млн долларов США на тот момент).</p>
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
                                    <h4>Выпуск токена BIPX</h4>
                                    <p>BIPx — это обернутая версия BIP в Ethereum и Binance Smart Chain. BIPx открывает лучшие возможности глобальных децентрализованных финансов (DeFi) и помогает пользователям зарабатывать в любом из кошельков Minter.</p>
                                    <p class="timeline_links">
                                        <a href="https://coinmarketcal.com/en/event/token-launch-71586" target="_blank" rel="nofollow">Событие в календаре</a>
                                        <a href="https://minterteam.medium.com/%D0%BA%D0%B0%D0%BA-bipx-%D0%BF%D0%BE%D0%BC%D0%BE%D0%B6%D0%B5%D1%82-%D0%B7%D0%B0%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%82%D1%8C-%D0%B2-defi-9e54b5e625fa" target="_blank" rel="nofollow">Подробнее</a>
                                    </p>
                                </div>
                            </div>
                            <div class="completed_card" id="timeline_4">
                                <div class="completed_info">
                                    <h4>Релиз HONEE Wallet</h4>
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
                                    <h4>Листинг популярных криптовалют в Minter</h4>
                                    <p>Запуск моста Minter Hub позволил перемещать токены между сетями. На конец 2021 года была добавлена поддержка следующих популярных монет:
                                    <br>BTC, ETH, BNB, USDT, USDС, 1INCH, TON COIN, SHIB, METAVERSE INDEX, DAI, PAX, BUSD, BIP, HUB и других.</p>
                                    <p class="timeline_links">
                                        <a href="https://minterteam.medium.com/%D0%BB%D0%B8%D1%81%D1%82%D0%B8%D0%BD%D0%B3-%D1%82%D0%BE%D0%BA%D0%B5%D0%BD%D0%BE%D0%B2-%D0%B2-minter-c7f4bc797e7d" target="_blank" rel="nofollow">Подробнее</a>
                                    </p>
                                </div>
                            </div>
                            <div class="completed_card" id="timeline_6">
                                <div class="completed_info">
                                    <h4>Обновление Minter 2.6</h4>
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
                                    <h4>Запуск Minter Hub 2</h4>
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
                <div class="completed">
                    <h3>Завершено в 2019–2020</h3>
                    <div class="completed-block">
                        <div class="completed-item" id="completed-item-1">
                            <small>15 мая 2019</small>
                            <h4>Запуск Minter Mainnet</h4>
                        </div>
                        <div class="completed-item" id="completed-item-2">
                            <small>6 марта 2020</small>
                            <h4>Minter v1.1.0</h4>
                            <p>Первое крупное обновление сети после ее запуска, которое включало: ограниченное предложение монет, мультисиг-кошельки, инструмент управления нодой в Консоли, переработанную базу данных, рефакторинг и оптимизацию кода.</p>
                            <p class="timeline_links">
                                <a href="https://minterteam.medium.com/minter-v1-1-0-68d50493f1c4" target="_blank" rel="nofollow">Подробнее</a>
                            </p>
                        </div>
                        <div class="completed-item" id="completed-item-3">
                            <small>23 марта 2020</small>
                            <h4>Minter Link Protocol</h4>
                            <p>Minter Link — это протокол, который позволяет пользователю перейти в приложение мобильного кошелька или его веб-версию с заранее сформированной транзакцией, которую нужно только подписать.</p>
                            <p class="timeline_links">
                                <a href="https://github.com/MinterTeam/minter-link-protocol" target="_blank" rel="nofollow">Подробнее</a>
                            </p>
                        </div>
                        <div class="completed-item" id="completed-item-4">
                            <small>1 июля 2020</small>
                            <h4>BIP Wallet 2.0</h4>
                            <p>После двухнедельного открытого бета-тестирования обновленный BIP Wallet 2.0 был выпущен 1 июля. Полностью переработанный интерфейс с мультиадресами позволяет вам быстрее и удобнее управлять своими средствами.</p>
                            <p class="timeline_links">
                                <a href="https://minterteam.medium.com/%D0%BE%D0%B1%D0%B7%D0%BE%D1%80-bip-wallet-2-0-ba1c90be3b73" target="_blank" rel="nofollow">Подробнее</a>
                            </p>
                        </div>
                        <div class="completed-item" id="completed-item-5">
                            <small>10 июля 2020</small>
                            <h4>Более 32 проектов на блокчейне Minter</h4>
                            <p>Чуть более чем за год с момента запуска основной сети Minter появилось множество проектов, работающих на основе или с использованием блокчейна Minter.</p>
                            <p class="timeline_links">
                                <a href="https://vc.ru/crypto/140966-top-32-russkih-proekta-blokcheyna-minter-v-pervyy-god" target="_blank" rel="nofollow">Подробнее</a>
                            </p>
                        </div>
                        <div class="completed-item" id="completed-item-6">
                            <small>19 октября 2020</small>
                            <h4>Minter 1.2</h4>
                            <p>Второе важное обновление сети Minter включало в себя: архивацию монет, изменение формулы расчета стэйка, ограничение количества валидаторов, ончейн-цену BIP, новые транзакции голосования.</p>
                            <p class="timeline_links">
                                <a href="https://medium.com/@danillashin/minter-1-2-2928b3f94625" target="_blank" rel="nofollow">Подробнее</a>
                            </p>
                        </div>
                        <div class="completed-item" id="completed-item-7">
                            <small>2 ноября 2020</small>
                            <h4>Minter Wallet</h4>
                            <p>Minter Wallet — это кошелек, в котором бизнесы могут начислять баллы лояльности и награды, а клиенты — использовать их.</p>
                            <p class="timeline_links">
                                <a href="https://minterteam.medium.com/minter-wallet-%CE%B2-%D0%BA%D0%BE%D1%88%D0%B5%D0%BB%D0%B5%D0%BA-%D0%B4%D0%BB%D1%8F-%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC-%D0%BB%D0%BE%D1%8F%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8-%D0%B8-%D0%BD%D0%B0%D0%B3%D1%80%D0%B0%D0%B4-862b35a626d0" target="_blank" rel="nofollow">Подробнее</a>
                            </p>
                        </div>
                        <div class="completed-item" id="completed-item-8">
                            <small>Конец 2020</small>
                            <h4>Выпуск токена HUB</h4>
                            <p>Minter Hub — это блокчейн, соединяющий Minter, Ethereum и Binance Smart Chain (BSC). Solana, Cardano, Polygon, Terra, Tron и остальные популярные сети будут подключены в обозримом будущем.</p>
                            <p class="timeline_links">
                                <a href="https://minterteam.medium.com/hub-%D1%82%D0%BE%D0%BA%D0%B5%D0%BD-%D0%B1%D0%BB%D0%BE%D0%BA%D1%87%D0%B5%D0%B9%D0%BD%D0%B0-minter-hub-c0a86610f08f" target="_blank" rel="nofollow">Подробнее</a>
                            </p>
                        </div>
                        <div class="completed-item" id="completed-item-9">
                            <small>Декабрь 2020</small>
                            <h4>Релиз Pinpon</h4>
                            <p>Pinpon — это платформа для привлечения клиентов в социальных сетях с помощью инновационных розыгрышей. Pinpon использует технологию блокчейн в качестве нового стандарта для хранения данных.</p>
                            <p class="timeline_links">
                                <a href="https://pinponteam.medium.com/pinpon-%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%BE%D0%B7%D0%BC%D0%BE%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D0%B8-%D0%BF%D1%80%D0%B5%D0%B8%D0%BC%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B0-2279c3aa601b" target="_blank" rel="nofollow">Подробнее</a>
                            </p>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </section>
        <section class="tech" id="tech">
            <div class="container">
                <h2>Техническая сторона</h2>
                <p>В документации вы найдете все, чтобы начать работу с блокчейном Minter, разрабатывать на нем сервисы и приложения или интегрировать его во внутренние процессы вашей организации.</p>
                <div class="tech_a">
                    <a class="tech_git" href="https://github.com/MinterTeam" target="_blank" rel="nofollow">GitHub</a>
                    <a class="tech_api" href="https://www.minter.network/docs#node-api" target="_blank">API</a>
                    <a class="tech_sdk" href="https://www.minter.network/docs#minter-sdks" target="_blank">SDK</a>
                    <a class="tech_doc" href="https://www.minter.network/docs" target="_blank">Документация</a>
                    <a class="tech_wp" href="https://www.minter.network/files/Minter_White_Paper.pdf" target="_blank">Whitepaper</a>
                    <a class="tech_cons" href="https://console.minter.network/" target="_blank">Консоль</a>
                </div>
            </div>
        </section>
        <section class="social" id="social">
            <div class="container">
                <h2>Соцмедиа</h2>
                <p>Следите за всеми нашими новостями, объявлениями и новым контентом в социальных сетях и мессенджерах.</p>
                <div class="social-links">
                    <div class="social-link"><img src="/newnetwork/images/social_md.svg" alt="Minter Medium"><a href="https://medium.com/@MinterTeam" target="_blank" rel="nofollow">Medium</a></div>
                    <div class="social-link"><img src="/newnetwork/images/social_rd.svg" alt="Minter Reddit"><a href="https://www.reddit.com/r/Minter/" target="_blank" rel="nofollow">Reddit</a></div>
                    <div class="social-link"><img src="/newnetwork/images/social_tw.svg" alt="Minter Twitter"><a href="https://twitter.com/MinterTeam" target="_blank" rel="nofollow">Twitter</a></div>
                    <div class="social-link"><img src="/newnetwork/images/social_fb.svg" alt="Minter Facebook"><a href="https://www.facebook.com/MinterNetwork" target="_blank" rel="nofollow">Facebook</a></div>
                    <div class="social-link"><img src="/newnetwork/images/social_tc.svg" alt="Telegram-канал"><a href="tg://resolve?domain=MinterNetwork" target="_blank" rel="nofollow">Telegram-канал</a></div>
                    <div class="social-link"><img src="/newnetwork/images/social_tc.svg" alt="Telegram-группа"><a href="tg://join?invite=EafyEVD-HEOxDcv8YyaqNg" target="_blank" rel="nofollow">Telegram-группа</a></div>
                </div>
            </div>
        </section>
        <section class="hub" id="hub">
            <div class="container">
                <h2>Откройте для себя токен HUB</h2>
                <div class="discover-hub">
                    <div class="discover-img"><img src="/newnetwork/images/hub.svg" alt="Minter Hub токен" /></div>
                    <div class="discover-th">Текущая цена <span>${{ pretty(hubPrice) }}</span></div>
                    <div class="discover-th">Начальная цена <span>$0.11</span></div>
                    <div class="discover-th">Макс. эмиссия <span>1 000 000</span></div>
                    <div class="discover-th">Пулы <span><a href="https://explorer.minter.network/pools/HUB/USDTE" target="_blank">Minter</a> <a href="https://v2.info.uniswap.org/pair/0x3796fee2b555da1356cdcd3e1861263b351a58a0" target="_blank" rel="nofollow">Ethereum</a></span></div>
                    <a class="btn" href="https://minter.network/hub" target="_blank" v-track-click="'hub'">Подробнее</a>
                </div>
                <p><a href="https://etherscan.io/token/0x8e9A29e7Ed21DB7c5B2E1cd75e676dA0236dfB45" target="_blank" rel="nofollow">HUB</a> — это нативный токен в блокчейне Minter Hub, который, в свою очередь, является мостом, соединяющим Minter с Ethereum и Binance Smart Chain. HUB — это PoS-токен, и все оракулы получают 1% комиссии от переводов между сетями. HUB также служит резервом для пулов в Minter, Ethereum и Binance Smart Chain.</p>
                <p>Например, Uniswap v3 <a href="https://info.uniswap.org/#/pools/0x27878ae7f961a126755042ee8e5c074ea971511f" target="_blank" rel="nofollow">HUB-USDT</a>, Uniswap v2 <a href="https://v2.info.uniswap.org/pair/0x3796fee2b555da1356cdcd3e1861263b351a58a0" target="_blank" rel="nofollow">HUB-USDT</a>, Minter <a href="https://explorer.minter.network/pools/HUB/BIP" target="_blank">HUB-BIP</a>.</p>
            </div>
            <Footer class="footer--transparent"/>
        </section>
    </div>
</template>
