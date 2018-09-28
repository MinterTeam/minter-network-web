// support
let support = {};
support.passiveListener = (function () {
    let supportsPassive = false;
    try {
        let opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
            }
        });
        window.addEventListener('testPassiveListener', null, opts);
    } catch (e) {}
    return supportsPassive;
})();

export default support;