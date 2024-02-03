<script setup lang="ts">
definePageMeta({
  middleware: ['auth-logged-in'],
})
</script>

<template>
  <div v-if="$auth.loggedIn">
    <h1>Connected as</h1>
    <pre>{{ $auth.user }}</pre>
    <NuxtLink to="/api/logout" external>
      Sign out
    </NuxtLink>
  </div>
</template>
