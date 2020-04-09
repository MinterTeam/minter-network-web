<template>
  <header class="header" data-header>
    <div class="header__container u-container u-container--large" data-header-container>
      <a class="header__logo" href="/" data-header-logo>
        <img class="header__logo-image" src="/img/minter-logo-circle.svg" alt="Minter" width="36" height="36">
      </a>
      <nav class="header__menu" data-header-menu>
        <nuxt-link
                v-for="(item, idx) in $nav"
                :key="`topmenu-${idx}`"
                class="header__link"
                :class="activeClass(item.link)"
                :no-prefix="true"
                :to="item.link"
        >
            {{ item.text }}
        </nuxt-link>
      </nav>

      <div class="header__controls">
<!--        <Language class="header__control-language"/>-->
          <select
                  v-if="$docs.locales"
                  v-model="lang"
                  aria-label="Change locale"
          >
              <option
                      v-for="locale in $docs.locales"
                      :key='`locale-${locale.code}`'
                      :value="locale.code">{{ locale.name }}</option>
          </select>

        <button class="header__offcanvas-button u-semantic-button" data-header-button>
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
import HeaderMenu from '~/assets/header-menu';

let headerMenu;

export default {
  components: {
    NavLink
  },
  mixins: [docsMixin],
  data () {
    return {
      lang: this.$press.locale
    }
  },
  watch: {
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
    }
  },
  mounted() {
    headerMenu = new HeaderMenu();
  },
  destroyed() {
    if (headerMenu && headerMenu.destroy) {
      headerMenu.destroy();
    }
  },
  methods: {
    activeClass(link) {
      return this.$route.path.startsWith(link) ? 'is-active' : ''
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
