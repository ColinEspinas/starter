import type { Task } from '~/server/schema/tasks.sql'

const tasks = ref<Task[]>([])

export async function useTasks() {
  const { user, loggedIn } = useAuth()

  await getTasks()

  async function getTasks() {
    if (loggedIn) {
      const { data } = await useFetch(`/api/tasks?user=${user?.id}`)
      tasks.value = data.value || []
    }
  }

  async function addTask(title: string) {
    if (loggedIn) {
      try {
        const data = await $fetch('/api/tasks', {
          method: 'POST',
          body: {
            title,
            completed: false,
            user: user.id,
          },
        })
        const addedTask = data?.[0]
        if (addedTask)
          tasks.value.push(addedTask)
      }
      catch (error) {
        console.error(error)
      }
    }
  }

  async function toggleTask(index: number) {
    try {
      tasks.value[index].completed = !tasks.value[index].completed
      await $fetch(`/api/tasks/${tasks.value[index].id}`, {
        method: 'PUT',
        body: tasks.value[index],
      })
    }
    catch (error) {
      console.error(error)
    }
  }

  async function deleteTask(index: number) {
    try {
      await $fetch(`/api/tasks/${tasks.value[index].id}`, {
        method: 'DELETE',
      })
      tasks.value.splice(index, 1)
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    tasks,
    getTasks,
    addTask,
    toggleTask,
    deleteTask,
  }
}
