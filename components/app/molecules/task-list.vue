<script setup lang="ts">
const { tasks, toggleTask, deleteTask } = await useTasks()
</script>

<template>
  <ul v-if="tasks.length > 0" class="flex flex-col gap-2">
    <AppAtomsTask
      v-for="(task, index) in tasks"
      :key="task.id"
      :task="task"
      @delete="deleteTask(index)"
      @update:completed="toggleTask(index)"
    />
  </ul>
  <p v-if="tasks.length === 0" class="flex items-center gap-4 bg-base-100 dark:bg-base-900 rounded-xl px-6 py-5 font-medium text-base-950 dark:text-base-50">
    <Icon name="ph:lightbulb-bold" size="18" class="shrink-0 text-accent-500" />
    <span>Seems like you have no tasks. Add one to get started!</span>
  </p>
</template>
