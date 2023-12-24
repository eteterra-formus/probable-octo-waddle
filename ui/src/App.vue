<script setup lang="ts">
import { useContent } from '@/stores/content'
import AppContentNode from '@/components/AppContentNode.vue'
import AppLoader from '@/components/AppLoader.vue'
import AppHeading from '@/components/AppHeading.vue'

const store = useContent()
store.load()
</script>

<template>
  <header>
    <AppHeading>Hello World!</AppHeading>
  </header>

  <AppLoader v-if="!store.state.isReady">
    loading..
  </AppLoader>

  <section v-else>
    <AppContentNode v-for="node in store.state.nodes" :key="node.id" v-bind="node" />    
  </section>
</template>

<style scoped>
header, section {
  padding: 0 5em;
}
section {
  max-width: 600px;
  margin: 0 auto;
}
</style>
