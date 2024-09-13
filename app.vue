<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'

const useIdFunction = () => useId() as string
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>
