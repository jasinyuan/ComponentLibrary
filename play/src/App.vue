<script setup lang="ts">
import { TreeOption } from '@jasin-y/components/tree/src/tree'
import { AddCircle } from '@vicons/ionicons5'
import { ref } from 'vue'

// function createData(level = 4, parentKey = ''): any {
//   if (!level) return []
//   const arr = new Array(6 - level).fill(0)
//   return arr.map((_, idx: number) => {
//     const key = parentKey + level + idx
//     return {
//       label: createLabel(level), //显示的内容
//       key, //唯一性
//       children: createData(level - 1, key) //子代
//     }
//   })
// }
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
function createData() {
  return [
    {
      label: nextLabel(),
      key: 1,
      isLeaf: false
    },
    {
      label: nextLabel(),
      key: 2,
      isLeaf: false
    }
  ]
}
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
const handleLoad = (node: TreeOption) => {
  return new Promise<TreeOption[]>((resolve, reject) => {
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
</script>

<template>
  <y-icon :color="'red'" :size="20">
    <AddCircle></AddCircle>
  </y-icon>
  <y-tree :data="data" :on-load="handleLoad"> </y-tree>
</template>

<style scoped></style>
