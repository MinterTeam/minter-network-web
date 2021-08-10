import {gaSend, ymGoal} from '~/assets/analytics-track.js';

export default {
    bind(el, binding, vnode) {
        el.addEventListener('click', () => {
            gaSend('click', binding.value);
            ymGoal('click', binding.value);
        });
    },
    // componentUpdated(el, binding) {
    // },
    // unbind(el, binding) {
    // },
};

