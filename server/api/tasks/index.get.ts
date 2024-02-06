import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { tasks } from '~/server/schema/tasks.sql'

const db = useDatabase()
const allTasks = db.select().from(tasks).orderBy(tasks.id).prepare('all-tasks')
const allTasksByUser = db.select().from(tasks).where(eq(tasks.user, sql.placeholder('user_id'))).orderBy(tasks.id).prepare('tasks-by-user')

export default defineEventHandler(async (event) => {
  const userId = await getValidatedQuery(event, (data: any) => z.string().parse(data.user))

  try {
    if (!userId)
      return await allTasks.execute()
    else
      return await allTasksByUser.execute({ user_id: userId })
  }
  catch (error) {
    throw createError({ message: 'Failed to fetch tasks', status: 500 })
  }
})
