//整合组件最终实现导出

import _Icon from "./src/icon.vue";
import { withInstall } from "@jasin-y/utils/with-install";

const Icon = withInstall(_Icon);

export default Icon;

export * from "./src/icon";

//类型可被模板解析
declare module 'vue'{
    export interface GlobalComponents{//接口自动合并
            YIcon:typeof Icon

    }
}
