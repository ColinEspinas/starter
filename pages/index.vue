<script setup lang="ts">
const { data: users } = await useFetch('/api/hello')
</script>

<template>
  <h1 class="text-3xl font-bold underline">
    Hello world {{ users?.[0].fullName }}!
  </h1>
</template>
