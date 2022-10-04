//整合组件最终实现导出

import _Checkbox from './src/checkbox.vue'
import { withInstall } from '@jasin-y/utils/with-install'

const Checkbox = withInstall(_Checkbox)

export default Checkbox

export * from './src/checkbox'

//类型可被模板解析
declare module 'vue' {
  export interface GlobalComponents {
    //接口自动合并
    YCheckbox: typeof Checkbox
  }
}
