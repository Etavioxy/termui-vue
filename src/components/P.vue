<template>
  <T :color="color" :bg-color="bgColor">
    <slot></slot>
  </T>
</template>

<script setup lang="ts">
import T from './T.vue'
const props = defineProps<{ color?: string, bgColor?: string }>()
</script>