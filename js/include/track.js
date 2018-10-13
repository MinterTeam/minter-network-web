let search = window.location.search;
if (search) {
    // if no query referrer
    if (search.indexOf('&referrer=') === -1 && search.indexOf('?referrer=') === -1) {
        const referrer = document.referrer;
        search += referrer ? '&referrer=' + referrer : '';
    }

    const frame = document.createElement('iframe');
    frame.src = 'https://minternetwork.com/api/v1/statistic/track' + search;
    frame.style.position = 'absolute';
    frame.style.left = '-9999px';
    frame.style.width = '1px';
    frame.style.height = '1px';
    document.body.appendChild(frame);
}
