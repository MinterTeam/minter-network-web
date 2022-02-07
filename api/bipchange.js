import axios from 'axios';
import {BIPCHANGE_API_URL, BITHUMB_API_URL, HOTBIT_API_URL, COINSBLACK_API_URL, DAILYEXCHANGE_API_URL, BIPBANKER_API_URL, MINTER_GARANT_API_URL} from "~/assets/variables.js";

const instance =  axios.create({
    baseURL: BIPCHANGE_API_URL,
});

/**
 * @return {Promise<string>} - USD
 */
export function getAveragePrice() {
    return instance.get('')
        .then((response) => response.data.avrsell);
}

/**
 * Get last price item
 * @param {string} exchangeName
 * @return {Promise<{price: string, timestamp: string, history: ?Array}>}
 */
export function getExchangePrice(exchangeName) {
    /* BITHUMB */
    if (exchangeName === 'bithumb') {
        return axios.get('spot/ticker?symbol=BIP-USDT', {
            baseURL: BITHUMB_API_URL,
        }).then((response) => {
            return {
                price: response.data.data[0].c,
                timestamp: response.data.timestamp,
            };
        });
    }
    /* HOTBIT */
    if (exchangeName === 'hotbit') {
        return axios.get('market.status_today?market=BIP/USDT', {
            baseURL: HOTBIT_API_URL,
        }).then((response) => {
            return {
                price: response.data.result.last,
                timestamp: Date.now(),
            };
        });
    }
    /* COINSBLACK */
    if (exchangeName === 'coinsblack') {
        return axios.get('exportxml.xml', {
            baseURL: COINSBLACK_API_URL,
        }).then((response) => {
            let priceItem;
            const dataFixed = response.data.replace(/-->>$/, '-->');
            try {
                const parser = new DOMParser();
                const data = parser.parseFromString(dataFixed, "text/xml");
                const rates = data.children[0];
                priceItem = Array.from(rates.children).find((item) => {
                    const from = item.getElementsByTagName('from')[0];
                    const to = item.getElementsByTagName('to')[0];
                    if (from.textContent === 'USDTERC20' && to.textContent === 'BIP') {
                        return true;
                    }
                });
            } catch (e) {
                console.log('error fetching coinsblack');
                console.log(e);
            }
            const matches = /\d\d-\d\d-\d\d \d\d:\d\d:\d\d/.exec(response.data.substr(-200));
            const time = matches?.[0];

            return {
                price: priceItem ? priceItem.getElementsByTagName('in')[0].textContent : 0,
                timestamp: time ? '20' + time.replace(' ', 'T') + '+03:00' : new Date(0).toISOString(),
            };
        });
    }
    /* DAILY EXCHANGE */
    if (exchangeName === 'dailyexchange') {
        return axios.get('rates/daily/', {
            baseURL: DAILYEXCHANGE_API_URL,
        }).then((response) => {
            return {
                price: (Number(response.data.usdt2bip.rate) + Number(response.data.bip2usdt.rate)) / 2,
                timestamp: Date.now(),
            };
        });
    }

    /* BIP BANKER BOT */
    if (exchangeName === 'bipbanker') {
        return axios.get('stats/rates/BIP?currency=RUB&days=1&type=buy', {
            baseURL: BIPBANKER_API_URL,
        }).then((response) => {
            return {
                price: response.data.usdRate,
                timestamp: Date.now(),
            };
        });
    }

    /* MINTER GARANT BOT */
    if (exchangeName === 'mintergarant') {
        return axios.get('rate', {
            baseURL: MINTER_GARANT_API_URL,
        }).then((response) => {
            return {
                price: response.data.rate,
                timestamp: Date.now(),
            };
        });
    }

    /* BIPCHANGE */
    return instance.get(`ex/${exchangeName}/`)
        .then((response) => {
            const lastPriceItem = response.data;
            /*
            const lastPriceItem = response.data[response.data.length - 1];

            // history
            let history = {};
            const today = new Date(new Date().toISOString().substr(0, 10));
            const VALID_PERIOD = 14 * 24 * 60 * 60 * 1000;
            // collect all prices for a day
            response.data.forEach((item) => {
                const date = item.time.substr(0, 10);
                const period = today - new Date(date);
                if (period > VALID_PERIOD || period === 0) {
                    return;
                }
                if (!history[date]) {
                    history[date] = [];
                }
                if (!isNaN(Number(item.usdtobip))) {
                    history[date].push(Number(item.usdtobip));
                }
            });
            // get average price for a day
            history = Object.keys(history)
                .map((date) => {
                    return {
                        date,
                        price: history[date].reduce((a, b) => a + b) / history[date].length,
                    }
                })
                .sort((a, b) => new Date(a.date) - new Date(b.date));
            // set today price as last, not average (so chart value will be same as displayed value)
            if (!isNaN(Number(lastPriceItem.usdtobip))) {
                history.push({
                    price: Number(lastPriceItem.usdtobip),
                    date: lastPriceItem.time.substr(0, 10),
                });
            }
            */

            // price

            return {
                price: lastPriceItem.usdtobip,
                timestamp: lastPriceItem.time.replace(' ', 'T') + '+03:00',
                // history,
            };
        });
}
