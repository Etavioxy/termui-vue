<template>
  <Pa>
    <input
      type="checkbox"
      class="checkbox"
      :checked="checked"
      @change="handleChange"
    />
    <slot></slot>
  </Pa>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import Pa from './Pa.vue'

const props = defineProps<{ modelValue: boolean }>()
const emits = defineEmits(['update:modelValue'])

const checked = ref(props.modelValue)

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  checked.value = target.checked
  emits('update:modelValue', checked.value)
}
</script>

<style scoped>
.checkbox:checked {
  background-repeat: no-repeat;
  animation: checkmark var(--animation-input, .2s) ease-out;
  background-color: var(--chkbg);
  background-image: linear-gradient(-45deg, transparent 65%, var(--chkbg) 65.99%), linear-gradient(45deg, transparent 75%, var(--chkbg) 75.99%), linear-gradient(-45deg, var(--chkbg) 40%, transparent 40.99%), linear-gradient(45deg, var(--chkbg) 30%, var(--chkfg) 30.99%, var(--chkfg) 40%, transparent 40.99%), linear-gradient(-45deg, var(--chkfg) 50%, var(--chkbg) 50.99%);
}
.checkbox {
  flex-shrink: 0;
  --chkbg: var(--fallback-bc, oklch(var(--bc) / 1));
  --chkfg: var(--fallback-b1, oklch(var(--b1) / 1));
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: var(--rounded-btn, .5rem);
  border-width: 1px;
  border-color: var(--fallback-bc, oklch(var(--bc) / var(--tw-border-opacity)));
  --tw-border-opacity: .2;
}
</style>