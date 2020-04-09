<template>
  <aside
          ref="sidebar"
          class="docs-aside"
          :class="sidebarClass"
          aria-label="Main navigation"
  >
    <div class="docs-aside__sticky sidebar">
      <div v-for="(page, path) in sidebarPages">
        <nuxt-link class="docs-aside__menu-link" :to="path" :class="{'is-active': path === normalizedPath}">
          {{ page.title }}
        </nuxt-link>
        <br>
        <sidebar-sections
                v-if="path === normalizedPath"
                :data="sidebarH2"
                :active-path="activePath"
                :active-page="activePageHash"
        />
      </div>
    </div>
  </aside>
</template>

<script>
  import SidebarSection from 'press/docs/components/sidebar-section'
  import SidebarSections from 'press/docs/components/sidebar-sections'
  import docsMixin from 'press/docs/mixins/docs'

  export default {
    components: {
      SidebarSections
    },
    provide: {
      components: {
        SidebarSections,
        SidebarSection
      }
    },
    mixins: [docsMixin],
    data() {
      return {
        sidebar: [],
      }
    },
    created() {
      this.prepareSidebar()
      this.changeSidebar()
    },
    computed: {
      pressId() {
        console.log(this.$press)
        return this.$press.id
      },
      pagesByLocale() {
        const localeList = this.$press.docs.locales.map((item) => item.code);
        let result = {};
        Object.keys(this.$press.docs.pages).forEach((path) => {
          const localePart = path.split('/')[1];
          // is locale prefixed or without prefix
          const isLocalePrefixed = localeList.indexOf(localePart) >= 0;
          const locale = isLocalePrefixed ? localePart : '';
          // ensure key exists
          // add first slash, because locale may be empty string, and it is not valid object key
          if (!result[`/${locale}`]) {
            result[`/${locale}`] = [];
          }
          result[`/${locale}`].push(path);
        });
        return result;
      },
      pagesByCategory() {
        let result = {};
        const pages = this.pagesByLocale[`/${this.$press.locale}`];
        pages.forEach((path) => {
          // remove locale prefix
          if (this.$press.locale.length) {
            path = path.replace(`/${this.$press.locale}`, '');
          }
          const category = path.split('/')[1];
          // ensure key exists
          if (!result[category]) {
            result[category] = [];
          }
          result[category].push(path);
        });
        return result;
      },
      currentCategory() {
        let path = this.normalizedPath;
        // remove locale prefix
        if (this.$press.locale.length) {
          path = path.replace(`/${this.$press.locale}`, '');
        }
        return path.split('/')[1];
      },
      sidebarPages() {
        let result = {};
        const pathList = this.pagesByCategory[this.currentCategory];
        pathList.forEach((path) => {
          result[path] = this.$press.docs.pages[path];
        });
        return result;
      },
      sidebarH2() {
        return this.sidebar.reduce((accumulator, item) => {
          return item[3] ? accumulator.concat(item[3]) : accumulator;
        }, []);
      },
      activePath() {
        let path = this.normalizedPath
        if (!path.endsWith('/')) {
          path =`${path}/`
        }
        return `${path}${this.$route.hash}`
      },
      // this variable is used to make sure that if we browse to a page
      // without any hash in the url, the first header of the page will
      // still be active in the sidebar
      activePageHash() {
        if (this.activePath.includes('#')) {
          return this.activePath
        }

        return `${this.activePath}${this.$page.hash}`
      },
      sidebarClass() {
        return this.$page.meta.sidebar === 'auto' ? 'sidebar-auto' : undefined
      }
    },
    watch: {
      locale() {
        if (this.$docs.ready && this.$docs.configPerLocale) {
          this.prepareSidebar()
          this.changeSidebar()
        }
      },
      "$press.id" () {
        if (this.$docs.ready) {
          this.prepareSidebar()
          this.changeSidebar()
        }
      },
      normalizedPath() {
        if (this.$docs.ready) {
          this.changeSidebar()
        }

        this.$nextTick(() => {
          if (this.$refs.sidebar.classList.contains('mobile-visible')) {
            this.toggleMobile()
          }
        })
      }
    },
    methods: {
      prepareSidebar() {
        console.log('normalizedPath', this.normalizedPath)
        console.log(this.$press)
        console.log(this.$docs)

        if (this.$docs.configPerLocale) {
          this._sidebars = this.$docs.sidebars[this.locale]
        } else {
          this._sidebars = this.$docs.sidebars
        }

        // extract all sidebar paths in reverse order of length
        this._sidebarPaths = Object.keys(this._sidebars).sort((a, b) => {
          return b.length - a.length
        })
      },
      changeSidebar() {
        const path = this.normalizedPath.toLowerCase()

        const { meta } = this.$page
        if (meta && meta.sidebar === 'auto') {
          this.setSidebar(this._sidebars[path])
          return
        }

        for (const sidebarPath of this._sidebarPaths) {
          if (path.startsWith(sidebarPath)) {
            this.setSidebar(this._sidebars[sidebarPath])
            break
          }
        }
      },
      setSidebar(sidebar) {
        this.sidebar = sidebar
      },
      toggleMobile() {
        this.$refs.sidebar.classList.toggle('mobile-visible')
      }
    }
  }
</script>
