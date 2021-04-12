import axios from 'axios';
import {BIPCHANGE_API_URL, BITHUMB_API_URL, HOTBIT_API_URL, COINSBLACK_API_URL} from "~/assets/variables";

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
 * @return {Promise<{price: string, time: string, history: ?Array}>}
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
/*
    if (exchangeName === 'coinsblack') {
        return axios.get('rates/request-exportxml.xml', {
            baseURL: COINSBLACK_API_URL,
        }).then((response) => {
            let priceItem;
            try {
                const parser = new DOMParser();
                const data = parser.parseFromString(response.data, "text/xml");
                const rates = data.children[0];
                priceItem = Array.from(rates.children).find((item) => {
                    const from = item.getElementsByTagName('from')[0];
                    const to = item.getElementsByTagName('to')[0];
                    if (from.textContent === 'USDTERC' && to.textContent === 'BIP') {
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
*/

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
