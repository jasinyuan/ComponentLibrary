import {
  ExtractDefaultPropTypes,
  InjectionKey,
  PropType,
  SetupContext
} from 'vue'

export type Key = string | number

export interface TreeNode extends Required<TreeOption> {
  level: number
  rawNode: TreeOption
  children: TreeNode[]
  isLeaf: boolean
}
//Required将类型中所有选项变为必选，去除所有？

export interface TreeOption {
  label?: Key
  key?: Key
  children?: TreeOption[]
  isLeaf?: boolean
  disabled?: boolean
  [key: string]: unknown //任意接口
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  defaultExpandedKets: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  labelField: {
    type: String,
    default: 'label'
  },
  keyField: {
    type: String,
    default: 'key'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  selectedKeys: {
    type: Array as PropType<Key[]>
  },
  selectable: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  showCheckbox: {
    type: Boolean,
    default: false
  }
} as const

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  expanded: {
    type: Boolean,
    required: true
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>,
    required: true
  },
  selectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  checked: Boolean,
  disabled: Boolean,
  indeterminate: Boolean
} as const

export const treeNodeEmitts = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node
}

export const treeEmitts = {
  //内部发射 的事件用来同步响应式数据
  'update:selectedKeys': (keys: Key[]) => keys
}

export type TreeProps = Partial<ExtractDefaultPropTypes<typeof treeProps>>

//Partial<T> 可以快速把某个接口类型中定义的属性变成可选的(Optional)：
export interface TreeContext {
  slots: SetupContext['slots']
}
//此变量作为提供出去的属性
export const treeInjectKey: InjectionKey<TreeContext> = Symbol()

export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
}
