<script setup lang="ts">
import { Key, TreeOption } from '@jasin-y/components/tree/src/tree'
import { AddCircle } from '@vicons/ionicons5'
import { ref } from 'vue'

function createData(level = 4, parentKey = ''): any {
  if (!level) return []
  const arr = new Array(20 - level).fill(0)
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx
    return {
      label: createLabel(level), //显示的内容
      key, //唯一性
      children: createData(level - 1, key) //子代
    }
  })
}
function createLabel(level: number): string {
  if (level === 4) {
    return '道生一'
  }
  if (level === 3) {
    return '一生二'
  }
  if (level === 2) {
    return '二生三'
  }
  if (level === 1) {
    return '三生万物'
  }
  return ''
}
// function createData() {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false
//     },
//     {
//       label: nextLabel(),
//       key: 2,
//       isLeaf: false
//     }
//   ]
// }
function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) {
    return 'out of Tao,One is born'
  }
  if (currentLabel === 'out of Tao,One is born') {
    return 'out of One, Two'
  }
  if (currentLabel === 'out of One, Two') {
    return 'out of Two,Three'
  }
  if (currentLabel === 'out of Two,Three') {
    return 'out of Three,the created universe'
  }
  if (currentLabel === 'out of Three,the created universe') {
    return 'out of Tao,One is born'
  }
  return ''
}
const data = ref(createData())
// const data = ref<TreeOption[]>([
//   {
//     key: '0',
//     label: '0',
//     children: [
//       {
//         key: '0-0',
//         label: '0-0'
//       },
//       {
//         disabled: true, //这个节点被禁用了
//         key: '0-1',
//         label: '0-1',
//         children: [
//           {
//             label: '0-1-0',
//             key: '0-1-0'
//           },
//           {
//             label: '0-1-1',
//             key: '0-1-1'
//           }
//         ]
//       }
//     ]
//   }
// ])
const handleLoad = (node: TreeOption) => {
  return new Promise<TreeOption[]>((resolve, result) => {
    setTimeout(() => {
      resolve([
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false
        }
      ])
    }, 1000)
  })
}
const value = ref<Key[]>([])
</script>

<template>
  <y-icon :color="'red'" :size="20">
    <AddCircle></AddCircle>
  </y-icon>
  {{ value }}
  <y-tree
    v-model:selected-keys="value"
    :data="data"
    :on-load="handleLoad"
    selectable
    multiple
  >
    <template #default="{ node }"> {{ node.key }} - {{ node.label }} </template>
  </y-tree>
  <!-- selectable:可以选择节点  multiple:意味着可以多选节点 -->
</template>

<style scoped></style>
