

export function gaSend(category, action, label, value) {
    // console.log({category, action, label, pageLabel: getPageLabel()})
    // gtag style
    if (typeof window.ga === 'function') {
        window.ga(function() {
            const tracker = window.ga.getAll()[0];
            if (tracker) {
                tracker.send({
                    hitType: 'event',
                    eventCategory: category,
                    eventAction: action,
                    eventLabel: label || getPageLabel(),
                    eventValue: value,
                });
            }
        });
    }
    // ga style
    // if (typeof window.ga === 'function') {
    //     window.ga('send', {
    //         hitType: 'event',
    //         eventCategory: category,
    //         eventAction: action,
    //         eventLabel: label,
    //         eventValue: value,
    //     })
    // }
}

export function getPageLabel() {
    const hostParts = window.location.hostname.split('.');
    let subParts;
    if (hostParts.length > 2) {
        subParts = hostParts.slice(0, hostParts.length - 2);
    } else {
        subParts = [];
    }
    if (subParts.length === 1 && subParts[0] === 'www') {
        subParts = [];
    }
    const subDomain = subParts.join('.');
    return (subDomain ? (subDomain + '-') : '') + window.$nuxt.$route.name;
}

export function ymGoal(category, action, label) {
    if (typeof window.ym === 'function') {
        const labelSuffix = label ? '-' + label : '';
        window.ym(49878307, 'reachGoal', `${category}-${action}${labelSuffix}`);
    }
}
