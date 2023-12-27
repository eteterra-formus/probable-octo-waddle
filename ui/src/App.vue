<script setup lang="ts">
import AppHeading from '@/components/AppHeading.vue'
import AppListItem from '@/components/AppListItem.vue'
import { usePages } from '@/stores/pageStore'

const store = usePages()
store.load()
</script>

<template>
  <div class="app-container">
    <AppHeading>Hello World!</AppHeading>

    <p v-if="!store.state.isReady">loading..</p>

    <p class="error" v-if="store.state.isReady && store.state.error">{{ store.state.error }}</p>

    <section v-if="store.state.isReady && store.state.pages.length > 0">
      <AppListItem v-for="page in store.state.pages" :key="page.id" v-bind="page" />
    </section>

    <section v-if="store.state.isReady && !store.state.error && store.state.pages.length === 0">
      <div>¯\_(ツ)_/¯</div>
      <div>Sorry, no pages to display</div>
    </section>
  </div>
</template>

<style scoped>
.app-container {
  padding: 0 5em 1em;
}
</style>
