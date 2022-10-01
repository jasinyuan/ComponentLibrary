import { withInstall } from '@jasin-y/utils/with-install'
import _Tree from './src/tree.vue'

const Tree = withInstall(_Tree)

export default Tree

declare module 'vue' {
  export interface GlobalComponents {
    YTree: typeof Tree
  }
}
export * from './src/tree'
