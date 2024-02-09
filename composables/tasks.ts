import type { Task } from '~/server/schema/tasks.sql'

const tasks = ref<Task[]>([])
const loadingTasks = ref<number[]>([])

export async function useTasks() {
  const { user, loggedIn } = useAuth()

  await getTasks()

  async function getTasks() {
    if (loggedIn) {
      const { data } = await useFetch(`/api/tasks`)
      tasks.value = data.value || []
    }
  }

  async function addTask(title: string) {
    if (loggedIn) {
      try {
        const addedTask = {
          title,
          completed: false,
          user: user.id,
        }
        const addedTaskIndex = tasks.value.push({ id: -1, ...addedTask }) - 1
        loadingTasks.value.push(addedTaskIndex)

        const data = await $fetch('/api/tasks', {
          method: 'POST',
          body: addedTask,
        })
        const addedTaskId = data?.[0].id
        if (addedTaskId)
          tasks.value[addedTaskIndex].id = addedTaskId
        loadingTasks.value = loadingTasks.value.filter(index => index !== addedTaskIndex)
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
    loadingTasks,
    getTasks,
    addTask,
    toggleTask,
    deleteTask,
  }
}
