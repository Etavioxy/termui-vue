<template>
  <T :color="color" :bg-color="bgColor" :execute="execute"
    ref="block"
    class="pa-component"
  >
    <slot></slot>
  </T>
</template>

<script setup lang="ts">
import T from './T.vue'
import { MovementManager } from '../movementManager'
import { ref, onMounted, onBeforeUnmount, inject } from 'vue'
import type { Reactive } from 'vue'
import type { TComponent } from '../types'

const props = defineProps<{ color?: string, bgColor?: string, execute?: () => void }>()

const block = ref<TComponent | null>(null)


const manager = inject('movementManager', null) as Reactive<MovementManager> | null

onMounted(() => {
  if (block.value && manager) {
    manager.registerBlock(block.value)
  }
})

onBeforeUnmount(() => {
  if (block.value && manager) {
    manager.unregisterBlock(block.value)
  }
})
</script>

<style>
.pa-component {
  cursor: pointer;
}
</style>