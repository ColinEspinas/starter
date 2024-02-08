import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { tasks } from '~/server/schema/tasks.sql'

const db = useDatabase()
const getTask = db.select().from(tasks).where(eq(tasks.id, sql.placeholder('id'))).limit(1).prepare('get-task')
const deleteTask = db.delete(tasks).where(eq(tasks.id, sql.placeholder('id'))).prepare('delete-task')

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParams(event, (data: any) => z.coerce.number().parse(data.id))

  const { client, sessionManager } = useKindeServerClient(event)
  const user = await client.getUserProfile(sessionManager)

  let task = null

  try {
    const result = await getTask.execute({ id })
    task = result[0]
    if (!task)
      throw createError({ statusMessage: 'Task not found', statusCode: 404 })
  }
  catch (error) {
    throw createError({ statusMessage: 'Failed to fetch task', statusCode: 500 })
  }

  if (task.user !== user.id)
    throw createError({ statusMessage: 'Unauthorized', statusCode: 403 })

  try {
    await deleteTask.execute({ id })
  }
  catch (error) {
    throw createError({ statusMessage: 'Failed to delete task', statusCode: 500 })
  }

  event.node.res.end()
})
