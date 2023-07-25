<script setup lang="ts">
const newTask = ref('')

const {
  data: tasks,
  refresh: refreshTasks,
} = await useFetch('/api/tasks')

async function toggleTask(id: number, completed: boolean) {
  const task = tasks.value?.findIndex(task => task.id === id) ?? -1

  if (tasks.value?.[task])
    tasks.value[task].completed = !tasks.value[task].completed

  await $fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    body: {
      completed: !completed,
    },
  })
  refreshTasks()
}

async function addTask() {
  if (newTask.value === '')
    return

  const task = {
    id: tasks.value?.length ?? 0,
    title: newTask.value,
    completed: false,
  }

  newTask.value = ''
  tasks.value?.push(task)

  await $fetch('/api/tasks', {
    method: 'POST',
    body: task,
  })
  refreshTasks()
}

async function deleteTask(id: number) {
  const task = tasks.value?.findIndex(task => task.id === id) ?? -1
  if (task === -1)
    return

  tasks.value?.splice(task, 1)

  await $fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  })
  refreshTasks()
}
</script>

<template>
  <div class="flex flex-col gap-2 max-w-xl mx-auto justify-center min-h-screen">
    <ul class="border rounded-xl mx-4">
      <li
        v-if="tasks?.length === 0"
        class="px-4 py-3"
      >
        No tasks
      </li>
      <li
        v-for="task in tasks"
        :key="task.id"
        class="px-4 py-3 border-b last:border-b-0 flex justify-between"
        :class="{ 'line-through': task.completed }"
      >
        <span
          class="w-full"
          @click="toggleTask(task.id, task.completed)"
        >{{ task.title }}</span>
        <button @click="deleteTask(task.id)">
          <Icon name="ph:x" />
        </button>
      </li>
    </ul>
    <form
      class="mx-2"
      @submit.prevent="addTask"
    >
      <input
        v-model="newTask"
        type="text"
        placeholder="Add a task"
        class="border rounded-xl px-4 py-3 w-full shadow-inner focus:ring-4 outline-none"
      >
    </form>
  </div>
</template>
