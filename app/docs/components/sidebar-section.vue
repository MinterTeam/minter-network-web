<template>
  <li class="sidebar-item" :class="{ 'is-active': isActive }">
    <nuxt-link
      class="sidebar-link"
      :to="fullUrl">
      {{ name }}
    </nuxt-link>
  </li>
</template>

<script>
  export default {
  props: {
    activePath: {
      type: String
    },
    activePage: {
      type: String
    },
    data: {
      type: Array,
      required: true
    },
    depth: {
      type: Number,
      default: 0
    },
    docsPrefix: {
      type: String,
      default: '',
    },
  },
  created() {
    if (this.isActive) {
      this.$emit('active', this.isActive, this.name)
    }
  },
  computed: {
    name() {
      return this.data[1]
    },
    url() {
      return this.data[2]
    },
    fullUrl() {
      // remove last slash
      return `${this.docsPrefix}${this.url}`.replace(/(.+)\/#(.+)$/, '$1#$2');
    },
    isActive() {
      let isActive = this.url === this.activePath

      if (!isActive) {
        isActive = this.url === this.activePage
      }

      return isActive
    },
  },
  watch: {
    isActive(value) {
      this.$emit('active', value, this.name)
    }
  },
}
</script>
