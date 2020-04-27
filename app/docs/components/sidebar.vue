<template>
  <aside
          ref="sidebar"
          class="docs-aside"
          :class="sidebarClass"
          aria-label="Main navigation"
          v-show="isShowSidebar"
  >
    <div class="docs-aside__section u-hidden-medium-up">
      <HeaderMenu class="docs-aside__nav" :nav="$nav"/>
    </div>
    <div class="docs-aside__sticky sidebar">
      <div class="docs-aside__page" v-for="page in sidebarPages">
        <div class="docs-aside__page-link">
          <nuxt-link class="docs-aside__menu-link" :to="page.pathClean" :class="{'is-active': page.path === normalizedPath}">
            {{ page.title }}
          </nuxt-link>
        </div>
        <sidebar-sections
                v-if="page.path === normalizedPath"
                :data="sidebarH2"
                :active-path="activePath"
                :active-page="activePageHash"
                :docsPrefix="$docs && $docs.prefix"
        />
      </div>
    </div>
  </aside>
</template>

<script>
  import SidebarSection from 'press/docs/components/sidebar-section'
  import SidebarSections from 'press/docs/components/sidebar-sections'
  import docsMixin from 'press/docs/mixins/docs'
  import HeaderMenu from '~/layouts/_header-menu.vue';

  export default {
    components: {
      SidebarSections,
      HeaderMenu,
    },
    provide: {
      components: {
        SidebarSections,
        SidebarSection
      }
    },
    mixins: [docsMixin],
    props: {
      isShowSidebar: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        sidebar: [],
      }
    },
    created() {
      //@TODO scroll to active section on start
      //@TODO change max height of sticky on scroll
      this.prepareSidebar()
      this.changeSidebar()
    },
    computed: {
      pressId() {
        return this.$press.id
      },
      sidebarPages() {
        const localeList = this.$press.docs.locales.map((item) => item.code);
        let result = [];
        Object.keys(this.$press.docs.pages).forEach((path) => {
          // LOCALE
          const localePart = path.split('/')[1];
          // is locale prefixed or without prefix
          const isLocalePrefixed = localeList.indexOf(localePart) >= 0;
          const locale = isLocalePrefixed ? localePart : '';
          // filter other locales
          if (locale !== this.$press.locale) {
            return;
          }

          // CATEGORY
          // remove locale prefix
          let pathWithoutLocale = path;
          if (locale) {
            pathWithoutLocale = path.replace(`/${this.$press.locale}`, '');
          }
          const category = pathWithoutLocale.split('/')[1];
          // filter other categories
          if (category !== this.currentCategory) {
            return;
          }

          // ORDER
          let order;
          if (pathWithoutLocale === `/${category}/`) {
            order = 0
          } else if (this.$press.docs.pages[path].meta.order) {
            order = this.$press.docs.pages[path].meta.order
          } else {
            order = 100;
          }

          result.push({
            ...this.$press.docs.pages[path],
            path,
            locale,
            category,
            order,
            pathClean: path.replace(/(.+)\/$/, '$1'),
          });
        });

        return result.sort((a, b) => {
          return a.order - b.order;
        })
      },
      // pagesByLocale() {
      //   const localeList = this.$press.docs.locales.map((item) => item.code);
      //   let result = {};
      //   Object.keys(this.$press.docs.pages).forEach((path) => {
      //     const localePart = path.split('/')[1];
      //     // is locale prefixed or without prefix
      //     const isLocalePrefixed = localeList.indexOf(localePart) >= 0;
      //     const locale = isLocalePrefixed ? localePart : '';
      //     // ensure key exists
      //     // add first slash, because locale may be empty string, and it is not valid object key
      //     if (!result[`/${locale}`]) {
      //       result[`/${locale}`] = [];
      //     }
      //     result[`/${locale}`].push(path);
      //   });
      //   return result;
      // },
      // pagesByCategory() {
      //   let result = {};
      //   const pages = this.pagesByLocale[`/${this.$press.locale}`];
      //   pages.forEach((path) => {
      //
      //     // remove locale prefix
      //     let pathWithoutLocale = path;
      //     if (this.$press.locale.length) {
      //       pathWithoutLocale = path.replace(`/${this.$press.locale}`, '');
      //     }
      //     const category = pathWithoutLocale.split('/')[1];
      //     // ensure key exists
      //     if (!result[category]) {
      //       result[category] = [];
      //     }
      //     result[category].push(path);
      //   });
      //   return result;
      // },
      currentCategory() {
        let path = this.normalizedPath;
        // remove locale prefix
        if (this.$press.locale.length) {
          path = path.replace(`/${this.$press.locale}`, '');
        }
        return path.split('/')[1];
      },
      // sidebarPages() {
      //   let result = {};
      //   const pathList = this.pagesByCategory[this.currentCategory];
      //   pathList.forEach((path) => {
      //     result[path] = this.$press.docs.pages[path];
      //   });
      //   return result;
      // },
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
        /*console.log('normalizedPath', this.normalizedPath)
        console.log(this.$press)
        console.log(this.$docs)*/

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
