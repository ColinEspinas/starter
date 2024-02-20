import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { insertTaskSchema, tasks } from '~/server/schema/tasks.sql'

const db = useDatabase()
const getTask = db.select().from(tasks).where(eq(tasks.id, sql.placeholder('id'))).limit(1).prepare('get-task')

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParams(event, (data: any) => z.coerce.number().parse(data.id))
  const validatedTask = await readValidatedBody(event, (data: any) => insertTaskSchema.parse(data))

  const { client } = useKindeServerClient(event)
  const user = await client.getUserProfile()

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
    await db.update(tasks).set(validatedTask).where(eq(tasks.id, id))
  }
  catch (error) {
    throw createError({ statusMessage: 'Failed to update task', statusCode: 500 })
  }

  event.node.res.end()
})
