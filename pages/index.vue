<script setup lang="ts">
const { addTask } = await useTasks()

const newTaskTitle = ref('')

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div v-if="$auth.loggedIn" class="flex flex-col gap-6 w-full mx-auto max-w-[600px] p-5">
    <header class="flex justify-between items-center border-2 dark:border-base-900 border-base-100 p-2 rounded-xl">
      <div class="flex gap-2 items-center">
        <AvatarRoot class="inline-flex h-8 w-8 select-none items-center justify-center overflow-hidden rounded-full align-middle">
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
        placeholder="What needs to be done?"
        submit-text="Add to tasks"
        submit-icon="ph:arrow-bend-right-down-bold"
        @submit="addTask"
      />
      <AppMoleculesTaskList />
    </main>
  </div>
  <div v-else class="flex flex-col gap-6 w-full mx-auto max-w-[600px] p-5">
    <header class="flex justify-between items-center border-2 dark:border-base-900 border-base-100 p-2 rounded-xl">
      <div class="flex gap-2 items-center">
        <p class="font-medium ml-1">
          ToDo App
        </p>
      </div>
      <div class="flex gap-2">
        <UiAtomsButton text="Sign in" to="/api/login" external />
        <UiAtomsButton
          text="Sign up"
          to="/api/register"
          variant="accent"
          external
        />
        <UiAtomsButton before-icon="ph:moon-bold" @click="toggleDark" />
      </div>
    </header>
    <main class="flex flex-col gap-4">
      <p class="flex items-center gap-4 bg-base-100 dark:bg-base-900 rounded-xl px-6 py-5 font-medium text-base-950 dark:text-base-50">
        <Icon name="ph:lightbulb-bold" size="18" class="shrink-0 text-accent-500" />
        <span>Seems like you have no tasks. Sign in to get started!</span>
      </p>
    </main>
  </div>
</template>
