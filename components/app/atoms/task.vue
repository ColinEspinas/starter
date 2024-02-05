<script setup lang="ts">
import type { Task } from '~/server/schema/tasks.sql'

defineProps<{
  task: Task
}>()

const emits = defineEmits<{
  'delete': []
  'update:completed': [value: boolean]
}>()
</script>

<template>
  <li class="flex justify-between bg-base-100 dark:bg-base-900 rounded-xl pl-3 p-2">
    <label class="w-full cursor-pointer flex flex-row gap-2 items-center [&>.checkbox]:hover:bg-neutral-100">
      <CheckboxRoot
        :checked="task.completed"
        class="
          flex h-[25px] w-[25px] appearance-none outline-none
          items-center justify-center rounded-md
          bg-base-50 dark:bg-base-950
          border-2 border-base-200 dark:border-base-800
        "
        @update:checked="emits('update:completed', $event)"
      >
        <CheckboxIndicator class=" h-full w-full rounded-md flex items-center justify-center">
          <Icon name="ph:check-bold" class="h-4 w-4 text-accent-800 dark:text-accent-400" />
        </CheckboxIndicator>
      </CheckboxRoot>
      <span class="select-none font-medium text-base-950 dark:text-base-50">{{ task.title }}</span>
    </label>
    <UiAtomsButton before-icon="ph:trash-bold" @click="emits('delete')">
      Delete
    </UiAtomsButton>
  </li>
</template>
