const search = window.location.search;
if (search) {
    const frame = document.createElement('iframe');
    const referrer = document.referrer;
    const query = referrer ? search + '&referrer=' + referrer : search;
    frame.src = 'https://minternetwork.com/api/v1/statistic/track' + query;
    frame.style.position = 'absolute';
    frame.style.left = '-9999px';
    frame.style.width = '1px';
    frame.style.height = '1px';
    document.body.appendChild(frame);
}
