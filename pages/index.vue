<script setup lang="ts">
const { tasks, toggleTask, addTask, deleteTask } = await useTasks()

const newTaskTitle = ref('')

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div v-if="$auth.loggedIn" class="flex flex-col gap-6 w-full mx-auto max-w-[600px] p-5">
    <header class="flex justify-between items-center border-2 dark:border-base-900 border-base-100 p-2 rounded-xl">
      <div class="flex gap-2 items-center">
        <AvatarRoot class="bg-blackA3 inline-flex h-8 w-8 select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <AvatarImage
            class="h-full w-full rounded-[inherit] border-2 dark:border-base-800 border-base-100 object-cover"
            :src="$auth.user.picture ?? ''"
            :alt="`${$auth.user.given_name} ${$auth.user.family_name}`"
          />
          <AvatarFallback
            class="leading-1 flex h-full w-full items-center justify-center bg-accent-400 text-base-50 text-[15px] font-medium"
            :delay-ms="600"
          >
            {{ `${$auth.user.given_name[0]}${$auth.user.family_name[0]}` }}
          </AvatarFallback>
        </AvatarRoot>
        <p class="font-medium">
          {{ `${$auth.user.given_name} ${$auth.user.family_name[0]}.` }}
        </p>
      </div>
      <div class="flex gap-2">
        <UiAtomsButton
          to="/api/logout"
          external
          variant="accent"
          text="Sign out"
        />
        <UiAtomsButton before-icon="ph:moon-bold" @click="toggleDark" />
      </div>
    </header>
    <main class="flex flex-col gap-4">
      <UiMoleculesFormInput
        id="new-task"
        v-model="newTaskTitle"
        type="text"
        submit-text="Add to tasks"
        submit-icon="ph:arrow-bend-right-down-bold"
        @submit="addTask"
      />
      <ul v-if="tasks.length > 0" class="flex flex-col gap-2">
        <AppAtomsTask
          v-for="(task, index) in tasks"
          :key="task.id"
          :task="task"
          @delete="deleteTask(index)"
          @update:completed="toggleTask(index)"
        />
      </ul>
      <p v-if="tasks.length === 0">
        No tasks
      </p>
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
