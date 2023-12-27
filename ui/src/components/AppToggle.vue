<script setup lang="ts">
import { computed, toRefs } from 'vue'

interface Props {
  icon: string
  expand: boolean
}
const props = defineProps<Props>()
const { icon, expand } = toRefs(props)

const iconTransform = computed(() => (expand.value ? 'rotate(90deg)' : ''))
</script>

<template>
  <i :class="`mdi mdi-${icon}`" />
</template>

<style scoped>
i {
  display: inline-block;
  transition: transform 200ms;
  transform: v-bind('iconTransform');
  font-size: 0.9em;
}
</style>
