import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { tasks } from '~/server/schema/tasks.sql'

const db = useDatabase()

export default defineEventHandler(async (event) => {
  if (!event.context.params?.id)
    throw new Error('Missing id')

  const id = Number.parseInt(event.context.params.id as string, 10)
  const { completed } = await readBody(event)

  try {
    z.number().parse(id)
    z.boolean().parse(completed)
  }
  catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid body or missing parameters',
    })
  }

  try {
    await db.update(tasks)
      .set({ completed })
      .where(eq(tasks.id, id as number))
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error)?.message || 'Internal server error',
    })
  }

  event.node.res.end()
})
