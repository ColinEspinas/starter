<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: `${t('common.app-name')} - ${t('home.meta.title')}`,
  description: t('home.meta.description'),
})

const { addTask } = await useTasks()
const newTaskTitle = ref('')
</script>

<template>
  <div class="flex flex-col gap-6 w-full mx-auto max-w-[600px] py-10 px-5">
    <AppOrganismsHeader />
    <main v-if="$auth.loggedIn" class="flex flex-col gap-4">
      <UiMoleculesFormInput
        v-model="newTaskTitle"
        type="text"
        :placeholder="$t('home.task-placeholder')"
        :submit-text="$t('home.add-task')"
        submit-icon="ph:arrow-bend-right-down-bold"
        @submit="addTask"
      />
      <AppMoleculesTaskList />
    </main>
    <main v-else class="flex flex-col gap-4">
      <p class="flex items-center gap-4 bg-base-100 dark:bg-base-900 rounded-xl px-6 py-5 font-medium text-base-950 dark:text-base-50">
        <Icon name="ph:lightbulb-bold" size="18" class="shrink-0 text-accent-500" />
        <span>{{ $t('home.message.guest') }}</span>
      </p>
    </main>
  </div>
</template>
