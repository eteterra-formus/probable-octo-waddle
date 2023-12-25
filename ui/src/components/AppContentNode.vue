<script setup lang="ts">
import type { ContentNode } from '@/api/content'

interface Props {
  id: string
  name: string
  children?: ContentNode[]
}
withDefaults(defineProps<Props>(), { children: () => [] })
</script>

<template>
  <div>
    <span>>&nbsp;</span>
    <span>{{ name }}</span>
  </div>
  <div class="children">
    <AppContentNode v-for="node in children" :key="node.id" v-bind="node" />
  </div>
</template>

<style scoped>
.children {
  margin-left: 1em;
}
</style>
