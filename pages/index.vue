<script setup lang="ts">
const newTask = ref('')

const {
  data: tasks,
  refresh: refreshTasks,
} = await useFetch('/api/tasks')

async function toggleTask(id: number, completed: boolean) {
  await $fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    body: {
      completed: !completed,
    },
  })
  refreshTasks()
}

async function addTask() {
  await $fetch('/api/tasks', {
    method: 'POST',
    body: {
      title: newTask.value,
    },
  })
  newTask.value = ''
  refreshTasks()
}

async function deleteTask(id: number) {
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
