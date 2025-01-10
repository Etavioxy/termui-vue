<template>
  <div class="term-entry theme-dracula"
    tabindex="0"
    ref="termEntry"
    @keydown.prevent="onKeydown"
    @click="onClick"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, provide } from 'vue'
import { MovementManager } from '../movementManager'
import '../palettes/dracula.css'

const manager = reactive(new MovementManager());
const termEntry = ref<HTMLElement | null>(null)

provide('movementManager', manager)

function onKeydown(e: KeyboardEvent) {
  if ('hjkl'.includes(e.key)) {
    console.log(e.key)
    manager.move(e.key)
  }
  if (e.key === 'Enter') {
    console.log(e.key)
    manager.executeFocusedComponent()
  }
}

function onClick(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.closest('.pa-component')) {
    const paComponent = target.closest('.pa-component') as any;
    if (paComponent) {
      manager.focusBlockByElement(paComponent);
    }
  }
}
</script>

<style>
.term-entry {
  background-color: var(--bg-color);
}
.term-entry:focus-within {
  outline: none;
  border: 1px solid var(--orange-color);
}
</style>