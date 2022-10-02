<template>
  <div :class="[bem.b(), bem.is('selected', isSeletd)]">
    <div
      :class="bem.e('content')"
      :style="{ paddingLeft: `${node.level * 16}px` }"
    >
      <span
        :class="[
          bem.e('expand-icon'),
          { expanded: expanded && !node?.isLeaf },
          bem.is('leaf', node.isLeaf)
        ]"
        @click="handleExpand"
      >
        <y-icon size="16" color="pink">
          <switcher v-if="!isLoading"></switcher>
          <Loading v-else></Loading>
        </y-icon>
      </span>
      <span @click="handleSeleted" :class="bem.e('label')">{{
        node?.label
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@jasin-y/utils/create'
import { treeNodeEmitts, treeNodeProps } from './tree'
import Switcher from './icon/switcher'
import YIcon from '@jasin-y/components/icon'
import { computed } from 'vue'
import Loading from './icon/Loading'

const bem = createNamespace('tree-node')

const props = defineProps(treeNodeProps)

const emit = defineEmits(treeNodeEmitts)
function handleExpand() {
  emit('toggle', props.node)
}
const isLoading = computed(() => {
  return props.loadingKeys.has(props.node.key)
})

const isSeletd = computed(() => {
  return props.selectedKeys.includes(props.node.key)
})

function handleSeleted() {
  emit('select', props.node)
}
</script>
