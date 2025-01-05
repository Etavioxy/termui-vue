<script setup lang="ts">
import { HelloWorld } from './index'
import { TermEntry, P, Pa } from './index'

const colors = [
  'comment',
  'selection',
  'subtle',
  'cyan',
  'green',
  'orange',
  'pink',
  'purple',
  'red',
  'yellow',
]

const bgColors = [
  'lighter',
  'light',
  'color',
  'dark',
  'darker',
]

const alertFunc = () => { alert('call execute') };
</script>

<template>
  <TermEntry>
    <div class="container">
      <div class="sidebar">
        <Pa> select me </Pa>
        <P> Hello </P>
        <Pa> long long long is too long for gcc </Pa>
        <Pa :color="'red'" :execute="alertFunc"> Alert </Pa>
        <br>
        <span v-for="i in 10" :key="i">
          <Pa> select{{i}} </Pa>
          <br v-if="i % 3 === 0" />
        </span>
      </div>
      <div class="content">
        <div v-for="bgColor in bgColors" :key="bgColor" :class="bgColor">
          <P v-for="color in colors" :key="color" :color="color"> {{color}} </P>
          <P v-for="bgColor in bgColors" :key="bgColor" :bgColor="bgColor"> bg-{{bgColor}} </P>
        </div>
      </div>
    </div>
  </TermEntry>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.sidebar {
  flex: 1;
  border-right: 1px solid var(--subtle-color);
  padding: 1em;
  overflow-y: auto;
}

.content {
  flex: 3;
  padding: 1em;
  overflow-y: auto;
}
</style>
