import { withInstall } from '@jasin-y/utils/with-install'
import _Virtual from './src/virtual'

const Tree = withInstall(_Virtual)

export default Tree

declare module 'vue' {
  export interface GlobalComponents {
    YVirtualList: typeof _Virtual
  }
}
