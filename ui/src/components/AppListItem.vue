<script setup lang="ts">
import type { Page } from '@/types/content'

interface Props {
  id: string
  name: string
  children?: Page[]
}
withDefaults(defineProps<Props>(), { children: () => [] })
</script>

<template>
  <div>
    <span>>&nbsp;</span>
    <span>{{ name }}</span>
  </div>
  <div class="children">
    <AppListItem v-for="page in children" :key="page.id" v-bind="page" />
  </div>
</template>

<style scoped>
.children {
  margin-left: 1em;
}
</style>
