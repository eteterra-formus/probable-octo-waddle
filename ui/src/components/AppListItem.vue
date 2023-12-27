<script setup lang="ts">
import { ref } from 'vue'
import type { Page } from '@/types/content'
import AppToggle from '@/components/AppToggle.vue'

interface Props {
  name: string
  children?: Page[]
}
const props = withDefaults(defineProps<Props>(), { children: () => [] })

const isOpen = ref(false)

const toggleOpen = () => {
  isOpen.value = props.children.length > 0 && !isOpen.value
}
</script>

<template>
  <div class="list-item">
    <div class="label" @click="toggleOpen">
      <AppToggle icon="chevron-right" :expand="isOpen" />
      <span>{{ props.name }} ({{ props.children.length }})</span>
    </div>

    <div class="children" v-if="isOpen">
      <AppListItem v-for="page in children" :key="page.id" v-bind="page" />
    </div>
  </div>
</template>

<style scoped>
.children {
  margin-left: 1em;
}
.list-item {
  display: flex;
  flex-direction: column;
}
.label {
  display: flex;
  user-select: none;
  cursor: pointer;
}
</style>
