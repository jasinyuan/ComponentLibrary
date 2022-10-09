//存储组件的属性和相关事件

import { ExtractPropTypes, PropType } from 'vue'

//size组件的大小
//type颜色展现的类型
//round是否是圆角
//loading是否按钮正在加载
//disabled是否禁用按钮
//native-tyoe原始类型
//icon-placement 图标的位置

//插槽 icon

export type Size = 'small' | 'medium' | 'large'

export type Type =
  | 'primary'
  | 'sucess'
  | 'warning'
  | 'danger'
  | 'info'
  | 'default'
  | ''
export type NativeType = 'button' | 'submit' | 'reset'
export type Placement = 'left' | 'right'

export const buttonProps = {
  size: String as PropType<Size>,
  //PropType“在使用时，知道为string，但是不知道字符串内部的组成，使用PropType可以保证该字符串类型为size类型中的一种
  type: {
    type: String as PropType<Type>,
    validator: (val: string) => {
      //检测到表单元素（input, checkbox, select 等)上的 DOM 事件 (input, blur, change)时自动验证。
      return [
        'primary',
        'sucess',
        'warning',
        'danger',
        'info',
        'default',
        ''
      ].includes(val)
      //includes:判断字符串是否包含指定的子字符串---返回的是布尔值
    },
    default: ''
  },
  round: Boolean,
  loading: Boolean,
  disabled: Boolean,
  nativeType: {
    type: String as PropType<NativeType>,
    default: 'button'
  },
  iconPlacement: {
    type: String as PropType<Placement>,
    default: 'left'
  }
} as const

export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent,
  mousedown: (e: MouseEvent) => e instanceof MouseEvent
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type buttonEmits = typeof buttonEmits
