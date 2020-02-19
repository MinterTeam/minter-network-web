import axios from 'axios';
import {STATUS_API_URL} from "~/assets/variables";

export const status = axios.create({
    baseURL: STATUS_API_URL,
});


export function getStatus(type) {
    return status.get('status')
        .then((response) => response.data.data);
}
