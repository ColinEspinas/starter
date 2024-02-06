import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { insertTaskSchema, tasks } from '~/server/schema/tasks.sql'

const db = useDatabase()
const getTask = db.select().from(tasks).where(eq(tasks.id, sql.placeholder('id'))).limit(1).prepare('get-task')

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParams(event, (data: any) => z.coerce.number().parse(data.id))
  const validatedTask = await readValidatedBody(event, (data: any) => insertTaskSchema.parse(data))

  const { client, sessionManager } = useKinde(event)
  const user = await client.getUserProfile(sessionManager)

  let task = null

  try {
    const result = await getTask.execute({ id })
    task = result[0]
    if (!task)
      throw createError({ message: 'Task not found', status: 404 })
  }
  catch (error) {
    throw createError({ message: 'Failed to fetch task', status: 500 })
  }

  if (task.user !== user.id)
    throw createError({ message: 'Unauthorized', status: 403 })

  try {
    await db.update(tasks).set(validatedTask).where(eq(tasks.id, id))
  }
  catch (error) {
    throw createError({ message: 'Failed to update task', status: 500 })
  }

  event.node.res.end()
})
