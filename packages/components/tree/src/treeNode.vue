<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSeletd),
      bem.is('disabled', node.disabled)
    ]"
  >
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
      <y-checkbox
        v-if="showCheckbox"
        :mode-value="checked"
        :disabled="disabled"
        :indeterminate="indeterminate"
        @change="handleCheckedChange"
      ></y-checkbox>
      <span :class="bem.e('label')" @click="handleSeleted">
        <YTreeNodeContent :node="node"> </YTreeNodeContent>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@jasin-y/utils/create'
import { treeNodeEmitts, treeNodeProps } from './tree'
import Switcher from '@jasin-y/components/internal-icon/switcher'
import YIcon from '@jasin-y/components/icon'
import { computed } from 'vue'
import Loading from '@jasin-y/components/internal-icon/Loading'
import YTreeNodeContent from './tree-node-content'
import YCheckbox from '@jasin-y/components/checkbox'

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

const handleSeleted = () => {
  if (props.node.disabled) return
  emit('select', props.node)
}
const handleCheckedChange = (val: boolean) => {
  emit('check', props.node, val)
}
</script>
