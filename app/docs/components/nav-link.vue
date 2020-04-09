<script>
import { isExternal, isMailto, isTel } from 'press/docs/utils'

export default {
  functional: true,
  props: {
    item: {
      required: true
    },
    noPrefix: Boolean
  },
  computed: {
    link() {
      return this.item.link
    },
    exact () {
      return this.link === '/'
    }
  },
  render(h, ctx) {
      console.log(ctx)
      const { props, parent } = ctx
    const { link, text } = props.item

    if (isExternal(link)) {
      const isMailOrTell = isMailto(link) || isTel(link)
      return h('a', {
        staticClass: 'nav-link olol external',
        attrs: {
          href: link,
          rel: isMailOrTell ? null : 'noopener noreferrer',
          target: isMailOrTell ? null : '_blank'
        }
      }, [
        'asd',
        h('OutboundLink')
      ])
    }

    return h('NuxtLink', {
      staticClass: '111',
      props: {
        to: props.noPrefix ? link : `${parent.$docs.prefix}${link}`,
        exact: link === '/'
      }
    }, [ 'asd' ])
  }
}
</script>
