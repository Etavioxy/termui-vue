<template>
  <Pa>
    <select
      class="select"
      :value="modelValue"
      @change="handleChange"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <slot></slot>
  </Pa>
</template>

<script setup lang="ts">
import Pa from './Pa.vue'

interface Option {
  value: string | number
  label: string
}

const props = defineProps<{ modelValue: string | number, options: Option[] }>()
const emits = defineEmits(['update:modelValue'])

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emits('update:modelValue', target.value)
}
</script>

<style scoped>
.select {
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
  cursor: pointer;
}
</style>