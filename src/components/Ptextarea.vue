<template>
  <Pa>
    <textarea
      class="textarea"
      :value="modelValue"
      @input="handleInput"
    ></textarea>
    <slot></slot>
  </Pa>
</template>

<script setup lang="ts">
import Pa from './Pa.vue'

const props = defineProps<{ modelValue: string }>()
const emits = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emits('update:modelValue', target.value)
}
</script>

<style scoped>
.textarea {
  flex-shrink: 1;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 6rem;
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  border-radius: var(--rounded-btn, .5rem);
  border-width: 1px;
  border-color: transparent;
  --tw-bg-opacity: 1;
  background-color: var(--fallback-b1, oklch(var(--b1) / var(--tw-bg-opacity)));
  resize: vertical;
}
</style>