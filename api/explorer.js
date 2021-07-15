import axios from 'axios';
import stripZeros from 'pretty-num/src/strip-zeros';
import {EXPLORER_API_URL, COIN_NAME} from "~/assets/variables.js";
import addToCamelInterceptor from '~/assets/to-camel.js';

const instance = axios.create({
    baseURL: EXPLORER_API_URL,
});
addToCamelInterceptor(instance);


export function getStatus() {
    return instance.get('status')
        .then((response) => response.data.data);
}

/**
 *
 * @param {string} address
 * @return {Promise<BalanceData>}
 */
export function getBalance(address) {
    return instance.get(`addresses/${address}?withSum=true`)
        .then((response) => {
            const data = response.data.data;
            data.balances = prepareBalance(data.balances);
            return data;
        });
}

export function prepareBalance(balanceList) {
    return balanceList.sort((a, b) => {
            // set base coin first
            if (a.coin.symbol === COIN_NAME) {
                return -1;
            } else if (b.coin.symbol === COIN_NAME) {
                return 1;
            } else {
                return 0;
                // sort by name, instead of reserve
                // return a.coin.localeCompare(b.coin);
            }
        })
        .map((coinItem) => {
            return {
                ...coinItem,
                amount: stripZeros(coinItem.amount),
            };
        });
}

/**
 * @typedef {Object} BalanceData
 * @property {string} totalBalanceSum
 * @property {string} totalBalanceSumUsd
 * @property {Array<BalanceItem>} balances
 */

/**
 * @typedef {Object} BalanceItem
 * @property {string|number} amount
 * @property {Coin} coin
 */

/**
 * @typedef {Object} Coin
 * @property {number} id
 * @property {string} symbol
 */

/**
 * @param {string} address
 * @return {Promise<{data: Array<StakeItem>, meta: PaginationInfo}>}
 */
export function getAddressStakeList(address) {
    return instance.get(`addresses/${address}/delegations`)
        .then((response) => response.data);
}


/**
 * @typedef {Object} Pool
 * @property {Coin} coin0
 * @property {Coin} coin1
 * @property {number|string} amount0
 * @property {number|string} amount1
 * @property {number|string} liquidity
 * @property {number|string} liquidityBip
 * @property {string} token
 * @property {number|string} tradeVolumeBip1D
 */

/**
 * @param {string} coin0
 * @param {string} coin1
 * @return {Promise<Pool>}
 */
export function getPool(coin0, coin1) {
    return instance.get(`pools/coins/${coin0}/${coin1}`)
        .then((response) => response.data.data);
}



/**
 * @typedef {Object} StakeItem
 * @property {string} [pubKey]
 * @property {ValidatorMeta} [validatorMeta]
 * @property {string} [address]
 * @property {string|number} value
 * @property {string|number} bipValue
 * @property {Coin} coin
 */

/**
 * @typedef {Object} ValidatorMeta
 * @property {string} name
 * @property {string} description
 * @property {string} iconUrl
 * @property {string} siteUrl
 */
