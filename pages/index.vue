<script setup lang="ts">
const { data: name } = await useFetch('/api/hello')
</script>

<template>
  <h1 class="text-3xl font-bold underline">
    Hello world {{ name }}!
  </h1>
</template>
