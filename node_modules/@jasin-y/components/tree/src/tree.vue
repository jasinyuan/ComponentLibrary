<template>
  <div :class="bem.b()">
    <y-virtual-list :items="flattenTree" :remain="8" :size="35">
      <template #default="{ node }">
        <y-tree-node
          :key="node.key"
          :node="node"
          :expanded="isExpanded(node)"
          :loading-keys="loadingKeyRef"
          :selected-keys="selectKeysRef"
          :indeterminate="isIndeterminate(node)"
          :show-checkbox="showCheckbox"
          :checked="isChecked(node)"
          :disabled="isDisabled(node)"
          @toggle="toggleExpand"
          @select="handleSelect"
          @check="toggleCheck"
        ></y-tree-node>
      </template>
    </y-virtual-list>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref, useSlots, watch } from 'vue'
import {
  treeProps,
  TreeNode,
  TreeOption,
  Key,
  treeEmitts,
  treeInjectKey
} from './tree'
import { createNamespace } from '@jasin-y/utils/create'
import YTreeNode from './treeNode.vue'
import YVirtualList from '@jasin-y/components/virtual-list'

const bem = createNamespace('tree')

defineOptions({
  name: 'y-tree'
})

const props = defineProps(treeProps)

//有了props，要对用户的数据格式化一个固定的结果
//label, key, children

//将peop.data 格式化后放到tree中
const tree = ref<TreeNode[]>([])
//1.获取对应字段
function createOptions(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string // 用户传递的key
    },
    getLabel(node: TreeOption) {
      return node[label] as string //用户传递label
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[] // 用户传递的children获取子代
    }
  }
}

const treeOptions = createOptions(
  props.keyField,
  props.labelField,
  props.childrenField
)
//2.将用户传递的数据进行格式化操作
function createTree(data: TreeOption[], parent: TreeNode | null = null) {
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map(node => {
      const children = treeOptions.getChildren(node) || []
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [], //默认为空
        rawNode: node,
        level: parent ? parent.level + 1 : 0,
        disabled: !!node.disabled,
        //判断节点是否带isleaf 如果自带了，以自带为准，如果没有自带，则检查是否有children属性
        isLeaf: node.isLeaf ?? children.length == 0,
        parentKey: parent?.key
      }
      if (children.length > 0) {
        //有子代在进行递归，将格式化称treeNode类型
        treeNode.children = traversal(children, treeNode)
      }
      return treeNode
    })
  }
  const result: TreeNode[] = traversal(data, parent)
  return result
}
//监控数据变化，调用格式化方法，先格式化一次
watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data)
  },
  { immediate: true }
)

//需要展开的key有哪些
const expandedKeySet = ref(new Set(props.defaultExpandedKets))
//3.将一棵树拍平,这里需要依赖当前展开的节点动态计算
const flattenTree = computed(() => {
  const expandedKeys = expandedKeySet.value //需要展开的keys有哪些
  const flatenNoodes: TreeNode[] = [] //拍平后的的结果
  const nodes = tree.value || [] //被格式化后的节点
  const stack: TreeNode[] = [] //用于遍历树的栈
  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i])
  }

  while (stack.length) {
    const node = stack.pop()
    if (!node) {
      continue
    }
    flatenNoodes.push(node)
    if (expandedKeys.has(node.key)) {
      const children = node.children
      if (children) {
        for (let i = node.children.length - 1; i >= 0; --i) {
          stack.push(node.children[i])
        }
      }
    }
  }
  return flatenNoodes
})
function isExpanded(node: TreeNode): boolean {
  return expandedKeySet.value.has(node.key)
}
//折叠
function collpase(node: TreeNode) {
  expandedKeySet.value.delete(node.key)
}

const loadingKeyRef = ref(new Set<Key>())

function trggerLoading(node: TreeNode) {
  //这个节点需要异步加载
  if (!node.children.length && !node.isLeaf) {
    //如果没有加载过这个节点就加载这个节点
    const loadingKeys = loadingKeyRef.value
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key)
      const onLoad = props.onLoad
      if (onLoad) {
        onLoad(node.rawNode).then(children => {
          //修改原来的节点
          node.rawNode.children = children
          //更新自定义节点
          node.children = createTree(children, node)
          loadingKeys.delete(node.key)
        })
      }
    }
  }
}
//展开
function expand(node: TreeNode) {
  expandedKeySet.value.add(node.key)
  trggerLoading(node)
}
//4.让用户点击展开
function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeySet.value
  if (expandKeys.has(node.key) && !loadingKeyRef.value.has(node.key)) {
    collpase(node)
  } else {
    expand(node)
  }
}

//5实现选中节点
const emit = defineEmits(treeEmitts)
const selectKeysRef = ref<Key[]>([])

watch(
  () => props.selectedKeys,
  value => {
    if (value) {
      selectKeysRef.value = value
    }
  },
  {
    immediate: true
  }
)
//处理选中节点
function handleSelect(node: TreeNode) {
  let keys = Array.from(selectKeysRef.value)

  if (!props.selectable) return //如果不能选择就什么都不做
  if (props.multiple) {
    const index = keys.findIndex(key => key === node.key)
    if (index > -1) {
      keys.splice(index)
    } else {
      keys.push(node.key)
    }
  } else {
    if (keys.includes(node.key)) {
      keys = []
    } else {
      keys = [node.key]
    }
  }
  emit('update:selectedKeys', keys)
}

provide(treeInjectKey, {
  slots: useSlots()
})

const checkedKeysRefs = ref(new Set(props.defaultCheckedKeys))

const isChecked = (node: TreeNode) => {
  return checkedKeysRefs.value.has(node.key)
}

const isDisabled = (node: TreeNode) => {
  return !!node.disabled
}

const indeterminateRefs = ref<Set<Key>>(new Set())

const isIndeterminate = (node: TreeNode) => {
  return indeterminateRefs.value.has(node.key)
}

const toogle = (node: TreeNode, checked: boolean) => {
  if (!node) return
  const checkedKeys = checkedKeysRefs.value

  if (checked) {
    indeterminateRefs.value.delete(node.key)
  }

  checkedKeys[checked ? 'add' : 'delete'](node.key)
  const children = node.children
  if (children) {
    children.forEach(childNode => {
      if (!childNode.disabled) {
        toogle(childNode, checked)
      }
    })
  }
}
const fineNode = (key: Key) => {
  return flattenTree.value.find(node => node.key === key)
}
const updateCheckedKeys = (node: TreeNode) => {
  if (node.parentKey) {
    const parentNode = fineNode(node.parentKey)

    if (parentNode) {
      let allChecked = true
      let hasChecked = false

      const nodes = parentNode.children
      for (const node of nodes) {
        if (checkedKeysRefs.value.has(node.key)) {
          hasChecked = true
        } else if (indeterminateRefs.value.has(node.key)) {
          allChecked = false
          hasChecked = true
        } else {
          allChecked = false
        }
      }
      if (allChecked) {
        checkedKeysRefs.value.add(parentNode.key)
        indeterminateRefs.value.delete(parentNode.key)
      } else if (hasChecked) {
        checkedKeysRefs.value.delete(parentNode.key)
        indeterminateRefs.value.add(parentNode.key)
      }
      updateCheckedKeys(parentNode)
    }
  }
}
const toggleCheck = (node: TreeNode, checked: boolean) => {
  toogle(node, checked)

  updateCheckedKeys(node)
}

onMounted(() => {
  checkedKeysRefs.value.forEach((key: Key) => {
    toggleCheck(fineNode(key)!, true)
  })
})
</script>
