<template>
  <Pa>
    <input
      type="text"
      class="input"
      :value="modelValue"
      @input="handleInput"
    />
    <slot></slot>
  </Pa>
</template>

<script setup lang="ts">
import Pa from './Pa.vue'

const props = defineProps<{ modelValue: string }>()
const emits = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emits('update:modelValue', target.value)
}
</script>

<style scoped>
.input {
  flex-shrink: 1;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  border-radius: var(--rounded-btn, .5rem);
  border-width: 1px;
  border-color: transparent;
  --tw-bg-opacity: 1;
  background-color: var(--fallback-b1, oklch(var(--b1) / var(--tw-bg-opacity)));
}
</style>