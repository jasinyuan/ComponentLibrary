import DefaultTheme from 'vitepress/theme'

import YIcon from '@jasin-y/components/icon'
import '@jasin-y/theme-chalk/src/index.scss'

console.log(YIcon)

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(YIcon)
  }
}
