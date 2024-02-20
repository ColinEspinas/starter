<script setup lang="ts">
withDefaults(defineProps<{
  count: number
}>(), {
  count: 0,
})

const { getHasRole } = await useUser()
const isPro = await getHasRole('pro')
</script>

<template>
  <span class="text-base-600 dark:text-base-400 text-sm">{{ count }}{{ isPro ? '' : '/3' }} task{{ count > 1 ? 's' : '' }}</span>
</template>
