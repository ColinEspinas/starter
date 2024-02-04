<script setup lang="ts">
import type { Task } from '~/server/schema/tasks.sql'

const { user, loggedIn } = useAuth()

const tasks = ref<Task[]>([])
if (loggedIn) {
  const { data } = useFetch(`/api/tasks?user=${user?.id}`)
  tasks.value = data.value as Task[]
}
</script>

<template>
  <div v-if="$auth.loggedIn" class="flex flex-col gap-5">
    <header class="flex gap-5">
      <p>Connected as {{ $auth.user.given_name }}</p>
      <NuxtLink to="/api/logout" external>
        Sign out
      </NuxtLink>
    </header>
    <main>
      <h1 class="font-bold">
        Tasks
      </h1>
      <ul v-if="tasks">
        <li v-for="task in tasks" :key="task.id">
          {{ task.title }}
        </li>
        <li v-if="tasks.length === 0">
          No tasks
        </li>
      </ul>
    </main>
  </div>
  <div v-else>
    <NuxtLink to="/api/login" external>
      Sign in
    </NuxtLink>
    <NuxtLink to="/api/register" external>
      Sign up
    </NuxtLink>
  </div>
</template>
