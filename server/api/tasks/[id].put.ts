import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { insertTaskSchema, tasks } from '~/server/schema/tasks.sql'

const db = useDatabase()

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParams(event, (data: any) => z.number().parse(data.id))
  const validatedTask = await readValidatedBody(event, (data: any) => insertTaskSchema.parse(data))

  try {
    await db.update(tasks).set(validatedTask).where(eq(tasks.id, id))
  }
  catch (error) {
    throw createError({ message: 'Failed to update task', status: 500 })
  }

  event.node.res.end()
})
