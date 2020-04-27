<template>
  <nuxt-template
          v-else
          tag="article"
          :value="data.body"
  />
</template>

<script>
import { startObserver } from 'press/core/components/observer'
import Home from 'press/docs/components/home'
import docsMixin from 'press/docs/mixins/docs'
import eventBus from '~/assets/event-bus';
import {BASE_TITLE_END} from '~/assets/variables.js';

export default {
  components: { Home },
  props: ['data', 'path'],
  mixins: [docsMixin],
  head() {
    const meta = [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og-title', name: 'og:title', content: this.meta.title },
    ]

    if (this.$docs.image) {
      meta.push({ property: 'og:image', content: this.$docs.image })
    }

    if (this.meta.description) {
      meta.push({ hid: 'description', name: "description", content: this.meta.description })
      meta.push({ hid: 'og-description', name: "og:description", content: this.meta.description })
    }

    return {
      meta,
      title: this.meta.title,
    }
  },
  computed: {
    meta() {
      return {
        title: `${this.$page.title}${BASE_TITLE_END}`,
        description: this.$page.description,
      }
    }
  },
  created() {
    // make isHome non-reactive
    // otherwise on route change (triggered by the header observer)
    // $isHome triggers a re-render of nuxt-template
    // although visibly nothing happens it just shouldnt happen
    // and it alos breaks the observer
    this.isHome = this.$isHome
  },
  updated() {
    // no need to add observer for Home component
    if (this.isHome) {
      return
    }

    this.restartObserver()
  },
  mounted() {
    // no need to add observer for Home component
    if (this.isHome) {
      return
    }

    this.startObserver()
    eventBus.$on('pause-observer', this.stopObserver);
    eventBus.$on('continue-observer', this.startObserver);
  },
  destroyed() {
    eventBus.$off('pause-observer');
    eventBus.$off('continue-observer');
  },
  methods: {
    restartObserver() {
      this.stopObserver()
      this.startObserver()
    },
    stopObserver() {
      if (this._observer) {
        this._observer.disconnect()
        this._observer = undefined
      }
    },
    startObserver() {
      if (this._observer) {
        return;
      }

      const elements = `
        article h1,
        article h2
      `

      const initialId = this.$route.hash.substr(1)

      const observedCallback = (target) => {
        const cleanPath = this.$route.path.replace(/(.+)\/$/, '$1');
        const pathList = [cleanPath, cleanPath + '/'];
        const targetId = target.id ? `#${target.id}` : ``
        let targetHeading = `${this.$route.path}${targetId}`
        let headingSelector = pathList.map((path) => `.sidebar a[href="${path}${targetId}"]`).join(', ')
        let heading = document.querySelector(headingSelector)

        if (!heading && target.tagName === 'H1') {
          targetHeading = this.$route.path
          headingSelector = pathList.map((path) => `.sidebar a[href="${path}"]`).join(', ')
          heading = document.querySelector(headingSelector)
        }

        if (heading) {
          const tocLinks = [...document.querySelectorAll('.sidebar-item.is-active')]
          for (const tocLink of tocLinks) {
            tocLink.classList.remove('is-active')
          }
          heading.parentElement.classList.add('is-active')

          window.history.replaceState(window.history.state, null, targetHeading);
          // this.$press.disableScrollBehavior = true
          // this.$router.replace(targetHeading, () => {
          //   this.$nextTick(() => {
          //     this.$press.disableScrollBehavior = false
          //   })
          // }, () => {
          //   this.$press.disableScrollBehavior = false
          // })
        }
      }

      this._observer = startObserver({
        vm: this,
        elements,
        initialId,
        throttle: 50,
        options: {  }
      }, observedCallback)
    }
  }
}
</script>
