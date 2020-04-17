<script>
    export default {
        props: {
            nav: {
                type: Array,
                required: true,
            },
        },
        computed: {
            localePrefix() {
                return this.$press.locale ? '/' + this.$press.locale : '';
            },
        },
        methods: {
            activeClass(link) {
                return this.$route.path.startsWith(this.localePrefix + link) ? 'is-active' : ''
            },
        },
    };
</script>

<template>
    <nav class="header__menu">
        <nuxt-link
                v-for="(item, idx) in nav"
                :key="`topmenu-${idx}`"
                class="nav__link"
                :class="activeClass(item.link)"
                :no-prefix="true"
                :to="localePrefix + item.link"
        >
            {{ item.text }}
        </nuxt-link>
    </nav>
</template>
