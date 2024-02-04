<script setup lang="ts">
const { tasks, toggleTask, addTask, deleteTask } = await useTasks()

const newTaskTitle = ref('')
</script>

<template>
  <div v-if="$auth.loggedIn" class="flex flex-col gap-5 w-full max-w-[600px] p-5">
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
      <ul v-if="tasks.length > 0">
        <li v-for="(task, index) in tasks" :key="index" class="flex justify-between">
          <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100">
            <CheckboxRoot
              :checked="task.completed"
              class=" hover:bg-green-50 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white outline-none"
              @update:checked="toggleTask(index)"
            >
              <CheckboxIndicator class="bg-white h-full w-full rounded flex items-center justify-center">
                <Icon name="radix-icons:check" class="h-3.5 w-3.5 text-grass11" />
              </CheckboxIndicator>
            </CheckboxRoot>
            <span class="select-none text-black">{{ task.title }}</span>
          </label>
          <button @click="deleteTask(index)">
            Delete
          </button>
        </li>
      </ul>
      <p v-if="tasks.length === 0">
        No tasks
      </p>
      <input v-model="newTaskTitle" type="text" class="border">
      <button @click="addTask(newTaskTitle)">
        Add task
      </button>
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
