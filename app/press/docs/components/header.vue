<template>
  <header class="header">
    <div class="header__container u-container u-container--large">
      <a class="header__logo" href="/">
        <img class="header__logo-image" src="/img/minter-logo-circle.svg" alt="Minter" width="36" height="36">
      </a>
      <HeaderMenu class="header__menu u-hidden-medium-down" :nav="$nav"/>

      <div class="header__controls">
        <language class="header__control-language" :locales="$docs.locales" :lang.sync="lang"/>

        <button class="header__offcanvas-button u-semantic-button u-hidden-medium-up" :class="{'is-active': isMenuActive}" @click="toggleMenu">
                        <span class="header__offcanvas-icon-wrap">
                            <span class="header__offcanvas-icon">Menu</span>
                        </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import docsMixin from 'press/docs/mixins/docs.js'
import NavLink from 'press/docs/components/nav-link.vue'
import Language from '~/layouts/_language.vue';
import HeaderMenu from '~/layouts/_header-menu.vue';

export default {
  components: {
    NavLink,
    Language,
    HeaderMenu,
  },
  mixins: [docsMixin],
  props: {
    isMenuActive: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      lang: this.$press.locale
    }
  },
  watch: {
    '$press.locale'(newLocale) {
        this.lang = newLocale;
    },
    lang(newLocale, oldLocale) {
      let { href: newPath } = this.$router.resolve({
        name: this.$route.name,
        params: {
          locale: newLocale,
          source: this.$route.params.source
        }
      })

      if (newPath) {
        // vue-router doest know that our source param can only contains /
        // as path separator and encodes those
        newPath = newPath.replace(/%2F/g, '/')
      } else {
        // fallback to replacing it router.resolve didnt work somehow
        newPath = this.$route.path.replace(`/${oldLocale}/`, `/${newLocale}/`)
        // if nothing changed, the current route is the home route
        if (newPath === this.$route.path) {
          newPath = this.$route.path.replace(/\/$/, `/${newLocale}/`)
        }
      }

      this.$router.push(newPath)
    },
  },
  methods: {
    toggleMenu() {
      this.$emit('update:isMenuActive', !this.isMenuActive);
    },
    toggleMobile() {
      document.querySelector('.sidebar').classList.toggle('mobile-visible')
    },
    getPageTitle(path) {
      const page = this.$docs.pages[path]
      if (!page || !page.toc || !page.toc.length) {
        return 'unknown page'
      }

      return page.toc[0][1]
    }
  }
}
</script>
