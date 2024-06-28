<script setup lang="ts">
import type { Task } from '~/server/schema/tasks.sql'

const props = defineProps<{
  task: Task
  loading?: boolean
}>()

const emits = defineEmits<{
  'delete': []
  'update:completed': [value: boolean]
}>()

const completed = ref(props.task.completed)
const completedDebounced = refDebounced(completed, 500)

watch(completedDebounced, (value: boolean) => {
  emits('update:completed', value)
})
</script>

<template>
  <li class="flex  bg-base-100 dark:bg-base-900 rounded-xl pl-3 p-2">
    <label class="group w-full cursor-pointer flex flex-row gap-2 items-center">
      <CheckboxRoot
        :checked="completed"
        class="
          transition-all
          flex shrink-0 h-[24px] w-[24px] appearance-none outline-none
          items-center justify-center rounded-md
          bg-base-50 dark:bg-base-950
          border-2 border-base-200 dark:border-base-800
          group-focus-within:dark:border-base-400 group-focus-within:border-base-600
        "
        @update:checked="completed = $event"
      >
        <CheckboxIndicator class="shrink-0 h-full w-full rounded-md flex items-center justify-center">
          <Icon name="ph:check-bold" class="shrink-0 h-4 w-4 text-accent-800 dark:text-accent-400" />
        </CheckboxIndicator>
      </CheckboxRoot>
      <span class="select-none font-medium text-base-950 dark:text-base-50 overflow-hidden text-ellipsis w-full">{{ task.title }}</span>
      <UiAtomsButton
        :disabled="loading"
        before-icon="ph:trash-bold"
        class="ml-auto"
        @click="emits('delete')"
      >
        Delete
      </UiAtomsButton>
    </label>
  </li>
</template>
