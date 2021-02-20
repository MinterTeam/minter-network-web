import decode from 'entity-decode';
import prettyNum, {PRECISION_SETTING} from 'pretty-num';


/**
 * @param {string|number} value
 * @param {ROUNDING_MODE} [roundingMode]
 * @return {string}
 */
export function pretty(value, roundingMode) {
    const PRECISION = 2;
    if (value >= 1 || value <= -1 || Number(value) === 0) {
        return decode(prettyNum(value, {precision: PRECISION, precisionSetting: PRECISION_SETTING.FIXED, roundingMode, thousandsSeparator: '&nbsp;'}));
    } else {
        value = decode(prettyNum(value, {precision: PRECISION, precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT, roundingMode, thousandsSeparator: '&nbsp;'}));
        value = value.substr(0, 10);
        if (value === '0.00000000') {
            return '0.00';
        }
        return value;
    }
}

export function prettyRound(value) {
    return decode(prettyNum(value, {precision: 0, thousandsSeparator: '&nbsp;'}));
}
