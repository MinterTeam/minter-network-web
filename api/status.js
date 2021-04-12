import axios from 'axios';
import {cacheAdapterEnhancer, Cache} from 'axios-extensions';
import {STATUS_API_URL} from "~/assets/variables";

export const status = axios.create({
    baseURL: STATUS_API_URL,
    adapter: cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false}),
});


// 1 min cache
const statusCache = new Cache({maxAge: 1 * 60 * 1000});

export function getStatus(type) {
    return status.get('status', {
            cache: statusCache,
        })
        .then((response) => response.data.data);
}
