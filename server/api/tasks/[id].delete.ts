import { eq, placeholder } from 'drizzle-orm'
import { z } from 'zod'
import { tasks } from '~/server/schema/tasks.sql'

const db = useDatabase()
const prepared = db.delete(tasks).where(eq(tasks.id, placeholder('id'))).prepare('delete-task')

export default defineEventHandler(async (event) => {
  if (!event.context.params?.id)
    throw new Error('Missing id')

  const id = Number.parseInt(event.context.params.id as string, 10)

  try {
    z.number().parse(id)
  }
  catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid body or missing parameters',
    })
  }

  try {
    await prepared.execute({ id })
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error)?.message || 'Internal server error',
    })
  }

  event.node.res.end()
})
