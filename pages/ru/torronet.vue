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
        const description = 'Большое обновление Токеномики. Внедрение лучших практик блокчейн-индустрии.';
        // const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

        return {
            title: title + ' | Minter Network',
            meta: [
                { hid: 'og-title', name: 'og:title', content: title },
                { hid: 'description', name: 'description', content: description },
                { hid: 'og-description', name: 'og:description', content: description },
                { hid: 'og-image', name: 'og:image', content: `/torronet/images/meta-ru.png` },
            ],
            link: [
                { rel: 'canonical', href: `${HOST}/torronet`},
                { rel: 'stylesheet', href: '/torronet/style.css?2', hid: 'torronet-style'},
                { rel: 'stylesheet', href: '/torronet/style320.css?2', media: '(max-width: 1020px)', hid: 'torronet-style320'},
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
            <language class="" :locales='[{"code":"","name":"English"},{"code":"ru","name":"Russian"}]' lang="ru" :push="true"/>
        </div>
        <header>
            <div class="container">
                <div class="hello">
                    <div class="hello-content">
                        <div class="logo"><a href="#"><img src="/img/minter-logo-circle.svg" width="60" height="60" alt="Minter 3"/></a></div>
                        <div class="torronet">Minter 3</div>
                        <h1>Большое <br />Обновление Токеномики</h1>
                        <p>Внедрение лучших практик блокчейн-индустрии. Обновление токеномики Minter 3 уже <b>весной 2022 г.</b></p>
                        <a class="btn" href="https://www.minter.network/how-to-buy-and-sell-bip" target="_blank" v-track-click="'buy-bipx'">Купить и застейкать BIP</a>
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
                        <h4>Рыночная капитализация</h4>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">$27,485,793</div>
                        <h4>Капитализация при полной эмиссии</h4>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">15 мая 2019 г.</div>
                        <h4>Запуск основной сети</h4>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">10,000,000,000</div>
                        <h4>Максимальное предложение</h4>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">5,427,996,860 (54%)</div>
                        <h4>Циркулирующее предложение</h4>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">1,125,772,062 (21%)</div>
                        <h4>В свободном обращении</h4>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">47</div>
                        <h4>Активных валидаторов</h4>
                    </div>
                    <div class="stats-item">
                        <div class="stats-value">12,747</div>
                        <h4>Активных стейкеров</h4>
                    </div>
                </div>
            </div>
        </section>

        <section class="drivers">
            <div class="container">
                <h2>Драйверы роста BIP</h2>
                <div class="drivers-content">
                    <div class="drivers-item">
                        <img src="/torronet/images/d1.svg" alt="Динамический майнинг">
                        <h3>Динамический майнинг</h3>
                        <p>Цена BIP падает, когда предложение монет на рынке превышает спрос. Чтобы снизить влияние этого фактора, мы вводим балансировщик вознаграждений за блок, который уменьшает блок-реварды при падении цены BIP, помогая избежать дальнейшего избытка BIP. В то же время когда цена BIP растет, балансировщик увеличивает награды, чтобы максимизировать результат стейкинга.</p>
                    </div>
                    <div class="drivers-item">
                        <img src="/torronet/images/d2.svg" alt="Автоределегирование">
                        <h3>Автоределегирование</h3>
                        <p>В данный момент все награды за делегирование начисляются на адреса делегаторов примерно каждый час. Автоределегирование изменит эту механику таким образом, что награды будут автоматически делегироваться, что приведет к увеличению как стейка, так и самих наград. Для получения ревардов пользователю будет необходимо сделать стандартную транзакцию анбонда в нужном количестве монет.</p>
                    </div>
                    <div class="drivers-item">
                        <img src="/torronet/images/d3.svg" alt="Сжигание балансировщиком">
                        <h3>Сжигание балансировщиком</h3>
                        <p>Если цена BIP падает, это не замедляет выпуск новых монет, то есть не растягивает срок конечной эмиссии. В этом случае нераспределенные награды (до базового значения) будут сжигаться через отправку на нулевой адрес.</p>
                    </div>
                    <div class="drivers-item">
                        <img src="/torronet/images/d4.svg" alt="Сжигание комиссий за тикеры">
                        <h3>Сжигание комиссий за тикеры</h3>
                        <p>Создавая новый токен, пользователь оплачивает комиссию за тикер, которая зависит от его длины — чем короче тикер, тем больше комиссия. Вместо того, чтобы распределяться валидаторам и их делегаторам, эта комиссия будет сжигаться через отправку на нулевой адрес, уменьшая количество BIP в свободном обращении.</p>
                    </div>
                    <div class="drivers-item">
                        <img src="/torronet/images/d5.svg" alt="Выкуп BIP">
                        <h3>Выкуп BIP</h3>
                        <p>При обмене внутри пула ликвидности BIP выкупается и сжигается. Мы повысим комиссию пула с текущих 0.2% до среднерыночных 0.3%. Провайдеры ликвидности будут по-прежнему зарабатывать 0.2% от обменов в пуле, а остальные 0.1% будут использоваться для откупа BIP и его дальнейшего сжигания.</p>
                    </div>
                    <div class="drivers-item">
                        <img src="/torronet/images/d6.svg" alt="Трехлетняя блокировка">
                        <h3>Трехлетняя блокировка</h3>
                        <p>С выходом апгрейда Minter 3 пользователям будет предложен новый вариант стейкинга. Они смогут отправить свои BIP в делегирование с периодом заморозки в 3 года и получать в 3 раза больше вознаграждений. В то же время комиссии, собираемые валидаторами, не увеличатся. Пользователям не нужно будет делать анбонд, чтобы применить эту функцию.</p>
                    </div>
                    <div class="drivers-item">
                        <img src="/torronet/images/d7.svg" alt="Перенос стейка">
                        <h3>Перенос стейка</h3>
                        <p>Мы представим транзакцию MoveStake, которая переносит стейк новому валидатору. Процесс переноса займет 7 дней.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="text">
            <div class="container">
                <p><b>Все вышеперечисленные меры преследуют одну цель — стимулировать дефицит BIP.</b><br />
                Даже если спрос <i>остается прежним</i>, а предложение <i>сокращается</i>, цены, как правило, <i>растут</i>.</p>
                <a class="btn" href="https://www.minter.network/how-to-buy-and-sell-bip" target="_blank" v-track-click="'buy-bipx'">Купить и застейкать BIP</a>
            </div>
        </section>

        <Footer class="footer--transparent"/>
    </div>
</template>
