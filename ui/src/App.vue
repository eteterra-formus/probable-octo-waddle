<script setup lang="ts">
import AppLoader from '@/components/AppLoader.vue'
import AppHeading from '@/components/AppHeading.vue'
import AppListItem from '@/components/AppListItem.vue'
import { usePages } from '@/stores/pageStore'

const store = usePages()
store.load()
</script>

<template>
  <AppHeading>Hello World!</AppHeading>

  <AppLoader v-if="!store.state.isReady"> loading.. </AppLoader>

  <p class="error" v-if="store.state.isReady && store.state.error">{{ store.state.error }}</p>

  <section v-if="store.state.isReady && store.state.pages.length > 0">
    <AppListItem v-for="page in store.state.pages" :key="page.id" v-bind="page" />
  </section>

  <section v-if="store.state.isReady && !store.state.error && store.state.pages.length === 0">
    <div>¯\_(ツ)_/¯</div>
    <div>Sorry, no pages to display</div>
  </section>
</template>

<style scoped>
header {
  padding: 0 5em;
}
section {
  padding: 0 5em 1em;
}
section {
  max-width: 600px;
  margin: 0 auto;
}
.error {
  text-align: center;
}
</style>
