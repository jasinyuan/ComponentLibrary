<template>
  <button
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round', round),
      bem.is('loading', loading),
      bem.is('desabled', disabled)
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
  >
    <LoadingComponect v-if="loading"></LoadingComponect>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { createNamespace } from '@jasin-y/utils/create'
import { buttonEmits, buttonProps } from './button'
import LoadingComponect from '@jasin-y/components/internal-icon/Loading'

const bem = createNamespace('button')

defineOptions({
  name: 'y-button'
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
</script>
