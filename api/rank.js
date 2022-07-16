import axios from 'axios';
import {cacheAdapterEnhancer, Cache} from 'axios-extensions';
import {CMC_API_URL, CMC_API_KEY, COINGECKO_API_URL} from "~/assets/variables.js";

const instance = axios.create({
    // headers: {'X-CMC_PRO_API_KEY': CMC_API_KEY},
    adapter: cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false}),
});


// 30 min cache
const responseCache = new Cache({maxAge: 30 * 60 * 1000});

export function getRankCmc() {
    return instance.get('cryptocurrency/quotes/latest', {
            baseURL: CMC_API_URL,
            params: {
                id: 4957,
            },
            cache: responseCache,
        })
        .then((response) => response.data.data['4957'].cmc_rank);
}

export function getRankCoingecko() {
    return instance.get('coins/minter-network?localization=false&tickers=false&community_data=false&developer_data=false', {
            baseURL: COINGECKO_API_URL,
            cache: responseCache,
        })
        .then((response) => response.data.market_cap_rank);
}


