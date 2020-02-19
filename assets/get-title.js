import {BASE_TITLE, BASE_TITLE_END} from '~/assets/variables';

export default function getTitle(text, locale) {
    if (text) {
        return text + BASE_TITLE_END;
    } else {
        return BASE_TITLE;
    }
}
