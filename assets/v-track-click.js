import {gaSend, ymGoal} from '~/assets/analytics-track.js';

export default {
    bind(el, binding, vnode) {
        el.addEventListener('click', () => {
            gaSend('bipx', 'click', binding.value);
            ymGoal('bipx', 'click', binding.value);
        });
    },
    // componentUpdated(el, binding) {
    // },
    // unbind(el, binding) {
    // },
};

