<template>
  <div
    class="t-block"
    :class="{ focus: enableFocus }"
    :style="computedStyle"
  >
    <slot></slot> 
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ color?: string, bgColor?: string, execute?: () => void }>()

const computedStyle = computed(() => {
  return {
    color: props.color ? `var(--${props.color}-color)` : undefined,
    backgroundColor: props.bgColor ? `var(--bg-${props.bgColor})` : undefined
  }
})

const enableFocus = ref(false)

const focus = () => {
  enableFocus.value = true
}

const unFocus = () => {
  enableFocus.value = false
}

defineExpose({
  focus,
  unFocus,
  execute() {
    if (props.execute) {
      props.execute()
    }
  }
})
</script>

<style scoped>
.t-block {
  box-sizing: border-box;
  color: var(--fg-color);
  font-family: var(--font-family);
  line-height: var(--line-height);
  display: inline-block;
  border: 1px solid #444;
  padding: 1px calc(0.5ch - 0.5px); /* 0.5ch, maybe border/2 */
  outline: none;
  /* margin-left: calc(10ch * (floor(var(--content-length) / 10) + 1)); something wrong */
  margin-right: 1ch;
}
.t-block.focus {
  font-weight: bold;
  background-color: var(--bg-lighter);
  border-color: var(--cyan-color);
  box-shadow: 0 0 0 2px var(--subtle-color);
}
</style>