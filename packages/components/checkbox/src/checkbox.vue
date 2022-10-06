<template>
  <label :class="bem.b()">
    <span :class="bem.e('input')">
      <input
        ref="inputRef"
        v-model="model"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        @change="handleChange"
      />
    </span>
    <span v-if="$slots.default || label" :class="bem.e('label')">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script setup lang="ts">
import { createNamespace } from '@jasin-y/utils/create'
// eslint-disable-next-line vue/prefer-import-from-vue
import { computed, ref } from '@vue/reactivity'
import { onMounted, watch } from 'vue'
import { checkboxEmits, checkboxProps } from './checkbox'

const bem = createNamespace('checkbox')
const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

defineOptions({
  name: 'y-checkbox'
})

const model = computed<any>({
  get() {
    return props.modeValue
  },
  set(val: any) {
    return emit('update:modelValue', val)
  }
})
const inputRef = ref<HTMLInputElement>()
const indeterminate = (val: boolean) => {
  inputRef.value!.indeterminate = val
}

watch(() => props.indeterminate, indeterminate)

onMounted(() => {
  indeterminate(props.indeterminate)
})

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const value = target.checked ? true : false
  emit('change', value)
}
</script>
