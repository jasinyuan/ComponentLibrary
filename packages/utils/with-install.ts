import { Plugin } from "vue";

export type SFCWithInstall<T> = T & Plugin;

export function withInstall<T>(comp: T) {
  (comp as SFCWithInstall<T>).install = function (app) {
    const { name } = comp as unknown as { name: string };
    app.component(name, comp as SFCWithInstall<T>); //注册全局组件
  };
  return comp as SFCWithInstall<T>;
}
